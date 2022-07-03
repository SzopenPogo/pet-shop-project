import mongoose from "mongoose";
import { Document } from 'mongoose';

export interface IAddress extends Document, IAddressData {
  [key: string]: any;
  _id: string;
  userId: mongoose.Schema.Types.ObjectId;
}

export interface IAddressData {
  country: string;
  postalCode: string;
  city: string;
  street: string;
  homeNumber: string;
  phoneNumber: number;
}