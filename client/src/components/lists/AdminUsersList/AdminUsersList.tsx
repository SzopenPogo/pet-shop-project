import classes from './AdminUsersList.module.scss';
import { IUserData } from '../../../interfaces/IUserData'
import AdminUserList from '../AdminUserList/AdminUserList'

interface IProps {
  users: Array<IUserData>
}

const AdminUsersList = ({users}: IProps) => {
  const renderUsers = users.map(user => (
    <AdminUserList
     key={user._id}
     _id={user._id}
     email={user.email}
     isActive={user.isActive}
     adminNote={user.adminNote}
     isAdmin={user.isAdmin}
    />
  ))

  return (
    <ul className={classes.users}>
      {renderUsers}
      {users.length <= 0 && <h1>No users found</h1>}
    </ul>
  )
}

export default AdminUsersList