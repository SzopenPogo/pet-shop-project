export interface IContact {
  _id?: string;
  phoneNumber: number;
  country: string;
  postalCode: string;
  city: string;
  street: string;
  homeNumber: string;
  bankNumber: string;
}

export interface ISelectedContact {
  _id: string;
  index: number;
}