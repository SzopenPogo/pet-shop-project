import { Response } from "express";
import { IAuthRequest } from "../../interfaces/user/IUserAuthRequest";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const addressGet = async (req: IAuthRequest, res: Response) => {
  try {
    if (!req.user) {
      const errorMessage = createErrorMessage(404, 'User not found');
      return res.status(errorMessage.status).send(errorMessage);
    }

    await req.user.populate('addressRef');
    res.status(200).send(req.user.addressRef);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Get addresses failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default addressGet;