import { Link } from 'react-router-dom'
import classes from './ImageLink.module.scss';

interface IProps {
  linkTo: string;
  width: string;
  height: string;
  image: string;
}

const ImageLink = ({linkTo, width, height, image}: IProps) => {
  return (
    <Link
      to={linkTo}
      className={classes['image-link']}
      style={{
        width: `${width}`,
        height: `${height}`,
        backgroundImage: `url(${image})`
      }}
    />
  )
}

export default ImageLink