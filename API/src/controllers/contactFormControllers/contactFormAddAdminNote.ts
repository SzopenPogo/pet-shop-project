import { Request, Response } from "express";
import { IContactFormAdminNote } from "../../interfaces/contact/IContactForm";
import ContactForm from "../../models/contactFormModel";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const contactFormAddAdminNote = async (req: Request, res: Response) => {
  try {
    const adminNote = req.body as IContactFormAdminNote;

    if (!adminNote.adminId || !adminNote.adminNote) {
      const errorMessage = createErrorMessage(400, 'Admin note should have adminId and adminNote');
      return res.status(errorMessage.status).send(errorMessage);
    }

    const contactForm = await ContactForm.findById(req.params.id);

    if (!contactForm) {
      const errorMessage = createErrorMessage(404, 'Contact form not found');
      return res.status(errorMessage.status).send(errorMessage);
    }

    contactForm.adminNotes = contactForm.adminNotes.concat(adminNote);
    await contactForm.save();

    res.status(200).send(contactForm);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Add admin note to contact form failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default contactFormAddAdminNote;