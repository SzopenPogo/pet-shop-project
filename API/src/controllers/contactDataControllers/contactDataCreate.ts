import { Request, Response } from "express";
import ContactData from "../../models/contactDataModel";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const contactDataCreate = async (req: Request, res: Response) => {
  try {
    const contactData = new ContactData(req.body);
    await contactData.save();
    res.status(200).send(contactData);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Create contact failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default contactDataCreate;