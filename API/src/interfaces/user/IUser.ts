import mongoose from 'mongoose';
import { Document, Model } from 'mongoose';
import { IAddress } from '../address/IAddress';
import { IAdmin } from '../admin/IAdmin';
import { IToken } from './IToken';

export interface IUser extends Document {
  [key: string]: any;
  email: string;
  password: string;
  isActive: boolean;
  adminNote: string;
  adminKey: string;
  isAdmin: boolean;
  avatarUrl: string;
  tokens: Array<IToken>;
  _id: string;
  adminRef: mongoose.Types.Array<IAdmin> | undefined;
  addressRef: mongoose.Types.Array<IAddress> | undefined;
  generateAuthToken(): Promise<string>;
  clearTokens(): Promise<void>;
  createInactiveMessage(message: string): {
    status: number;
    message: string;
    email: string;
    isActive: boolean;
    adminNote: string;
  };
  editUserData(reqBody: any, allowedUpdates: Array<string>, currentPassword?: string): Promise<{
    status: number;
    message: string;
  }>;
  setInactive(): Promise<void>;
  setActive(): Promise<void>;
}

export interface IUserStatics extends Model<IUser> {
  findByCredentials(email: string, password: string): Promise<IUser>;
}