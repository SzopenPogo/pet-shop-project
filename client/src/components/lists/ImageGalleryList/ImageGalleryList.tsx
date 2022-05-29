import classes from './ImageGalleryList.module.scss';
import { BACKEND_URL } from '../../../constants/backend';
import { generateImageAlt } from '../../../utils/image/generateImageAlt';

interface IProps {
  images: Array<string>;
  setImageToDisplay: (image: string) => void
}

const ImageGalleryList = ({images, setImageToDisplay}: IProps ) => {
  const renderImages = images.map((image, index) => (
    <li 
      className={classes['image-gallery-container']}
      key={index}
      onClick={setImageToDisplay.bind(this, image)}
    >
      <img
        alt={generateImageAlt(image, index)} 
        src={`${BACKEND_URL}/${image}`}
        className={classes.image}
      />
    </li>
  ))

  return (
    <ul className={classes['image-gallery-list']}>
      {images.length > 0 && renderImages}
    </ul>
  )
}

export default ImageGalleryList