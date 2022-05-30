import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux';
import { BACKEND_URL } from '../../../constants/backend';
import { RootState } from '../../../store';
import { generateImageAlt } from '../../../utils/image/generateImageAlt';
import CloseButton from '../../buttons/CloseButton/CloseButton';
import ImageGalleryList from '../../lists/ImageGalleryList/ImageGalleryList';
import NumberFromNumbers from '../../spans/NumberFromNumbers/NumberFromNumbers';
import classes from './GalleryModal.module.scss';
import { CSSTransition } from 'react-transition-group';

interface IProps {
  isActive: boolean;
  images: Array<string>;
  activeImage: string;
  galleryClose: () => void;
  title: string;
}

const GalleryModal = ({isActive, images, activeImage, galleryClose, title}: IProps) => {

  const isMobile = useSelector((state: RootState) => state.clientWindow.isWindowMobile);
  const [mainImage, setMainImage] = useState<string>(activeImage);
  const nodeRef = useRef(null);
  
  const changeMainImage = (image: string) => {
    setMainImage(image)
  }

  const findMainImageIndexInImages = useCallback(() => {
    if(images.includes(mainImage)) {
      return images.findIndex(image => image === mainImage);
    }
    return 0;
  }, [images, mainImage])

  const changeMainImageByArrow = useCallback((isIncreasing: boolean) => {
    const mainImageIndex = findMainImageIndexInImages();
    let nextImageIndex;

    if(isIncreasing) {
      nextImageIndex = mainImageIndex + 1;
      
    } else {
      nextImageIndex = mainImageIndex - 1;
    }

    if(nextImageIndex > images.length - 1) {
      nextImageIndex = 0;
    } else if (nextImageIndex < 0) {
      nextImageIndex = images.length - 1;
    }
    
    setMainImage(images[nextImageIndex]);
  }, [findMainImageIndexInImages, images])

  const galleryKeyHandler = useCallback((event: KeyboardEvent) => {
    if(event.key === 'ArrowLeft') {
      changeMainImageByArrow(false);
    }
    if(event.key === 'ArrowRight') {
      changeMainImageByArrow(true);
    }
    if(event.key === 'Escape') {
      return galleryClose();
    }
  }, [changeMainImageByArrow, galleryClose])

  useEffect(() => {
    window.addEventListener('keyup', galleryKeyHandler);
    return () => {
      window.removeEventListener('keyup', galleryKeyHandler);
    };
  }, [galleryKeyHandler]);

  return createPortal(
    <CSSTransition
        nodeRef={nodeRef}
        in={isActive}
        timeout={200}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: classes['enter'],
          enterActive: classes['enter-active'],
          exit: classes['exit'],
          exitActive: classes['exit-active']
        }}
      >
      <div className={classes['gallery-modal-container']} ref={nodeRef}>
        <div className={classes['gallery-head']}>
          <NumberFromNumbers 
            number={findMainImageIndexInImages() + 1}
            numbers={images.length}
          />
          <CloseButton onClick={galleryClose} />
        </div>

        <div className={classes['gallery-main-image-container']}>
          <img
            src={`${BACKEND_URL}/${mainImage}`}
            alt={generateImageAlt(title, 0)}
            className={classes['main-image']}
          />
          {images.length > 1 && <div className={classes['gallery-main-image-manage-container']}>
            <button
              className={classes['left-arrow']}
              onClick={changeMainImageByArrow.bind(this, false)}
            />
            <button
              className={classes['right-arrow']}
              onClick={changeMainImageByArrow.bind(this, true)}
            />
          </div>}
        </div>

        <div className={classes['gallery-image-info']}>
          {!isMobile && <h1 className={classes['gallery-title']}>
            {title}
            </h1>}
          <div className={classes['gallery-image-list']}>
            <ImageGalleryList
              images={images}
              setImageToDisplay={changeMainImage}
            />
          </div>
        </div>
      </div>
    </CSSTransition>
  , document.getElementById('react-gallery-modal')!)
}

export default GalleryModal