export interface ISubcategory {
  _id: string;
  title: string;
  imageUrl: string;
  categoryId: {
    _id: string;
    title: string;
  };
}