export interface IProduct {
  _id: string;
  title: string;
  description: string;
  images: Array<string>;
  price: number;
  subcategoryId: string;
}