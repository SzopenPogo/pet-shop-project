export interface IProduct {
  _id: string;
  title: string;
  description: string;
  images: Array<string>;
  price: number;
  subcategoryId: string;
}

export interface ICartProductItem {
  _id: string;
  title: string;
  price: number;
  image: string;
  ammount: number;
}

export interface ISelectedProduct {
  _id: string;
  index: number;
}