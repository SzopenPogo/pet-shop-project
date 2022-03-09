import { Request, Response } from "express";
import ContactData from "../../models/contactDataModel";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const contactDataEdit = async (req: Request, res: Response) => {
  try {
    const allowedUpdates = ['phoneNumber', 'country', 'postalCode', 'city', 'street', 'homeNumber', 'bankNumber'];
    const updates = Object.keys(req.body);
    const isValidOperator = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperator) {
      const errorMessage = createErrorMessage(400, 'Invalid operators');
      return res.status(errorMessage.status).send(errorMessage);
    }

    const contactData = await ContactData.findById(req.params.id);

    if (!contactData) {
      const errorMessage = createErrorMessage(404, 'Contact Data not found');
      return res.status(errorMessage.status).send(errorMessage);
    }

    updates.forEach(update => {
      contactData[update] = req.body[update];
    });

    await contactData.save();
    res.status(200).send(contactData);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Edit contact data failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default contactDataEdit;