import sharp from "sharp";
import { IImageFile } from "../../interfaces/other/IImageFile";
import createImgOutputDir from './createImgOutputDir';


const saveUploadedImage = async (
  dir: string,
  uploadedImage: IImageFile,
  imgSize: number,
  imgQuality: number
) => {
  const imageOutputDir = await createImgOutputDir(
    dir,
    uploadedImage.originalname,
    uploadedImage.fieldname
  );

  if (!imageOutputDir) {
    return null;
  }
  
  const isImageSaved = await sharp(uploadedImage.buffer)
    .resize(imgSize)
    .webp({ quality: imgQuality })
    .toFile(imageOutputDir);
  
  if (!isImageSaved) {
    return null;
  }

  return imageOutputDir;
}

export default saveUploadedImage;