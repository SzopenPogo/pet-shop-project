import { Request, Response } from "express";
import User from "../../../models/userModel";
import { createErrorMessage } from "../../../utils/messages/createErrorMessage";
import { createInfoMessage } from "../../../utils/messages/createInfoMessage";

const userBan = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      const errorMessage = createErrorMessage(404, 'User not found');
      return res.status(errorMessage.status).send(errorMessage);
    }

    if (!req.body.adminNote) {
      const errorMessage = createErrorMessage(400, 'Admin note is required');
      return res.status(errorMessage.status).send(errorMessage);
    }

    user.adminNote = (req.body.adminNote);
    await user.setInactive(); // <-- This functon includes user.save so adminNote is saved

    const infoMessage = createInfoMessage(200, `${user.email} is now banned`)
    res.status(infoMessage.status).send(infoMessage);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Ban user failed');
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default userBan;