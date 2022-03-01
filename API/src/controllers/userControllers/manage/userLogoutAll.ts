import { Response } from "express";
import { IAuthRequest } from "../../../interfaces/user/IUserAuthRequest";
import { createErrorMessage } from "../../../utils/messages/createErrorMessage";
import { createInfoMessage } from "../../../utils/messages/createInfoMessage";

const userLogoutAll = async (req: IAuthRequest, res: Response) => {
  try {
    req.user!.clearTokens();
    const infoMessage = createInfoMessage(200, 'Logged out from everywhere');
    res.status(infoMessage.status).send(infoMessage);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Logout from everywhere failed');
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default userLogoutAll;