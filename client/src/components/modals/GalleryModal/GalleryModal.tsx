import { createPortal } from 'react-dom'
import classes from './GalleryModal.module.scss';

const GalleryModal = () => {
  return createPortal(
    <div className={classes['gallery-modal-container']}>
      gallery
    </div>
  , document.getElementById('react-gallery-modal')!)
}

export default GalleryModal