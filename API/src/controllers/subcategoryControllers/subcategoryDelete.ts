import { Request, Response } from "express";
import Subcategory from "../../models/subcategoryModel";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const subcategoryDelete = async (req: Request, res: Response) => {
  try {
    const subcategory = await Subcategory.findByIdAndDelete(req.params.id);

    if (!subcategory) {
      const errorMessage = createErrorMessage(404, 'Subcategory not found');
      return res.status(errorMessage.status).send(errorMessage);
    }

    //CHANGE RELATED PRODUCTS CATEGORY TO NULL

    res.status(200).send(subcategory);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Delete subcategory failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default subcategoryDelete;