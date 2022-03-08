import mongoose from "mongoose";
import { IProduct } from "../interfaces/product/IProduct";

const productSchema = new mongoose.Schema<IProduct>({
  title: {
    type: String,
    trim: true,
    required: true
  },

  description: {
    type: String,
    trim: true
  },

  images: [{
    type: String
  }],

  price: {
    type: Number,
    trim: true,
    required: true
  },

  subcategoryId: {
    type: mongoose.Types.ObjectId,
    ref: 'Subcategory'
  }
}, {
  timestamps: true
});

const Product = mongoose.model<IProduct>('Product', productSchema);
export default Product;