import classes from './CreateCategoryForm.module.scss';
import TextInput from '../../inputs/TextInput/TextInput'
import MainButton from '../../buttons/MainButton/MainButton';
import { FormEvent, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { adminCreateCategory } from '../../../store/category/actions/category-create-actions';

interface IProps {
  closeFormFunction?: () => void;
}

const CreateCategoryForm = ({closeFormFunction}: IProps) => {
  const dispatch = useDispatch();

  const titleInputRef = useRef<HTMLInputElement>(null);

  const token = useSelector((state: RootState) => state.user.token);

  const submitCreateFormHandler = (event: FormEvent) => {
    event.preventDefault();

    const titleValue = titleInputRef.current!.value;
    dispatch(adminCreateCategory(token, titleValue));

    if(closeFormFunction) {
      closeFormFunction();
    }
  }

  return (
    <form className={classes['create-category']} onSubmit={submitCreateFormHandler}>
      <TextInput
        ref={titleInputRef}
        isLabel={true}
        isReadonly={false}
        isRequired={true}
        title={'Category title'}
        value=''
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

export default CreateCategoryForm