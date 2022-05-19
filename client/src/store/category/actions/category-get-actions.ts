import axios from "axios";
import { BACKEND_CATEGORY_ROUTER } from "../../../constants/backend";
import { CATEGORY_FAIL, CATEGORY_REQUEST, CATEGORY_SUCCESS } from "../../../constants/category";
import { ISubcategory } from "../../../interfaces/ISubcategory";
import { categoryActions } from "../category-slice";

// CLIENT
// Set active subcategory
export const setActiveSubcategory = (title: string, subcategory: Array<ISubcategory>) => (dispatch: any) => {
  dispatch(categoryActions.setActiveSubcategory({
    title,
    payload: subcategory
  }))
}

// Reset active subcategory
export const resetActiveSubcategory = () => (dispatch: any) => {
  dispatch(categoryActions.setActiveSubcategory({
    title: '',
    payload: [{
      _id: '',
      title: '',
      imageUrl: '',
      categoryId: ''
    }]
  }))
}

// REQUEST TO API
// GET All Categories
export const categoriesFetch = () => async (dispatch: any) => {
  dispatch(categoryActions.get({ type: CATEGORY_REQUEST }));

  const getCategories = async () => {
    return await axios.get(`${BACKEND_CATEGORY_ROUTER}`);
  }

  try {
    const { data } = await getCategories();
    
    dispatch(categoryActions.get({
      type: CATEGORY_SUCCESS,
      payload: data
    }))
  } catch (error) {
    dispatch(categoryActions.get({
      type: CATEGORY_FAIL,
      payload: await getCategories()
    }))
  }
}