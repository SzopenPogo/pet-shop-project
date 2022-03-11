import mongoose from "mongoose";
import validator from "validator";
import { IContactForm } from "../interfaces/contact/IContactForm";

const contactFormSchema = new mongoose.Schema<IContactForm>({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    validate(value: string) {
      if (!validator.isEmail(value)) {
        throw new Error('Wrong email format (email@email.com)');
      }
    }
  },

  text: {
    type: String,
    required: true
  },

  isResolved: {
    type: Boolean,
    default: false
  },

  adminNotes: [{
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },

    adminNote: {
      type: String
    }
  }]
}, {
  timestamps: true
});

const ContactForm = mongoose.model('ContactForm', contactFormSchema);
export default ContactForm;