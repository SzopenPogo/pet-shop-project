import { Response } from "express";
import { IAuthRequest } from "../../../interfaces/user/IUserAuthRequest";
import { createErrorMessage } from "../../../utils/messages/createErrorMessage";

const userGetMe = async (req: IAuthRequest, res: Response) => {
  try {
    res.status(200).send(req.user);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Get user failed', error);
    res.status(errorMessage.status).send(error);
  }
}

export default userGetMe;