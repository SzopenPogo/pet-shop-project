import mongoose from "mongoose";
import { IAddress } from "../interfaces/address/IAddress";

const addressSchema = new mongoose.Schema<IAddress>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },

  country: {
    type: String,
    trim: true,
    required: true
  },

  postalCode: {
    type: String,
    trim: true,
    required: true
  },

  city: {
    type: String,
    trim: true,
    required: true
  },

  street: {
    type: String,
    trim: true,
    required: true
  },

  homeNumber: {
    type: String,
    trim: true,
    required: true
  },

  phoneNumber: {
    type: Number,
    trim: true,
    required: true
  }
});

const Address = mongoose.model<IAddress>('Address', addressSchema);
export default Address;