import { Request, Response } from "express";
import Slider from "../../models/sliderModel";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const sliderGet = async (req: Request, res: Response) => {
  try {
    const sliders = await Slider.find({});
    res.status(200).send(sliders);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Get sliders failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default sliderGet;