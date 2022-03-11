import { Request, Response } from "express";
import ContactForm from "../../models/contactFormModel";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const contactFormToggleResolved = async (req: Request, res: Response) => {
  try {
    const contactForm = await ContactForm.findById(req.params.id);

    if (!contactForm) {
      const errorMessage = createErrorMessage(404, 'Contact form not found');
      return res.status(errorMessage.status).send(errorMessage);
    }

    contactForm.isResolved = !contactForm.isResolved;
    await contactForm.save();
    
    res.status(200).send(contactForm);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Toggle resolved status failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default contactFormToggleResolved;