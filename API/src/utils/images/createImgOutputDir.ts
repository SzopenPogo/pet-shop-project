import fsx from 'fs-extra';

const createImgOutputDir = async (dir: string, originalName: string, fieldName: string) => {
  const dirName = `images/${dir}`;
  await fsx.ensureDir(dirName);

  const imageName = originalName.split(/\.(jpg|png|jpeg)$/)[0].replace(/\s/g, '_');

  return `${dirName}/${imageName}-${fieldName}-${Date.now()}.webp`;
}

export default createImgOutputDir;