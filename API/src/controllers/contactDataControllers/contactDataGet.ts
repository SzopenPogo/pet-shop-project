import { Request, Response } from "express"
import ContactData from "../../models/contactDataModel";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const contactDataGet = async (req: Request, res: Response) => {
  try {
    const contactData = await ContactData.find({});
    res.status(200).send(contactData);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Get contact data failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default contactDataGet;