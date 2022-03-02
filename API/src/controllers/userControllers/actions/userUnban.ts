import { Request, Response } from "express";
import User from "../../../models/userModel";
import { createErrorMessage } from "../../../utils/messages/createErrorMessage";
import { createInfoMessage } from "../../../utils/messages/createInfoMessage";

const userUnban = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      const errorMessage = createErrorMessage(404, 'User not found');
      return res.status(errorMessage.status).send(errorMessage);
    }

    await user.setActive();
    
    const infoMessage = createInfoMessage(200, `${user.email} is now unbanned`)
    res.status(infoMessage.status).send(infoMessage);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Unban user failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default userUnban;