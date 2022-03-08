import { Response } from "express";
import { SUBCATEGORY_DIR, SUBCATEGORY_IMG_QUALITY, SUBCATEGORY_IMG_SIZE } from "../../constants/images/subcategoryImages";
import { IImageFile } from "../../interfaces/other/IImageFile";
import { IAuthRequest } from "../../interfaces/user/IUserAuthRequest";
import Subcategory from "../../models/subcategoryModel";
import saveUploadedImage from "../../utils/images/saveUploadedImage";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const subcategoryEdit = async (req: IAuthRequest, res: Response) => {
  try {
    const allowedUpdates = ['title', 'categoryId'];
    const updates = Object.keys(req.body);
    const isValidOperator = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperator) {
      const errorMessage = createErrorMessage(400, 'Invalid operators');
      return res.status(errorMessage.status).send(errorMessage);
    }

    const subcategory = await Subcategory.findById(req.params.id);

    if (!subcategory) {
      const errorMessage = createErrorMessage(404, 'Subcategory not found');
      return res.status(errorMessage.status).send(errorMessage);
    }

    updates.forEach(update => {
      subcategory[update] = req.body[update];
    });

    if (req.file) {
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

      subcategory.imageUrl = savedImageUrl;
    }

    await subcategory.save();
    res.status(200).send(subcategory);

  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Edit subcategory failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default subcategoryEdit;