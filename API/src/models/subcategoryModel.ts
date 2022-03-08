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
}, {
  timestamps: true
});

//VIRTUAL
//product
subcategorySchema.virtual('productRef', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'subcategoryId'
})

subcategorySchema.set('toJSON', { virtuals: true });

const Subcategory = mongoose.model<ISubategory>('Subcategory', subcategorySchema);
export default Subcategory;