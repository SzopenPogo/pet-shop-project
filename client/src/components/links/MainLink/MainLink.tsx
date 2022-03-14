import { Link } from 'react-router-dom';
import classes from './MainLink.module.scss';

interface IProps {
  title: string;
  route: string;
}

const MainLink = ({title, route}: IProps) => {
  return (
    <Link to={route} className={classes['main-link']} >{title}</Link>
  )
}

export default MainLink