import { Request, Response } from "express";
import Subcategory from "../../models/subcategoryModel";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const subcategoryGetById = async (req: Request, res: Response) => {
  try {
    const subcategory = await Subcategory.findById(req.params.id);

    if (!subcategory) {
      const errorMessage = createErrorMessage(404, 'Subcategory not found');
      return res.status(errorMessage.status).send(errorMessage);
    }

    await subcategory.populate('categoryId');
    await subcategory.populate('productRef');
    
    res.status(200).send(subcategory);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Get subcategory by id failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default subcategoryGetById;