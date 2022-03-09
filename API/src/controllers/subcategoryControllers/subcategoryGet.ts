import { Request, Response } from "express";
import { IMatchObject } from "../../interfaces/other/IMatch";
import Subcategory from "../../models/subcategoryModel";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const subcategoryGet = async (req: Request, res: Response) => {
  try {
    const match: IMatchObject = {};
    
    if (req.query.categoryId) {
      match.categoryId = req.query.categoryId;
    }

    const subcategories = await Subcategory.find(match);

    for (let i = 0; i < subcategories.length; i++) {
      await subcategories[i].populate('categoryId'); 
    }

    res.status(200).send(subcategories);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Get subcategories failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default subcategoryGet;