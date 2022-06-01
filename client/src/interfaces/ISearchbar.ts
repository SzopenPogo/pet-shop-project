export interface ISearchbarOption {
  _id: string;
  title: string;
  imageUrl: string;
}

export interface ISearchbarData {
  loading: boolean;
  data: Array<ISearchbarOption>;
}