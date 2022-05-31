import classes from './ProductForm.module.scss';
import { IProduct } from '../../../interfaces/IProduct';
import TextInput from '../../inputs/TextInput/TextInput';
import NumberInput from '../../inputs/NumberInput/NumberInput';
import TextAreaInput from '../../inputs/TextAreaInput/TextAreaInput';
import { PRODUCT_DESCRIPTION_LENGTH } from '../../../constants/product';
import SubcategorySelect from '../../Select/SubcategorySelect/SubcategorySelect';
import MainButton from '../../buttons/MainButton/MainButton';
import { FormEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminEditProduct } from '../../../store/product/actions/product-edit-actions';
import { RootState } from '../../../store';
import { addInfoMessage } from '../../../store/ui/actions/info-items-actions';
import FilesInput from '../../inputs/FilesInput/FilesInput';
import SecondaryButton from '../../buttons/SecondaryButton/SecondaryButton';
import DeleteImageModal from '../../modals/DeleteImageModal/DeleteImageModal';
import { adminDeleteProductImage } from '../../../store/product/actions/product-delete-image-actions';

interface IProps extends IProduct {
  index: number;
  isReadonly: boolean;
  toggleFunction?: () => void;
}

const ProductForm = ({
  _id,
  description,
  images,
  price,
  subcategoryId,
  title,
  index,
  isReadonly,
  toggleFunction
  }:IProps) => {
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.user.token);
  const isLoading = useSelector((state: RootState) =>  state.product.products.loading);

  const titleInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const subcategoryInputRef = useRef<HTMLSelectElement>(null);
  const imagesInputRef = useRef<HTMLInputElement>(null);

  const [isDeleteModalActive, setIsDeleteModalActive] = useState<boolean>(false);

  const toggleDeleteImageModal = () => {
    setIsDeleteModalActive(!isDeleteModalActive)
  }

  const deleteImageHandler = (image: string) => {
    dispatch(adminDeleteProductImage(token, _id, index, image));

    dispatch(addInfoMessage({
      message: `Image deleted!`,
      isPositive: false,
      timeout: 1500
    }));
  }

  const submitEditProductHandler = (event: FormEvent) => {
    event.preventDefault();

    const titleValue = titleInputRef.current!.value;
    const priceValue = priceInputRef.current!.value;
    const descriptionValue = descriptionInputRef.current!.value;
    const subcategoryIdValue = subcategoryInputRef.current!.value;
    const imagesValue = imagesInputRef.current!.files!;

    dispatch(adminEditProduct(
      token, 
      _id, 
      index, 
      titleValue, 
      +priceValue, 
      subcategoryIdValue, 
      descriptionValue,
      imagesValue
    ));

    dispatch(addInfoMessage({
      message: `Product ${title} edited`,
      isPositive: true,
      timeout: 1500
    }));

    if(toggleFunction) {
      toggleFunction();
    }
  }

  return (
    <>
      <form className={classes['product-form']} onSubmit={submitEditProductHandler}>
        <TextInput
          ref={titleInputRef}
          isLabel={true}
          isReadonly={isReadonly}
          isRequired={false}
          title='Title'
          value={title}
        />

        <NumberInput
          ref={priceInputRef}
          isLabel={true}
          isReadonly={isReadonly}
          isRequired={false}
          title='Price'
          value={price}
        />

        <TextAreaInput
          ref={descriptionInputRef}
          isLabel={true}
          isReadonly={isReadonly}
          title='Description'
          value={description}
          maxLength={PRODUCT_DESCRIPTION_LENGTH}
        />

        {!isReadonly && 
        <>
          <SubcategorySelect
            ref={subcategoryInputRef}
            selectedValue={subcategoryId}
          />

          <div className={classes['file-button-container']}>
            <FilesInput
              ref={imagesInputRef}
              isRequired={false}
              title='Add images'
              acceptedFile='image'
            />
          </div>

          {images.length > 0 && <div className={classes['button-container']}>
            <SecondaryButton
              isSubmit={false}
              title='Delete images'
              onClick={toggleDeleteImageModal}
            />
          </div>}
        
          <div className={classes['submit-button-container']}>
            <MainButton
              isSubmit={true}
              title='Edit product'
            />
          </div>
        </>}
      </form>
      <DeleteImageModal
        closeWindow={toggleDeleteImageModal}
        deleteImage={deleteImageHandler}
        images={images}
        isActive={isDeleteModalActive}
        title='Delete product images'
        isLoading={isLoading}
      />
    </>
  )
}

export default ProductForm