import mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface IProduct extends Document {
  [key: string]: any;
  _id: string;
  title: string;
  description?: string;
  images: Array<string>;
  price: number;
  subcategoryId: mongoose.Schema.Types.ObjectId;
}