import { ICategory } from "../../interfaces/ICategory"

export const findCategoryId = (subcategoryId: string, categories: Array<ICategory>) => {
  let categoryId = '';

  for (let i = 0; i < categories.length; i++) {
    if(categoryId) {
      break;
    }

    const subcategories = categories[i].subcategoryRef;
    for (let j = 0; j < subcategories.length; j++) {
      if(subcategories[j]._id === subcategoryId) {
        categoryId = categories[i]._id;
        break;
      }
    }
  }

  return categoryId;
}