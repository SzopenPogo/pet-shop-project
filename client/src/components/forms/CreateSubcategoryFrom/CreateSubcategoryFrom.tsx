import classes from './CreateSubcategoryFrom.module.scss'
import TextInput from '../../inputs/TextInput/TextInput'
import { FormEvent, useRef } from 'react'
import MainButton from '../../buttons/MainButton/MainButton'
import { RootState } from '../../../store';
import { useSelector } from 'react-redux';

interface IProps {
  closeFormFunction?: () => void;
}

const CreateSubcategoryFrom = ({closeFormFunction}: IProps) => {
  const titleInputRef = useRef<HTMLInputElement>(null);

  const token = useSelector((state: RootState) => state.user.token);

  const submitCreateSubcategoryHandler = (event: FormEvent) => {
    event.preventDefault();

    const titleValue = titleInputRef.current!.value;

    if(closeFormFunction) {
      closeFormFunction();
    }
  }

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