import { Request, Response } from "express";
import { IToken } from "../../../interfaces/user/IToken";
import { IAuthRequest } from "../../../interfaces/user/IUserAuthRequest";
import { createErrorMessage } from "../../../utils/messages/createErrorMessage";
import { createInfoMessage } from "../../../utils/messages/createInfoMessage";

const userLogout = async (req: IAuthRequest, res: Response) => {
  try {
    req.user!.tokens = req.user!.tokens.filter((token: IToken) => {
      return token.token !== req.token;
    })

    await req.user!.save();
    const infoMessage = createInfoMessage(200, 'Logged out')
    res.status(infoMessage.status).send(infoMessage)

  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Logout user failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default userLogout;