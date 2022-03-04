import { Response } from "express";
import { IAuthRequest } from "../../interfaces/user/IUserAuthRequest";
import Address from "../../models/addressModel";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const addressAdd = async (req: IAuthRequest, res: Response) => {
  try {
    if (!req.user) {
      const errorMessage = createErrorMessage(404, 'User not found');
      return res.status(errorMessage.status).send(errorMessage);
    }

    const address = new Address({
      ...req.body,
      userId: req.user._id
    });

    await address.save();
    res.status(200).send(address);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Add address failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default addressAdd;