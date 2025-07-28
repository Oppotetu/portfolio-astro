import { existsSync, readdirSync, writeFileSync } from 'fs';
import { join, extname } from 'path';

const imagesRootFolder = join(process.cwd(), 'src/images');
const outputFile = join(process.cwd(), 'src/data/imageList.json');
const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

function generateImageList() {
  if (!existsSync(imagesRootFolder)) {
    console.warn('Images folder missing, skipping image list generation.');
    return;
  }

  const imageEntries = [];

  const projectFolders = readdirSync(imagesRootFolder, {
    withFileTypes: true,
  }).filter((entry) => entry.isDirectory());

  for (const folder of projectFolders) {
    const project = folder.name;
    const folderPath = join(imagesRootFolder, project);
    const files = readdirSync(folderPath);

    for (const file of files) {
      const ext = extname(file).toLowerCase();
      if (validExtensions.includes(ext)) {
        imageEntries.push({
          project: project,
          filename: `${file}`,
        });
      }
    }
  }

  writeFileSync(outputFile, JSON.stringify(imageEntries, null, 2));
  console.log('✅ Image list generated.');
}

generateImageList();
