import { Dispatch } from "@reduxjs/toolkit";
import { BACKEND_ORDER_ROUTER } from "../../../constants/backend";
import getUrlSign from "../../../utils/url/getUrlSign";
import { orderActions } from "../order-slice";

export const manageOrderUrlAction = (
  orderUrlOptions: Array<string>, 
  option: string,
  resetOptions?: boolean
  ) => (dispatch: Dispatch) => {

  if(!option) {
    return;
  }

  if(resetOptions) {
    dispatch(orderActions.resetOrderUrlOptions());
  }

  const optionName = option.split('=')[0];
  let isInOptions = false;

  for (let i = 0; i < orderUrlOptions.length; i++) {
    if(orderUrlOptions[i].includes(optionName)) {
      isInOptions = true;
      break;
    }
  }
  
  if(isInOptions) {
    let optionIndex;
    
    for (let i = 0; i < orderUrlOptions.length; i++) {
      if(orderUrlOptions[i].split('=')[0] === optionName) {
        optionIndex = i;
        break;
      }
    }
    
    dispatch(orderActions.orderUrlOption({
      type: true,
      payload: {
        index: optionIndex,
        option
      }
    }));
    return;
  }

  dispatch(orderActions.orderUrlOption({
    type: false,
    payload: {
      option
    }
  }));
}

export const setOrderUrl = (options: Array<string>) =>  (dispatch: Dispatch) => {
  let newUrl = BACKEND_ORDER_ROUTER;

  options.forEach((option) => {
    const urlSign = getUrlSign(newUrl, BACKEND_ORDER_ROUTER);
    const optionValue = `${urlSign}${option}`;
    newUrl = newUrl.concat(optionValue);
  });

  dispatch(orderActions.orderUrl(newUrl));
}