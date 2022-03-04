import { Request, Response } from "express";
import Category from "../../models/categoryModel";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const categoryGetById = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      const errorMessage = createErrorMessage(404, 'Category not found');
      return res.status(errorMessage.status).send(errorMessage);
    }

    await category.populate('subcategoryRef');

    res.status(200).send(category);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Get category by id failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default categoryGetById;