import { Response } from "express";
import { IAuthRequest } from "../../interfaces/user/IUserAuthRequest";
import Category from "../../models/categoryModel";
import Subcategory from "../../models/subcategoryModel";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const categoryDelete = async (req: IAuthRequest, res: Response) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      const errorMessage = createErrorMessage(404, 'Category not found');
      return res.status(errorMessage.status).send(errorMessage);
    }

    // Delete all related subcategories
    await Subcategory.deleteMany({ categoryId: category._id });

    res.status(200).send(category);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Delete category failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default categoryDelete;