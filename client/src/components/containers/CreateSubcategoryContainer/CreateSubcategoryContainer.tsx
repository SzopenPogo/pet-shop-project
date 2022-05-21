import { useDispatch } from 'react-redux';
import { toggleFormContainer } from '../../../store/ui/actions/form-container-actions';
import CreateSubcategoryFrom from '../../forms/CreateSubcategoryFrom/CreateSubcategoryFrom';
import FormContainer from '../FormContainer/FormContainer';

const CreateSubcategoryContainer = () => {
  const dispatch = useDispatch();

  const toggleSubcategoryForm = () => {
    dispatch(toggleFormContainer());
  }

  
  return (
    <FormContainer title='Create a new subcategory'>
      <CreateSubcategoryFrom closeFormFunction={toggleSubcategoryForm} />
    </FormContainer>
  )
}

export default CreateSubcategoryContainer