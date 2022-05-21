import { useDispatch } from 'react-redux';
import { toggleFormContainer } from '../../../store/ui/actions/form-container-actions';
import CreateCategoryForm from '../../forms/CreateCategoryForm/CreateCategoryForm';
import FormContainer from '../FormContainer/FormContainer';

const CreateCategoryContainer = () => {
  const dispatch = useDispatch();

  const toggleCategoryForm = () => {
    dispatch(toggleFormContainer());
  }

  return (
    <FormContainer title='Create a new category'>
      <CreateCategoryForm closeFormFunction={toggleCategoryForm} />
    </FormContainer>
  )
}

export default CreateCategoryContainer