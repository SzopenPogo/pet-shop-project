import { Link } from 'react-router-dom';
import classes from './NavbarMobileLink.module.scss';

interface IProps {
  title: string;
  route: string;
}

const NavbarMobileLink = ({title, route}: IProps) => {
  return (
    <Link to={route} className={classes.link}>
      <h3>{title}</h3>
    </Link>
  )
}

export default NavbarMobileLink