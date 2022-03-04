import mongoose from "mongoose";
import { ISubategory } from "../interfaces/subcategory/ISubcategory";

const subcategorySchema = new mongoose.Schema<ISubategory>({
  title: {
    type: String,
    trim: true,
    required: true
  },

  imageUrl: {
    type: String,
    trim: true,
    required: true
  },

  categoryId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Category'
  }
})

const Subcategory = mongoose.model<ISubategory>('Subcategory', subcategorySchema);
export default Subcategory;