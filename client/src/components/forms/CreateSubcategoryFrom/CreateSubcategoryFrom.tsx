import classes from './CreateSubcategoryFrom.module.scss'
import TextInput from '../../inputs/TextInput/TextInput'
import { FormEvent, useRef } from 'react'
import MainButton from '../../buttons/MainButton/MainButton'
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import FileInput from '../../inputs/FileInput/FileInput';
import SelectInput from '../../inputs/SelectInput/SelectInput';
import {ISelectOption} from '../../../interfaces/ISelectOption';
import { addInfoMessage } from '../../../store/ui/actions/info-items-actions';
import { adminSubcategoryCreate } from '../../../store/subcategory/actions/subcategory-create-actions';

interface IProps {
  closeFormFunction?: () => void;
}

const CreateSubcategoryFrom = ({closeFormFunction}: IProps) => {
  const dispatch = useDispatch();

  const titleInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const categoryIdInputRef = useRef<HTMLSelectElement>(null);

  const token = useSelector((state: RootState) => state.user.token);
  const categories = useSelector((state: RootState) => state.category.categories.data);

  const submitCreateSubcategoryHandler = (event: FormEvent) => {
    event.preventDefault();

    if (!imageInputRef.current!.files) {
      return dispatch(addInfoMessage({
        message: 'Image is required',
        isPositive: false,
        timeout: 1500
      }))
    }

    const titleValue = titleInputRef.current!.value;
    const imageValue = imageInputRef.current!.files[0];
    const categoryIdVal = categoryIdInputRef.current!.value;

    dispatch(adminSubcategoryCreate(token, titleValue, imageValue, categoryIdVal));

    if(closeFormFunction) {
      closeFormFunction();
    }

    dispatch(addInfoMessage({
      message: 'Subcategory created!',
      isPositive: true,
      timeout: 1500
    }));
  }

  const categoriesOptions = [] as Array<ISelectOption>;
  categories.map((category) => (
    categoriesOptions.push({
      title: category.title,
      value: category._id
    })
  ));

  return (
    <form className={classes['create-subcategory']} onSubmit={submitCreateSubcategoryHandler}>
      <TextInput
        ref={titleInputRef}
        isLabel={true}
        isReadonly={false}
        isRequired={true}
        title={'Subcategory title'}
        value=''
      />
      <FileInput
        ref={imageInputRef}
        title='Subcategory photo'
        isRequired={true}
        acceptedFile='image'
      />
      <SelectInput
        ref={categoryIdInputRef}
        isLabel={true}
        isRequired={true}
        title='Category'
        options={categoriesOptions}
      />
      <div className={classes['submit-button-container']}>
        <MainButton
          isSubmit={true}
          title='Create'
        />
      </div>
    </form>
  )
}

export default CreateSubcategoryFrom