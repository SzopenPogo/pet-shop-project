import { IDeliveryAddressData } from "./IAddressData";
import { IOrderProduct } from "./IProduct";

export interface IOrder extends IDeliveryAddressData {
  _id?: string;
  userId?: string;
  paymentMethod: string;
  status?: string;
  products: Array<IOrderProduct>
}