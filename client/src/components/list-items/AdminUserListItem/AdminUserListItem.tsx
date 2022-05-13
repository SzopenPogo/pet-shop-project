import classes from './AdminUserListItem.module.scss';

interface IProps {
  title: string,
  data: string
}

const AdminUserListItem = ({title, data}: IProps) => {
  return (
    <li className={classes['user-item']}>
      <span className={classes['user-item__title']}>{title}:</span>
      <span className={classes['user-item__data']}>{data}</span>
    </li>
  )
}

export default AdminUserListItem