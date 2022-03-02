import { Response } from "express";
import { IAuthRequest } from "../../../interfaces/user/IUserAuthRequest";
import { createErrorMessage } from "../../../utils/messages/createErrorMessage";
import bcryptjs from 'bcryptjs';

const userDeactivate = async (req: IAuthRequest, res: Response) => {
  try {
    if (!req.user) {
      const errorMessage = createErrorMessage(404, 'User not fonund');
      return res.status(errorMessage.status).send(errorMessage);
    }

    const isPasswordValid = await bcryptjs.compare(req.body.currentPassword, req.user.password);
    
    if (!isPasswordValid) {
      const errorMessage = createErrorMessage(400, 'Invalid current password');
      return res.status(errorMessage.status).send(errorMessage);
    }

    await req.user.setInactive();

    const infoMessage = req.user.createInactiveMessage('User deactivated');
    res.status(200).send(infoMessage);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Deactivate user failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default userDeactivate;