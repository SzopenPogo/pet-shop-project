import { Link } from 'react-router-dom';
import classes from './ProfileLink.module.scss';

interface IProps {
  link: string;
  title: string;
}

const ProfileLink = ({link, title}: IProps) => {
  return (
    <Link to={link} className={classes['profile-link']}>
      <h2>{title}</h2>
    </Link>
  )
}

export default ProfileLink