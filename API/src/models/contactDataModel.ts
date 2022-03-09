import mongoose from "mongoose";
import { IContactData } from "../interfaces/contact/IContact";

const contactDataSchema = new mongoose.Schema<IContactData>({
  phoneNumber: {
    type: Number,
    trim: true
  },

  country: {
    type: String,
    trim: true
  },

  postalCode: {
    type: String,
    trim: true
  },

  city: {
    type: String,
    trim: true
  },

  street: {
    type: String,
    trim: true
  },

  homeNumber: {
    type: String,
    trim: true
  },

  bankNumber: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

const ContactData = mongoose.model<IContactData>('ContactData', contactDataSchema);
export default ContactData;