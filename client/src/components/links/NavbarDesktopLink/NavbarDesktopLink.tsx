import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../../../constants/backend';
import classes from './NavbarDesktopLink.module.scss';

interface IProps {
  title: string;
  route: string;
  image: string;
}


const NavbarDesktopLink = ({ title, route, image }: IProps) => {
  const backgroundImageStyle = title !== '' ? { backgroundImage: `url(${BACKEND_URL}/${image})` } : {};
  return (
    <Link to={`/${route}`} className={classes.link} >
      <div className={classes.image} style={backgroundImageStyle} />
      <h3 className={classes.title}>{title}</h3>
    </Link>
  )
}

export default NavbarDesktopLink