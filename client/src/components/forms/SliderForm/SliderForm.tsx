import classes from './SliderForm.module.scss';
import { ISlider } from '../../../interfaces/ISlider';
import MainButton from '../../buttons/MainButton/MainButton';
import { FormEvent, useRef } from 'react';
import TextInput from '../../inputs/TextInput/TextInput';
import TextAreaInput from '../../inputs/TextAreaInput/TextAreaInput';
import FileInput from '../../inputs/FileInput/FileInput';
import ColorInput from '../../inputs/ColorInput/ColorInput';
import { BACKEND_URL } from '../../../constants/backend';
import { useDispatch, useSelector } from 'react-redux';
import { adminEditSlider } from '../../../store/slider/actions/slider-edit-action';
import { RootState } from '../../../store';
import { addInfoMessage } from '../../../store/ui/actions/info-items-actions';

interface IProps extends ISlider {
  index: number;
  isReadonly: boolean;
  disableReadonly: () => void;
}

const SliderForm = ({
  index,
  isReadonly,
  _id,
  title,
  description,
  pageUrl,
  imageUrl,
  color,
  disableReadonly
}: IProps) => {
  const dispatch = useDispatch();

  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);

  const token = useSelector((state: RootState) => state.user.token);

  const submitSliderEditHandler = (event: FormEvent) => {
    event.preventDefault();

    const titleValue = titleInputRef.current!.value;
    const descriptionValue = descriptionInputRef.current!.value;
    const imageValue = imageInputRef.current!.files![0];
    const urlValue = urlInputRef.current!.value;
    const colorValue = colorInputRef.current!.value;

    dispatch(adminEditSlider(token, index, imageValue, {
      _id,
      title: titleValue,
      description: descriptionValue,
      pageUrl: urlValue,
      color: colorValue
    }));

    dispatch(addInfoMessage({
      message: `${title} edited!`,
      isPositive: true,
      timeout: 1500
    }));

    disableReadonly();
  }

  return (
    <form
      className={classes['slider-form']}
      onSubmit={submitSliderEditHandler}
    >
      <img
        className={classes['image-preview']}
        src={`${BACKEND_URL}/${imageUrl}`} 
        alt='slider-img'
      />

      <TextInput
        ref={titleInputRef}
        title='Title'
        isReadonly={isReadonly}
        isRequired={false}
        isLabel={true}
        value={title}        
      />

      <TextAreaInput
        ref={descriptionInputRef}
        title='Description'
        isReadonly={isReadonly}
        isLabel={true}
        value={description}
      />

      <TextInput
        ref={urlInputRef}
        title='URL'
        isReadonly={isReadonly}
        isRequired={false}
        isLabel={true}
        value={pageUrl}        
      />

      <FileInput
        ref={imageInputRef}
        title='Image'
        acceptedFile='image'
        isRequired={false}      
      />

      <ColorInput
        ref={colorInputRef}
        title='Color'
        isReadonly={isReadonly}
        isRequired={false}
        value={color}
      />

      {!isReadonly && 
      <div className={classes['submit-button-container']}>
        <MainButton
          isSubmit={true}
          title='Edit slider'
        />
      </div>}
    </form>
  )
}

export default SliderForm