import { IProductData } from "../product/IProduct";

export interface ICartProduct extends IProductData {
  ammount: number;
}