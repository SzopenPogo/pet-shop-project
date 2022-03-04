import { Response } from "express";
import { IAuthRequest } from "../../interfaces/user/IUserAuthRequest";
import Address from "../../models/addressModel";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const addressEdit = async (req: IAuthRequest, res: Response) => {
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

    const allowedUpdates = ['country', 'postalCode', 'city', 'street', 'homeNumber', 'phoneNumber'];
    const updates = Object.keys(req.body);
    const isValidOperator = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperator) {
      const errorMessage = createErrorMessage(400, 'Invalid operators');
      return res.status(errorMessage.status).send(errorMessage);
    }

    updates.forEach(update => {
      address[update] = req.body[update];
    });

    await address.save();

    res.status(200).send(address);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Edit adress failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default addressEdit;