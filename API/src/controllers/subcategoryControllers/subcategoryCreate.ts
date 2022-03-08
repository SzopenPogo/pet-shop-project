import { Request, Response } from "express";
import { SUBCATEGORY_DIR, SUBCATEGORY_IMG_QUALITY, SUBCATEGORY_IMG_SIZE } from "../../constants/images/subcategoryImages";
import { IImageFile } from "../../interfaces/other/IImageFile";
import Subcategory from "../../models/subcategoryModel";
import saveUploadedImage from "../../utils/images/saveUploadedImage";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const subcategoryCreate = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      const errorMessage = createErrorMessage(400, 'Image is required');
      return res.status(errorMessage.status).send(errorMessage);
    }
    
    const uploadedImage = req.file as IImageFile;

    const savedImageUrl = await saveUploadedImage(
      SUBCATEGORY_DIR,
      uploadedImage,
      SUBCATEGORY_IMG_SIZE,
      SUBCATEGORY_IMG_QUALITY
    )

    if (!savedImageUrl) {
      const errorMessage = createErrorMessage(409, 'Upload Image failed');
      return res.status(errorMessage.status).send(errorMessage);
    }

    const subcategory = new Subcategory({
      ...req.body,
      imageUrl: savedImageUrl
    });
    
    await subcategory.save();
    res.status(200).send(subcategory);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Create subcategory failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default subcategoryCreate;