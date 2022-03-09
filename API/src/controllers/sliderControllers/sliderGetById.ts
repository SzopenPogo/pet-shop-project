import { Request, Response } from "express";
import Slider from "../../models/sliderModel";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const sliderGetById = async (req: Request, res: Response) => {
  try {
    const slider = await Slider.findById(req.params.id);

    if (!slider) {
      const errorMessage = createErrorMessage(404, 'Slider not found');
      return res.status(errorMessage.status).send(errorMessage);
    }

    res.status(200).send(slider);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Get slider by id failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default sliderGetById;