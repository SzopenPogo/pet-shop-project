import mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface ISubategory extends Document {
  [key: string]: any;
  _id: string;
  title: string;
  imageUrl: string;
  categoryId: mongoose.Schema.Types.ObjectId;
}