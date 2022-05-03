export interface IAddressData {
  _id: string;
  userId: string;
  country: string;
  postalCode: string;
  city: string;
  street: string;
  homeNumber: string;
  phoneNumber: string;
}

export interface IAddressArray {
  data: Array<IAddressData>;
}

export interface ISelectedAddress extends IAddressData {
  index: number;
}