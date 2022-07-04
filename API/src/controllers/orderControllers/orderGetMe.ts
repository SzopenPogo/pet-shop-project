import { Response } from "express";
import { IAuthRequest } from "../../interfaces/user/IUserAuthRequest";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const orderGetMe = async (req: IAuthRequest, res: Response) => {
  try {
    await req.user?.populate('orderRef');
    res.status(200).send(req.user?.orderRef);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Get user orders failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default orderGetMe;