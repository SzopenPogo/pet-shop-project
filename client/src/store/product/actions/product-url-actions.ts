import { Dispatch } from "@reduxjs/toolkit";
import { BACKEND_PRODUCT_ROUTER } from "../../../constants/backend";
import getUrlSign from "../../../utils/url/getUrlSign";
import { productActions } from "../product-slice";

export const manageProductUrlAction = (
  productUrlOptions: Array<string>, 
  option: string
  ) => (dispatch: Dispatch) => {

  if(!option) {
    return;
  }

  const optionName = option.split('=')[0];
  let isInOptions = false;

  for (let i = 0; i < productUrlOptions.length; i++) {
    if(productUrlOptions[i].includes(optionName)) {
      isInOptions = true;
      break;
    }
  }
  
  if(isInOptions) {
    let optionIndex;
    
    for (let i = 0; i < productUrlOptions.length; i++) {
      if(productUrlOptions[i].split('=')[0] === optionName) {
        optionIndex = i;
        break;
      }
    }
    
    dispatch(productActions.productUrlOption({
      type: true,
      payload: {
        index: optionIndex,
        option
      }
    }));
    return;
  }

  dispatch(productActions.productUrlOption({
    type: false,
    payload: {
      option
    }
  }));
}

export const setProductUrl = (options: Array<string>) =>  (dispatch: Dispatch) => {
  let newUrl = BACKEND_PRODUCT_ROUTER;

  options.forEach((option) => {
    const urlSign = getUrlSign(newUrl, BACKEND_PRODUCT_ROUTER);
    const optionValue = `${urlSign}${option}`;
    newUrl = newUrl.concat(optionValue);
  });

  dispatch(productActions.productUrl(newUrl));
}