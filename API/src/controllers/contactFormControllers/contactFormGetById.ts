import { Request, Response } from "express";
import ContactForm from "../../models/contactFormModel";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const contactFormGetById = async (req: Request, res: Response) => {
  try {
    const contactForm = await ContactForm.findById(req.params.id);
    if (!contactForm) {
      const errorMessage = createErrorMessage(404, 'Contact from not found');
      return res.status(errorMessage.status).send(errorMessage);
    }

    res.status(200).send(contactForm);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Get contact form by id failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default contactFormGetById;