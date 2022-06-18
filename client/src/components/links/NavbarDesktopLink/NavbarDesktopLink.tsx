import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../../../constants/backend';
import classes from './NavbarDesktopLink.module.scss';

interface IProps {
  title: string;
  route: string;
  image: string;
}


const NavbarDesktopLink = ({ title, route, image }: IProps) => {
  return (
    <Link to={`${route}`} className={classes.link} >
      <img className={classes.image} src={`${BACKEND_URL}/${image}`} alt={`${title}-img`} />
      <h3 className={classes.title}>{title}</h3>
    </Link>
  )
}

export default NavbarDesktopLink