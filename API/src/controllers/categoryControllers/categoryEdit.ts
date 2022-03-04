import { Request, Response } from "express";
import { IAuthRequest } from "../../interfaces/user/IUserAuthRequest";
import Category from "../../models/categoryModel";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const categoryEdit = async (req: Request, res: Response) => {
  try {
    const allowedUpdates = ['title'];
    const updates = Object.keys(req.body);
    const isValidOperator = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperator) {
      const errorMessage = createErrorMessage(400, 'Invalid operators');
      return res.status(errorMessage.status).send(errorMessage);
    }

    const category = await Category.findById(req.params.id);

    if (!category) {
      const errorMessage = createErrorMessage(404, 'Invalid operators');
      return res.status(errorMessage.status).send(errorMessage);
    }

    updates.forEach(update => {
      category[update] = req.body[update];
    });

    await category.save();
    res.status(200).send(category);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Edit category failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default categoryEdit;