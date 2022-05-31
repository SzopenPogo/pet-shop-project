import classes from './DeleteImageModal.module.scss';
import MainModal from '../MainModal/MainModal';
import ImageContainer from '../../containers/ImageContainer/ImageContainer';
import { BACKEND_URL } from '../../../constants/backend';
import DeleteButton from '../../buttons/DeleteButton/DeleteButton';
import { useEffect } from 'react';
import Spinner from '../../spinners/Spinner/Spinner';

interface IProps {
  title: string;
  isActive: boolean;
  images: Array<string>;
  isLoading: boolean;
  closeWindow: () => void;
  deleteImage: (image: string) => void;
}

const DeleteImageModal = ({
  title,
  isActive,
  images,
  isLoading,
  closeWindow,
  deleteImage
}: IProps) => {

  const deleteImageHandler = (image: string) => {
    deleteImage(image);

    if(images.length <= 1) {
      return closeWindow()
    }
  }

  const renderImages = images.map(image => (
    <ImageContainer
      key={image}
      size='7rem'
      imageUrl={`${BACKEND_URL}/${image}`}
    >
      <div className={classes['image-button-container']}>
        <DeleteButton onClick={deleteImageHandler.bind(this, image)} />
      </div>
    </ImageContainer>
    ))

  return (
    <MainModal
      timeout={200}
      title={title}
      activate={isActive}
      closeFunction={closeWindow}
    >
      <div className={classes['delete-image-container']}>
        {renderImages}
        {isLoading && <div className={classes['delete-image-spinner']}>
          <Spinner size={'11rem'} borderSize={'.75rem'} color={'black'} />  
        </div>}
      </div>
    </MainModal>
  )
}

export default DeleteImageModal