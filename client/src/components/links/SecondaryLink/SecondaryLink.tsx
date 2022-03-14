import { Link } from 'react-router-dom';
import classes from './SecondaryLink.module.scss';

interface IProps {
  title: string;
  route: string;
}

const SecondaryLink = ({title, route}: IProps) => {
  return (
    <Link to={route} className={classes['secondary-link']} >{title}</Link>
  )
}

export default SecondaryLink