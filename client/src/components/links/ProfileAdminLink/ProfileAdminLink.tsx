import classes from './ProfileAdminLink.module.scss';
import { Link } from 'react-router-dom';

interface IProps {
  link: string;
  title: string;
  isAdmin: boolean;
}

const ProfileAdminLink = ({link, title, isAdmin}: IProps) => {
  return (
    <>
      {isAdmin && <Link to={link} className={classes['profile-admin-link']}>
        <h2>{title}</h2>
        <span>(ADMIN)</span>
      </Link>}
    </>
  )
}

export default ProfileAdminLink