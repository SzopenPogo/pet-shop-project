import { Dispatch } from "@reduxjs/toolkit";
import { categoryActions } from "../category-slice";

export const selectCategory = (_id: string, index: number) => (dispatch: Dispatch) => {
  dispatch(categoryActions.selectCategory({
    _id,
    index
  }));
}