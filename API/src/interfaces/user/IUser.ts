import { Document, Model } from 'mongoose';
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