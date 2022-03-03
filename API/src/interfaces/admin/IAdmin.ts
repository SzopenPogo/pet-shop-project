import mongoose from "mongoose";
import { Document, Model } from 'mongoose';
import { IUser } from "../user/IUser";

export interface IAdmin extends Document {
  [key: string]: any;
  _id: string;
  adminKey: string;
  adminLevel: number;
  userId: mongoose.Schema.Types.ObjectId;
}

export interface IAdminStatics extends Model<IAdmin> {
  deleteAdmin(user: IUser): Promise<{
    status: number;
    message: string;
  }>;
}