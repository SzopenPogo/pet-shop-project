import classes from './AdminUsersList.module.scss';
import { IUserData } from '../../../interfaces/IUserData'
import AdminUserDataListItem from '../../list-items/AdminUserDataListItem/AdminUserDataListItem'

interface IProps {
  users: Array<IUserData>
}

const AdminUsersList = ({users}: IProps) => {
  const renderUsers = users.map(user => (
    <AdminUserDataListItem
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
    </ul>
  )
}

export default AdminUsersList