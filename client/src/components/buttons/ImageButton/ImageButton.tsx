import classes from './ImageButton.module.scss';

interface IProps {
  width: string;
  height: string;
  image: string;
  onClick: () => void;
}

const ImageButton = ({width, height, image, onClick}: IProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={classes['image-button']}
      style={{
        width: `${width}`,
        height: `${height}`,
        backgroundImage: `url(${image})`
      }}
    />
  )
}

export default ImageButton