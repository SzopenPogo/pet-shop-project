import { ISubcategory } from "./ISubcategory";

export interface ICategory {
  _id: string;
  title: string;
  subcategoryRef: Array<ISubcategory>
}