import classes from './ProductForm.module.scss';
import { IProduct } from '../../../interfaces/IProduct';
import TextInput from '../../inputs/TextInput/TextInput';
import NumberInput from '../../inputs/NumberInput/NumberInput';
import TextAreaInput from '../../inputs/TextAreaInput/TextAreaInput';
import { PRODUCT_DESCRIPTION_LENGTH } from '../../../constants/product';
import SubcategorySelect from '../../Select/SubcategorySelect/SubcategorySelect';
import MainButton from '../../buttons/MainButton/MainButton';
import { FormEvent, useRef } from 'react';

interface IProps extends IProduct {
  index: number;
  isReadonly: boolean;
}

const ProductForm = ({
  _id,
  description,
  images,
  price,
  subcategoryId,
  title,
  index,
  isReadonly
  }:IProps) => {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const subcategoryInputRef = useRef<HTMLSelectElement>(null);

  const submitEditProductHandler = (event: FormEvent) => {
    event.preventDefault();
  }

  return (
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
      
        <div className={classes['submit-button-container']}>
          <MainButton
            isSubmit={true}
            title='Edit product'
          />
        </div>
      </>}

      
    </form>
  )
}

export default ProductForm