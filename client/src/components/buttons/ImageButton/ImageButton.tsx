import classes from './ImageButton.module.scss';

interface IProps {
  width: string;
  height: string;
  image: string;
  isSubmit: boolean;
  onClick: () => void;
}

const ImageButton = ({ width, height, image, isSubmit, onClick }: IProps) => {
  const buttonType = isSubmit ? 'submit' : 'button';
  return (
    <button
      type={buttonType}
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