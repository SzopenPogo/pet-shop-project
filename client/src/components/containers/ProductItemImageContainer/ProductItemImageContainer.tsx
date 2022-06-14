import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../../../constants/backend';
import { IImage } from '../../../interfaces/IImage';
import { generateImageAlt } from '../../../utils/image/generateImageAlt';
import ImagePreviewList from '../../lists/ImagePreviewList/ImagePreviewList';
import GalleryModal from '../../modals/GalleryModal/GalleryModal';
import classes from './ProductItemImageContainer.module.scss';
import imageIcon from '../../../images/icon/imageIcon.svg';

const ProductItemImageContainer = ({images, title}: IImage) => {

  const [activeImage, setActiveImage] = useState<string>(images[0] ? images[0] : '');
  const [isGalleryActive, setIsGalleryActive] = useState<boolean>(false);
  const [isEmptyImage, setisEmptyImage] = useState<boolean>(false);

  useEffect(() => {
    //Update activeImage when images array contains at least 1 image
    //It's used in useEffect to prevent empty imageUrl after
    //adding new images, where images.length was 0
    if(!isEmptyImage && images.length > 0) {
      selectImageHandler(images[0]);
      setisEmptyImage(true);
    }
    if(isEmptyImage && images.length <= 0) {
      setisEmptyImage(false);
    }
  }, [activeImage, images, isEmptyImage])
  

  const selectImageHandler = (image: string) => {
    setActiveImage(image);
  }

  const toggleGallery = () => {
    setIsGalleryActive(!isGalleryActive);
  }

  const closeGallery = () => {
    setIsGalleryActive(false);
  }

  const imageUrl = images.length > 0 && activeImage ? `${BACKEND_URL}/${activeImage}` : imageIcon;
  return (
    <>
      <div className={classes['product-images']}>
        <div className={classes['product-image-container']}>
          <img 
            src={imageUrl}
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
      <GalleryModal
        isActive={isGalleryActive}
        images={images}
        activeImage={activeImage}
        galleryClose={closeGallery}
        title={title}
      />
    </>
  )
}

export default ProductItemImageContainer