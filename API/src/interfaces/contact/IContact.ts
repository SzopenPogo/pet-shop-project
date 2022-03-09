import { Document } from 'mongoose';

export interface IContactData extends Document {
  [key: string]: any;
  _id: string;
  phoneNumber: number;
  country: string;
  postalCode: string;
  city: string;
  street: string;
  homeNumber: string;
  bankNumber: string;
}