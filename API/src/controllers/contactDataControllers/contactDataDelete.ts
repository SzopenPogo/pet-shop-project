import { Request, Response } from "express";
import ContactData from "../../models/contactDataModel";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const contactDataDelete = async (req: Request, res: Response) => {
  try {
    const contactData = await ContactData.findByIdAndDelete(req.params.id);

    if (!contactData) {
      const errorMessage = createErrorMessage(404, 'Contact data not found');
      return res.status(errorMessage.status).send(errorMessage);
    }

    res.status(200).send(contactData);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Delete contact data failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default contactDataDelete;