import { Request, Response } from "express";
import User from "../../../models/userModel";
import { createErrorMessage } from "../../../utils/messages/createErrorMessage";

const userEditById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      const errorMessage = createErrorMessage(404, 'User not found');
      return res.status(errorMessage.status).send(errorMessage);
    }
    const allowedUpdates = ['email', 'adminNote'];

    const updatedUser = await user.editUserData(req.body, allowedUpdates);

    res.status(updatedUser.status).send([updatedUser, user]);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Edit data by id failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default userEditById;