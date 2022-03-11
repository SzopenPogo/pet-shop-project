import { Request, Response } from "express";
import ContactForm from "../../models/contactFormModel";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const contactFormCreate = async (req: Request, res: Response) => {
  try {
    const { email, text } = req.body;

    const contactForm = new ContactForm({
      email,
      text,
      isResolved: false
    });

    await contactForm.save();

    res.status(200).send(contactForm);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Create contact form failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default contactFormCreate;