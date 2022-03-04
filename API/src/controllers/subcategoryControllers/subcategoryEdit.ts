import { Response } from "express";
import { IAuthRequest } from "../../interfaces/user/IUserAuthRequest";
import Subcategory from "../../models/subcategoryModel";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const subcategoryEdit = async (req: IAuthRequest, res: Response) => {
  try {
    const allowedUpdates = ['title', 'categoryId'];
    const updates = Object.keys(req.body);
    const isValidOperator = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperator) {
      const errorMessage = createErrorMessage(400, 'Invalid operators');
      return res.status(errorMessage.status).send(errorMessage);
    }

    const subcategory = await Subcategory.findById(req.params.id);

    if (!subcategory) {
      const errorMessage = createErrorMessage(404, 'Subcategory not found');
      return res.status(errorMessage.status).send(errorMessage);
    }

    updates.forEach(update => {
      subcategory[update] = req.body[update];
    });

    await subcategory.save();
    res.status(200).send(subcategory);

  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Edit subcategory failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default subcategoryEdit;