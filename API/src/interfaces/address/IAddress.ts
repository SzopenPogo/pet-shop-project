import mongoose from "mongoose";
import { Document } from 'mongoose';

export interface IAddress extends Document {
  [key: string]: any;
  _id: string;
  userId: mongoose.Schema.Types.ObjectId;
  country: string;
  postalCode: string;
  city: string;
  street: string;
  homeNumber: string;
  phoneNumber: number;
}