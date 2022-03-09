import { Request, Response } from "express";
import Slider from "../../models/sliderModel";
import deleteImageFS from "../../utils/images/deleteImageFS";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const sliderDelete = async (req: Request, res: Response) => {
  try {
    const slider = await Slider.findByIdAndDelete(req.params.id);

    if (!slider) {
      const errorMessage = createErrorMessage(404, 'Slider not found');
      return res.status(errorMessage.status).send(errorMessage);
    }

    await deleteImageFS(slider.imageUrl);
    
    res.status(200).send(slider);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Delete slider failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default sliderDelete;