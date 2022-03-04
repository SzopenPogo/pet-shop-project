import mongoose from "mongoose";
import { ICategory } from "../interfaces/category/ICategory";
import Subcategory from "./subcategoryModel";

const categorySchema = new mongoose.Schema<ICategory>({
  title: {
    type: String,
    trim: true,
    required: true
  }
}, {
  timestamps: true
});

//VIRTUAL
//subcategory
categorySchema.virtual('subcategoryRef', {
  ref: 'Subcategory',
  localField: '_id',
  foreignField: 'categoryId'
})

categorySchema.set('toJSON', { virtuals: true });

const Category = mongoose.model<ICategory>('Category', categorySchema);
export default Category;