import { Dispatch } from "@reduxjs/toolkit";
import { subcategoryActions } from "../subcategory-slice";

export const selectSubcategory = (_id: string) => (dispatch: Dispatch) => {
  dispatch(subcategoryActions.select({payload: _id}));
}