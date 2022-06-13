import { Link } from 'react-router-dom';
import { IPatch } from '../../../interfaces/IPath';
import classes from './PathContainer.module.scss';

interface IProps {
  pathes: Array<IPatch>;
}

const PathContainer = ({ pathes }: IProps) => {

  const renderPathes = pathes.map((path, index) => (
    <div key={Math.random()} className={classes['path-item']}>
      <Link 
        to={path.route}
        className={classes['path-link']}
      >
        {path.title}
      </Link>
      {++index < pathes.length ? <span>{'>'}</span> : ''}
    </div>
  ))

  return (
    <div className={classes['path-container']}>
      {renderPathes}
    </div>
  )
}

export default PathContainer