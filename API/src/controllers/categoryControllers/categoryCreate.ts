import { Response } from "express";
import { IAuthRequest } from "../../interfaces/user/IUserAuthRequest";
import Category from "../../models/categoryModel";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const categoryCreate = async (req: IAuthRequest, res: Response) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(200).send(category);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Create category failed');
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default categoryCreate;