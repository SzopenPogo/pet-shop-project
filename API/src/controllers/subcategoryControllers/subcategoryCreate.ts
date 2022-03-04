import { Request, Response } from "express";
import Subcategory from "../../models/subcategoryModel";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const subcategoryCreate = async (req: Request, res: Response) => {
  try {
    const subcategory = new Subcategory({
      ...req.body,
      imageUrl: '/image'
    });
    
    await subcategory.save();
    res.status(200).send(subcategory);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Create subcategory failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default subcategoryCreate;