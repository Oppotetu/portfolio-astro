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
const DIMENSTIONS: { width: number; height: number }[] = [
  { width: 844, height: 844 },
  { width: 1024, height: 844 },
  { width: 1600, height: 900 },
  { width: 2560, height: 1440 },
];
const QUALITY = 80;

const client = createClient({
  projectId: 's0d0t3an',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2025-07-25',
});

async function getImages(): Promise<ProjectImages[]> {
  const query = `*[_type == "project"] | order(slug.current asc){
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
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`
    );
  const buffer = await response.arrayBuffer();
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, Buffer.from(buffer));
}

async function optimizeImage(
  inputPath: string,
  outDir: string,
  imageAlt: string
) {
  fs.mkdirSync(outDir, { recursive: true });

  const meta = await sharp(inputPath).metadata();
  const isPortrait = (meta.height ?? 0) > (meta.width ?? 0);

  const generated: { path: string; width: number }[] = [];

  for (const dim of DIMENSTIONS) {
    const outPath = path.join(outDir, `${imageAlt}-w${dim.width}.webp`);
    const size = isPortrait ? { height: dim.height } : { width: dim.width };

    await sharp(inputPath)
      .resize({ ...size, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outPath);

    generated.push({ path: outPath, width: dim.width });
  }
  return generated;
}

async function run() {
  fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
  fs.rmSync(RAW_DIR, { recursive: true, force: true });
  console.log('✔ Purged raw and output directories');

  fs.mkdirSync(RAW_DIR, { recursive: true });
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const imageArrays = await getImages();

  const imageOrderManifest: Record<string, string[]> = {}; // project -> [ordered base names]

  for (const array of imageArrays) {
    imageOrderManifest[array.project] = [];
    for (const image of array.images) {
      const filename = path.basename(new URL(image.url).pathname);
      const rawPath = path.join(RAW_DIR, filename);

      imageOrderManifest[array.project].push(image.alt);

      try {
        await downloadImage(image.url, rawPath);
        const variants = await optimizeImage(
          rawPath,
          `${OUTPUT_DIR}/${array.project}`,
          image.alt
        );
        console.log(
          `✔ Processed ${filename} → ${variants.map((v) => path.basename(v.path)).join(', ')}`
        );
      } catch (error) {
        console.error(`✘ Failed to process ${filename}:`, error);
      }
    }
  }
  fs.writeFileSync(
    './src/lib/image-order.json',
    JSON.stringify(imageOrderManifest, null, 2)
  );
  console.log('✔ Created image-order.json');

  fs.rmSync(RAW_DIR, { recursive: true, force: true });
  console.log('✔ Purged raw image directory');
}

run();
