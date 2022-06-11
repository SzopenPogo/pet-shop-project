export interface ISlider {
  _id: string;
  title: string;
  description: string;
  color: string;
  pageUrl: string;
  imageUrl?: string;
}

export interface ISelectedSlider {
  _id: string;
  index: number;
}