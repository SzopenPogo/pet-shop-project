import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { ISubategory } from '../subcategory/ISubcategory';

export interface ICategory extends Document {
  [key: string]: any;
  _id: string;
  title: string;
  subcategotyRef: mongoose.Types.Array<ISubategory> | undefined;
}