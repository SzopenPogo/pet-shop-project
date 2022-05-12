export const BACKEND_URL = 'http://localhost:5000';

// CATEGORY ROUTES
export const BACKEND_CATEGORY_ROUTER = `${BACKEND_URL}/category`;

// USER ROUTES
export const BACKEND_USER_ROUTER = `${BACKEND_URL}/user`;
export const BACKEND_USER_ROUTER_LOGIN = `${BACKEND_URL}/user/login`;
export const BACKEND_USER_ROUTER_GET_ME = `${BACKEND_URL}/user/me`;
export const BACKEND_USER_ROUTER_LOGOUT = `${BACKEND_URL}/user/logout`;
export const BACKEND_USER_ROUTER_REGISTER = `${BACKEND_URL}/user/register`;
export const BACKEND_USER_ROUTER_AVATAR = `${BACKEND_URL}/user/avatar`;
export const BACKEND_USER_ROUTER_EDIT_DATA = `${BACKEND_URL}/user/edit/me`;
export const BACKEND_USER_ROUTER_LOGOUT_ALL = `${BACKEND_URL}/user/logoutAll`;

//ADMIN ROUTES
export const BACKEND_ADMIN_ROUTER_GET_ALL_USERS = `${BACKEND_URL}/user`;
export const BACKEND_ADMIN_ROUTER_BAN_USER = `${BACKEND_URL}/user/ban`;
export const BACKEND_ADMIN_ROUTER_UNBAN_USER = `${BACKEND_URL}/user/unban`;

//ADDRESS
export const BACKEND_ADDRESS_ROUTER = `${BACKEND_URL}/address`;