import { FormEvent, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ISelectOption } from '../../../interfaces/ISelectOption';
import { ISubcategory } from '../../../interfaces/ISubcategory';
import { RootState } from '../../../store';
import { adminEditSubcategory } from '../../../store/subcategory/actions/subcategory-edit-actions';
import MainButton from '../../buttons/MainButton/MainButton';
import FileInput from '../../inputs/FileInput/FileInput';
import SelectInput from '../../inputs/SelectInput/SelectInput';
import TextInput from '../../inputs/TextInput/TextInput';
import classes from './SubcategoryEditForm.module.scss';

interface IProps extends ISubcategory {
  index: number;
  isReadonly: boolean;
  toggleFunction?: () => void;
}

const SubcategoryEditForm = ({
  index,
  isReadonly,
  _id,
  title,
  categoryId,
  toggleFunction
  }: IProps) => {
  const dispatch = useDispatch();

  const titleInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const categoryIdInputRef = useRef<HTMLSelectElement>(null);

  const token = useSelector((state: RootState) => state.user.token);
  const categories = useSelector((state: RootState) => state.category.categories.data);


  const editSubcategoryHandler = (event: FormEvent) => {
    event.preventDefault();

    const titleValue = titleInputRef.current!.value;
    const imageValue = imageInputRef.current!.files![0];
    const categoryIdValue = categoryIdInputRef.current!.value;

    dispatch(adminEditSubcategory(token, index, _id, titleValue,imageValue, categoryIdValue));

    if(toggleFunction) {
      toggleFunction();
    }
  }

  const categoriesOptions = [] as Array<ISelectOption>;
  categories.map((category) => (
    categoriesOptions.push({
      title: category.title,
      value: category._id
    })
  ));  

  return (
    <form className={classes['subcategory-edit']} onSubmit={editSubcategoryHandler}>
      <TextInput
        ref={titleInputRef}
        isLabel={true}
        isReadonly={isReadonly}
        isRequired={false}
        title='Subcategory name'
        value={title}
      />

      {!isReadonly && <>
        <FileInput
          ref={imageInputRef}
          isRequired={false}
          title='Subcategory image'
          acceptedFile='image'
        />

        <SelectInput
          ref={categoryIdInputRef}
          isLabel={true}
          isRequired={true}
          title='Category'
          options={categoriesOptions}
          selectedOptionValue={categoryId._id}
        />

        <div className={classes['button-container']}>
          <MainButton
            isSubmit={true}
            title='Edit subcategory'
          />
        </div>
      </>}
    </form>
  )
}

export default SubcategoryEditForm