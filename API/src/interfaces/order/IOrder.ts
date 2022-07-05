import { Document } from 'mongoose';
import mongoose from "mongoose";
import { IAddressData } from '../address/IAddress';
import { IOrderProduct } from '../product/IOrderProduct';

export interface IOrder extends Document, IAddressData  {
  [key: string]: any;
  _id: string;
  userId: mongoose.Schema.Types.ObjectId;
  paymentMethod: string;
  status: string;
  products: Array<IOrderProduct>;
  totalPrice: number;
  totalAmount: number;
}