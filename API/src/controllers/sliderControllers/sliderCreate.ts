import { Request, Response } from "express";
import { SLIDER_DIR, SLIDER_IMG_QUALITY, SLIDER_IMG_SIZE } from "../../constants/images/sliderImages";
import { IImageFile } from "../../interfaces/other/IImageFile";
import Slider from "../../models/sliderModel";
import saveUploadedImage from "../../utils/images/saveUploadedImage";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const sliderCreate = async (req: Request, res: Response) => {
  try {
    const slider = new Slider(req.body);

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
    const errorMessage = createErrorMessage(500, 'Create slider failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default sliderCreate;