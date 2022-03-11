import { Response } from "express";
import { IAuthRequest } from "../../interfaces/user/IUserAuthRequest";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const addressGetMe = async (req: IAuthRequest, res: Response) => {
  try {
    await req.user?.populate('addressRef');
    
    res.status(200).send(req.user?.addressRef);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Get user address failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default addressGetMe;