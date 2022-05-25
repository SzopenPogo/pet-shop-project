import { Dispatch } from "@reduxjs/toolkit";
import { BACKEND_SUBCATEGORY_ROUTER } from "../../../constants/backend";
import getUrlSign from "../../../utils/url/getUrlSign";
import { subcategoryActions } from "../subcategory-slice";

export const setSubcategoryUrl = (
  selectedCategoryId?: string
) => (dispatch: Dispatch) => {
  let newUrl = BACKEND_SUBCATEGORY_ROUTER;

  if(selectedCategoryId) {
    const isActiveOption = `${getUrlSign(newUrl, BACKEND_SUBCATEGORY_ROUTER)}categoryId=${selectedCategoryId}`;

    newUrl = newUrl.concat(isActiveOption);
  }

  dispatch(subcategoryActions.subcategoryUrl(newUrl));
}
