import { Dispatch } from "@reduxjs/toolkit";
import { BACKEND_ADMIN_ROUTER_GET_ALL_USERS } from "../../../constants/backend";
import getUrlSign from "../../../utils/url/getUrlSign";
import { adminActions } from "../admin-slice";

export const setAdminGetAllUsersUrl = (
  isActiveParams: string,
  isAdminParams: string,
  ) => (dispatch: Dispatch) => {

  let newUrl = BACKEND_ADMIN_ROUTER_GET_ALL_USERS;
  
  const isActiveOption = isActiveParams 
    ? `${getUrlSign(newUrl, BACKEND_ADMIN_ROUTER_GET_ALL_USERS)}${isActiveParams}`
    : '';

  newUrl = newUrl.concat(isActiveOption);

  const isAdminOption = isAdminParams 
    ? `${getUrlSign(newUrl, BACKEND_ADMIN_ROUTER_GET_ALL_USERS)}${isAdminParams}` 
    : '';

  newUrl = newUrl.concat(isAdminOption);
      

  dispatch(adminActions.editGetUserUrl(newUrl));
}