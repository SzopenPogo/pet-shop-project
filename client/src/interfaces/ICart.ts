import { IProduct } from "./IProduct";

export interface ICartAddData {
  _id: string;
  ammount: number;
}

export interface ICartProduct extends IProduct {
  ammount: number;
}