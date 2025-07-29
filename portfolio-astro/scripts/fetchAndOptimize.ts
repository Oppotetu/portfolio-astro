import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

interface ImageResult {
  url: string;
  alt: string;
}

interface ProjectImages {
  images: ImageResult[];
  project: string;
}

const RAW_DIR = './raw-images';
const OUTPUT_DIR = './src/images';
const MAX_WIDTH = 2560;
const MAX_HEIGHT = 1440;
const QUALITY = 80;

const client = createClient({
  projectId: 's0d0t3an',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2025-07-25',
});

async function getImages(): Promise<ProjectImages[]> {
  const query = `*[_type == "project"]{
    'images': images.images[]{
      'url': asset -> url,
      'alt': alt
    },
    'project': slug.current,
  }`;
  const response = await client.fetch(query);
  return response;
}

async function downloadImage(url: string, outputPath: string) {
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
    );
  const buffer = await response.arrayBuffer();
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, Buffer.from(buffer));
}

async function optimizeImage(inputPath: string, outputPath: string) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  const meta = await sharp(inputPath).metadata();
  const portrait = (meta.height ?? 0) > (meta.width ?? 0);

  const size = portrait ? { height: MAX_HEIGHT } : { width: MAX_WIDTH };

  await sharp(inputPath)
    .resize({ ...size, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(outputPath);
}

async function run() {
  fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
  fs.rmSync(RAW_DIR, { recursive: true, force: true });
  console.log('✔ Purged raw and output directories');

  fs.mkdirSync(RAW_DIR, { recursive: true });
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const imageArrays = await getImages();

  for (const array of imageArrays) {
    for (const image of array.images) {
      const filename = path.basename(new URL(image.url).pathname);
      const baseName = path.parse(filename).name;
      const rawPath = path.join(RAW_DIR, filename);
      const outPath = path.join(
        `${OUTPUT_DIR}/${array.project}`,
        image.alt + '.webp',
      );

      try {
        await downloadImage(image.url, rawPath);
        await optimizeImage(rawPath, outPath);
        console.log(`✔ Processed ${filename}`);
      } catch (error) {
        console.error(`✘ Failed to process ${filename}:`, error);
      }
    }
  }
}

run();
