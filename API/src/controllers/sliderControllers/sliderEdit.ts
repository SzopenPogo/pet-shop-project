import { Request, Response } from "express";
import { SLIDER_DIR, SLIDER_IMG_QUALITY, SLIDER_IMG_SIZE } from "../../constants/images/sliderImages";
import { IImageFile } from "../../interfaces/other/IImageFile";
import Slider from "../../models/sliderModel";
import saveUploadedImage from "../../utils/images/saveUploadedImage";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const sliderEdit = async (req: Request, res: Response) => {
  try {
    const allowedUpdates = ['title', 'description', 'color', 'pageUrl'];
    const updates = Object.keys(req.body);
    const isValidOperator = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperator) {
      const errorMessage = createErrorMessage(400, 'Invalid operators');
      return res.status(errorMessage.status).send(errorMessage);
    }

    const slider = await Slider.findById(req.params.id);

    if (!slider) {
      const errorMessage = createErrorMessage(404, 'Slider not found');
      return res.status(errorMessage.status).send(errorMessage);
    }

    updates.forEach(update => {
      slider[update] = req.body[update];
    });

    if (req.file) {
      const uploadedImage = req.file as IImageFile;
      
      const savedImageUrl = await saveUploadedImage(
        SLIDER_DIR,
        uploadedImage,
        SLIDER_IMG_SIZE,
        SLIDER_IMG_QUALITY
      )
      
      if (!savedImageUrl) {
        const errorMessage = createErrorMessage(409, 'Upload Image failed');
        return res.status(errorMessage.status).send(errorMessage);
      }

      slider.imageUrl = savedImageUrl;
    }

    await slider.save();
    res.status(200).send(slider);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Edit slider failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default sliderEdit;