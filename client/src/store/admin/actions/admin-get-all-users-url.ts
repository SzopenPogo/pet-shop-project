import { Dispatch } from "@reduxjs/toolkit";
import { BACKEND_ADMIN_ROUTER_GET_ALL_USERS } from "../../../constants/backend";
import getUrlSign from "../../../utils/url/getUrlSign";
import { adminActions } from "../admin-slice";

export const setAdminGetAllUsersUrl = (
  isActiveParams: string,
  isAdminParams: string,
  searchEmailValue: string
  ) => (dispatch: Dispatch) => {

  let newUrl = BACKEND_ADMIN_ROUTER_GET_ALL_USERS;
  
  if(isActiveParams) {
    const isActiveOption = `${getUrlSign(newUrl, BACKEND_ADMIN_ROUTER_GET_ALL_USERS)}${isActiveParams}`;

    newUrl = newUrl.concat(isActiveOption);
  }

  if(isAdminParams) {
    const isAdminOption = `${getUrlSign(newUrl, BACKEND_ADMIN_ROUTER_GET_ALL_USERS)}${isAdminParams}`;

    newUrl = newUrl.concat(isAdminOption);
  }

  if(searchEmailValue) {
    const isSearchingOption = `${getUrlSign(newUrl, BACKEND_ADMIN_ROUTER_GET_ALL_USERS)}searchingEmail=${searchEmailValue}`;

    newUrl = newUrl.concat(isSearchingOption);
  }

  
  dispatch(adminActions.editGetUserUrl(newUrl));
}