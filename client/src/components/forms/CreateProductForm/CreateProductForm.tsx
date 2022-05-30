import classes from './CreateProductForm.module.scss';
import { CSSTransition } from 'react-transition-group';
import { FormEvent, useRef } from 'react';
import TextInput from '../../inputs/TextInput/TextInput';
import NumberInput from '../../inputs/NumberInput/NumberInput';
import TextAreaInput from '../../inputs/TextAreaInput/TextAreaInput';
import { useDispatch, useSelector } from 'react-redux';
import SubcategorySelect from '../../Select/SubcategorySelect/SubcategorySelect';
import CloseButton from '../../buttons/CloseButton/CloseButton';
import FilesInput from '../../inputs/FilesInput/FilesInput';
import { adminCreateProduct } from '../../../store/product/actions/product-create-actions';
import { RootState } from '../../../store';
import MainButton from '../../buttons/MainButton/MainButton';
import { addInfoMessage } from '../../../store/ui/actions/info-items-actions';
import { PRODUCT_DESCRIPTION_LENGTH } from '../../../constants/product';

interface IProps {
  activate: boolean;
  timeout: number;
  toggleFunction?: () => void;
}

const CreateProductForm = ({ activate, timeout, toggleFunction }: IProps) => {
  const dispatch = useDispatch();

  const nodeRef = useRef(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const subcategoryInputRef = useRef<HTMLSelectElement>(null);
  const imagesInputRef = useRef<HTMLInputElement>(null);

  const token = useSelector((state: RootState) => state.user.token);

  const createProductSubmitHandler = (event: FormEvent) => {
    event.preventDefault();

    const titleValue = titleInputRef.current!.value;
    const priceValue = priceInputRef.current!.value;
    const descriptionValue = descriptionInputRef.current!.value;
    const subcategoryValue = subcategoryInputRef.current!.value;
    const imagesValue = imagesInputRef.current!.files!;
    
    dispatch(adminCreateProduct(
      token, 
      titleValue, 
      descriptionValue,
      imagesValue,
      +priceValue,
      subcategoryValue
    ));

    if(toggleFunction) {
      toggleFunction();
    }

    dispatch(addInfoMessage({
      message: `Product ${titleValue} created`,
      isPositive: true,
      timeout: 1500
    }))
  }


  return (
    <CSSTransition
        nodeRef={nodeRef}
        in={activate}
        timeout={timeout}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: classes['enter'],
          enterActive: classes['enter-active'],
          exit: classes['exit'],
          exitActive: classes['exit-active']
        }}
      >
      <form 
        ref={nodeRef}
        className={classes['create-product']}
        onSubmit={createProductSubmitHandler}
      >
        <h1>Create new product:</h1>
        <TextInput
          ref={titleInputRef}
          isLabel={true}
          isReadonly={false}
          isRequired={true}
          title='Title'
          value=''
        />

        <NumberInput
          ref={priceInputRef}
          isLabel={true}
          isReadonly={false}
          isRequired={true}
          title='Price'
          value={0}
        />

        <TextAreaInput
          ref={descriptionInputRef}
          isLabel={true}
          isReadonly={false}
          title='Description'
          value=''
          isRequired={true}
          maxLength={PRODUCT_DESCRIPTION_LENGTH}
        />

        <SubcategorySelect
          ref={subcategoryInputRef}
        />

        <FilesInput
          ref={imagesInputRef}
          title='Images'
          isRequired={true}
          acceptedFile='image'
        />

        {toggleFunction && 
          <div className={classes['close-button-container']}>
            <CloseButton onClick={toggleFunction} />
          </div>}
        <MainButton
          title='Create product'
          isSubmit={true}
        />
      </form>
    </CSSTransition>
  )
}

export default CreateProductForm