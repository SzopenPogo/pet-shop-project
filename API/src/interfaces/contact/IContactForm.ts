import { Document } from 'mongoose';

export interface IContactFormAdminNote {
  adminId: string;
  adminNote: string;
}

export interface IContactForm extends Document {
  [key: string]: any;
  _id: string;
  email: string;
  text: string;
  isResolved: boolean;
  adminNotes: Array<IContactFormAdminNote>;
}