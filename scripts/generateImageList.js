import { existsSync, readdirSync, writeFileSync } from 'fs'
import { join, extname } from 'path'

const imagesRootFolder = join(process.cwd(), 'src/images')
const outputFile = join(process.cwd(), 'src/data/imageList.json')

function getImagesFromFolders(folderPath, basePath = '/images') {
  const folders = readdirSync(folderPath, { withFileTypes: true })

  return folders.reduce((acc, folder) => {
    if (folder.isDirectory()) {
      const subfolderPath = join(imagesRootFolder, folder.name)
      const files = readdirSync(subfolderPath)

      const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
      const images = files
        .filter((file) => validExtensions.includes(extname(file).toLowerCase()))
        .map((file) => `${basePath}/${folder.name}/${file}`)

      if (images.length > 0) {
        acc[folder.name] = images
      }
    }
    return acc
  }, {})
}

export function generateImageList() {
  if (!existsSync(imagesRootFolder)) {
    console.warn('Images folder missing, skipping image list generation.')
    return
  }

  const imageList = getImagesFromFolders(imagesRootFolder)
  writeFileSync(outputFile, JSON.stringify(imageList, null, 2))
  console.log('✅ Image list generated.')
}
