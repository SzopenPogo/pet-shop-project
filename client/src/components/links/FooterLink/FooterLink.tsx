import classes from './FooterLink.module.scss';
import { Link } from 'react-router-dom';

interface IProps {
  title: string;
  route: string;
}

const FooterLink = ({route, title}:IProps) => {
  return (
    <Link to={route} className={classes['footer-link']} >{title}</Link>
  )
}

export default FooterLink