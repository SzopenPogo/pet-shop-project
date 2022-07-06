export interface ISearchbarOption {
  _id: string;
  title: string;
  images: Array<string>;
}

export interface ISearchbarData {
  loading: boolean;
  data: Array<ISearchbarOption>;
}