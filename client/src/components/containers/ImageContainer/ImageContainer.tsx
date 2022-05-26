import classes from './ImageContainer.module.scss';

interface IProps {
  size: string;
  imageUrl: string;
  imagesUrlArray?: string;
}

const ImageContainer = ({
  size,
  imageUrl,
  imagesUrlArray
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
    />
  )
}

export default ImageContainer