import { FormEvent, useRef } from 'react';
import classes from './CreateSliderForm.module.scss';
import { CSSTransition } from 'react-transition-group';
import CloseButton from '../../buttons/CloseButton/CloseButton';
import TextInput from '../../inputs/TextInput/TextInput';
import TextAreaInput from '../../inputs/TextAreaInput/TextAreaInput';
import { SLIDER_DESCRIPTION_LENGTH } from '../../../constants/slider';
import FileInput from '../../inputs/FileInput/FileInput';
import ColorInput from '../../inputs/ColorInput/ColorInput';
import MainButton from '../../buttons/MainButton/MainButton';
import { useDispatch, useSelector } from 'react-redux';
import { addInfoMessage } from '../../../store/ui/actions/info-items-actions';
import { adminCreateSlider } from '../../../store/slider/actions/create-slider-action';
import { RootState } from '../../../store';

interface IProps {
  activate: boolean;
  timeout: number;
  toggleForm: () => void;
}

const CreateSliderForm = ({ activate, timeout, toggleForm }: IProps) => {
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.user.token);

  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);
  const nodeRef = useRef(null);

  const createSliderHandler = (event: FormEvent) => {
    event.preventDefault();

    if (!imageInputRef.current!.files) {
      return dispatch(addInfoMessage({
        message: 'Image is required',
        isPositive: false,
        timeout: 1500
      }))
    }

    const titleValue = titleInputRef.current!.value;
    const descriptionValue = descriptionInputRef.current!.value;
    const imageValue = imageInputRef.current!.files[0];
    const urlValue = urlInputRef.current!.value;
    const colorValue = colorInputRef.current!.value;

    dispatch(adminCreateSlider(
      token, 
      imageValue, {
      title: titleValue,
      description: descriptionValue,
      imageUrl: '',
      color: colorValue,
      pageUrl: urlValue 
    }))

    dispatch(addInfoMessage({
      message: 'Slider created!',
      isPositive: true,
      timeout: 1500
    }));

    toggleForm();
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
        className={classes['create-slider']}
        onSubmit={createSliderHandler}
      >
        <h1>Create new slider:</h1>
        
        <TextInput
          ref={titleInputRef}
          isLabel={true}
          isReadonly={false}
          isRequired={true}
          title='Title'
          value=''
        />

        <TextAreaInput
          ref={descriptionInputRef}
          isLabel={true}
          isReadonly={false}
          title='Description'
          value=''
          isRequired={true}
          maxLength={SLIDER_DESCRIPTION_LENGTH}
        />

        <TextInput
          ref={urlInputRef}
          isLabel={true}
          isReadonly={false}
          isRequired={true}
          title='Product URL'
          value=''
        />

        <FileInput
          ref={imageInputRef}
          title='Slider image'
          isRequired={true}
          acceptedFile='image'
        />

        <ColorInput
          ref={colorInputRef}
          title={'Slider color'} 
          isReadonly={false} 
          isRequired={false}
          isLabel={true}       
        />

        <div className={classes['submit-button-container']}>
          <MainButton
            isSubmit={true}
            title='Create'
          />
        </div>

        <div className={classes['close-button-container']}>
          <CloseButton onClick={toggleForm} />
        </div>
      </form>
    </CSSTransition>
  )
}

export default CreateSliderForm