import { Document } from 'mongoose';

export interface ISlider extends Document {
  [key: string]: any;
  _id: string;
  title: string;
  description: string;
  color: string;
  pageUrl: string;
  imageUrl: string;
}