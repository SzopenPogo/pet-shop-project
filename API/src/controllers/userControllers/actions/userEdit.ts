import { Response } from "express";
import { IAuthRequest } from "../../../interfaces/user/IUserAuthRequest";
import { createErrorMessage } from "../../../utils/messages/createErrorMessage";

const userEdit = async (req: IAuthRequest, res: Response) => {
  try {
    const allowedUpdates = ['email', 'password'];

    if (req.body.password) {
      if (req.body.currentPassword) {
        const updatedUser = await req.user?.editUserData(req.body, allowedUpdates, req.body.currentPassword);
        return res.status(updatedUser!.status).send([updatedUser, req.user]);
      }

      const errorMessage = createErrorMessage(401, 'Current password required');
      return res.status(errorMessage.status).send(errorMessage);
    }

    const updatedUser = await req.user?.editUserData(req.body, allowedUpdates);
    
    res.status(updatedUser!.status).send([updatedUser, req.user]);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Edit data failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default userEdit;