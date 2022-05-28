import { BACKEND_URL } from '../../../constants/backend';
import { IImage } from '../../../interfaces/IImage';
import { generateImageAlt } from '../../../utils/image/generateImageAlt';
import classes from './ImagePreviewList.module.scss';

interface IProps extends IImage {
  selectImage: (image: string) => void;
  toggleGallery: () => void;
}

const ImagePreviewList = ({images, title, selectImage, toggleGallery}: IProps) => {
  const imagesToRender = images.slice(0, 3);
  const otherImages = images.length - imagesToRender.length;
  const gridColumns = images.length > 3 ? imagesToRender.length + 1 : imagesToRender.length
  const listStyle = {
    gridTemplateColumns: `repeat(${gridColumns}, 6rem)`
  }

  const renderImages = imagesToRender.map((image, index) => (
    <li 
      className={classes['image-preview-image-container']}
      key={index}
      onMouseEnter={selectImage.bind(this, image)}
      onClick={toggleGallery}
    >
      <img
        alt={generateImageAlt(title, index)} 
        src={`${BACKEND_URL}/${image}`}
        className={classes.image}
      />
    </li>
  ))
  
  return (
    <ul className={classes['image-preview-list']} style={listStyle}>  
      {renderImages}
      {otherImages > 0 && <li 
        className={classes['image-preview-more-images']}
        onClick={toggleGallery}
      >
        {otherImages}+
      </li>}
    </ul>
  )
}

export default ImagePreviewList