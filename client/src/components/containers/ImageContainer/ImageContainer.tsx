import { Children, ReactChild } from 'react';
import classes from './ImageContainer.module.scss';

interface IProps {
  size: string;
  imageUrl: string;
  children?: ReactChild;
}

const ImageContainer = ({
  size,
  imageUrl,
  children
  }: IProps) => {

  const imageStyle = {
    width: `${size}`,
    height: `${size}`,
    backgroundImage: `url(${imageUrl})`
  }
  return (
    <div
      className={classes.image}
      style={imageStyle}
    >
      {children}
    </div>
  )
}

export default ImageContainer