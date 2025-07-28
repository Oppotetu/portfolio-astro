import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const RAW_DIR = './raw-images';
const OUTPUT_DIR = './src/images';
const MAX_WIDTH = 1920;
const QUALITY = 80;

function processDir(currentPath) {
  fs.readdirSync(currentPath, { withFileTypes: true }).forEach((dirent) => {
    const fullPath = path.join(currentPath, dirent.name);
    const relativePath = path.relative(RAW_DIR, fullPath);
    const outputPath = path.join(OUTPUT_DIR, relativePath);

    if (/\.(jpe?g|png|tiff?)$/i.test(dirent.name)) {
      const outputFile = path.join(
        path.dirname(outputPath),
        path.parse(outputPath).name + '.webp',
      );
      sharp(fullPath)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(outputFile)
        .then(() =>
          console.log(`✔ Optimized: ${relativePath} → ${outputFile}`),
        )
        .catch((err) =>
          console.error(`✘ Error processing ${relativePath}:`, err),
        );
    } else if (dirent.isDirectory()) {
      fs.mkdirSync(outputPath, { recursive: true });
      processDir(fullPath);
    }
  });
}

processDir(RAW_DIR);
