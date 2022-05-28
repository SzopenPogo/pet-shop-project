import { useState } from 'react';
import { BACKEND_URL } from '../../../constants/backend';
import { IImage } from '../../../interfaces/IImage';
import { generateImageAlt } from '../../../utils/image/generateImageAlt';
import ImagePreviewList from '../../lists/ImagePreviewList/ImagePreviewList';
import GalleryModal from '../../modals/GalleryModal/GalleryModal';
import classes from './ProductItemImageContainer.module.scss';

const ProductItemImageContainer = ({images, title}: IImage) => {

  const [activeImage, setActiveImage] = useState<string>(images[0] ? images[0] : '');
  const [isGalleryActive, setIsGalleryActive] = useState<boolean>(false);

  const selectImageHandler = (image: string) => {
    setActiveImage(image);
  }

  const toggleGallery = () => {
    setIsGalleryActive(!isGalleryActive);
  }

  return (
    <>
      <div className={classes['product-images']}>
        <div className={classes['product-image-container']}>
          <img 
            src={`${BACKEND_URL}/${activeImage}`}
            alt={generateImageAlt(activeImage, 0)}
            className={classes['product-image']}
            onClick={toggleGallery}
          />
        </div>
        <ImagePreviewList
          images={images}
          title={title}
          selectImage={selectImageHandler}
          toggleGallery={toggleGallery}
          />
      </div>
      {isGalleryActive && <GalleryModal />}
    </>
  )
}

export default ProductItemImageContainer