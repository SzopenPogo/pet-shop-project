import { Request, Response } from "express";
import ContactData from "../../models/contactDataModel";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const contactDataGetById = async (req: Request, res: Response) => {
  try {
    const contactData = await ContactData.findById(req.params.id);

    if (!contactData) {
      const errorMessage = createErrorMessage(404, 'Contact data not found');
      return res.status(errorMessage.status).send(errorMessage);
    }

    res.status(200).send(contactData);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Get contact data by id failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default contactDataGetById;