import classes from './CreateCategoryForm.module.scss';
import TextInput from '../../inputs/TextInput/TextInput'

const CreateCategoryForm = () => {
  return (
    <form className={classes['create-category']}>
      <TextInput
        isLabel={true}
        isReadonly={false}
        isRequired={true}
        title={'Category name'}
        value=''
      />
    </form>
  )
}

export default CreateCategoryForm