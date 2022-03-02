import { Response } from "express";
import { IAuthRequest } from "../../../interfaces/user/IUserAuthRequest";
import { createErrorMessage } from "../../../utils/messages/createErrorMessage";
import { createInfoMessage } from "../../../utils/messages/createInfoMessage";

const userActivate = async (req: IAuthRequest, res: Response) => {
  try {
    if (!req.user) {
      const errorMessage = createErrorMessage(404, 'User not fonund');
      return res.status(errorMessage.status).send(errorMessage);
    }

    await req.user.setActive();
    
    const infoMessage = createInfoMessage(200, 'User activated');
    res.status(infoMessage.status).send([infoMessage, req.user]);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Activate user failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default userActivate;