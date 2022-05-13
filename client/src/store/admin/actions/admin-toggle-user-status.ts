import { addInfoMessage } from "../../ui/actions/info-items-actions";
import { adminBanUser } from "./admin-ban-user";
import { adminGetAllUsers } from "./admin-get-all-users";
import { adminUnbanUser } from "./admin-unban-user";

export const adminToggleUserSatus = (
  isActive: boolean,
  token: string, 
  userId: string, 
  userEmail: string,
  adminNote: string
  ) => (dispatch: any) => {
  
  const showInfoAndFetchUsers = (message: string, isPositive: boolean) => {
    dispatch(addInfoMessage({message, timeout: 1500, isPositive}));
    dispatch(adminGetAllUsers(token));
  }

  if(isActive) {
    dispatch(adminBanUser(
      token, 
      userId, 
      adminNote, 
      showInfoAndFetchUsers.bind(this, `User ${userEmail} banned.`, false)
    ))
  } else {
    dispatch(adminUnbanUser(
      token, 
      userId,
      showInfoAndFetchUsers.bind(this, `User ${userEmail} unbanned.`, true)
    ));
  }
}