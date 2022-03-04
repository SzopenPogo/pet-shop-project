import { Response } from "express";
import { IAuthRequest } from "../../interfaces/user/IUserAuthRequest";
import Address from "../../models/addressModel";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const addressGetById = async (req: IAuthRequest, res: Response) => {
  try {
    if (!req.user) {
      const errorMessage = createErrorMessage(404, 'User not found');
      return res.status(errorMessage.status).send(errorMessage);
    }

    const address = await Address.findOne({ _id: req.params.id, userId: req.user._id });

    if (!address) {
      const errorMessage = createErrorMessage(404, 'Address not found');
      return res.status(errorMessage.status).send(errorMessage);
    }

    res.status(200).send(address);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Get address by id failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default addressGetById;