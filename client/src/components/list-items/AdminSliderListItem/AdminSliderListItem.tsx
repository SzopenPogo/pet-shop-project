import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ISlider } from '../../../interfaces/ISlider'
import { RootState } from '../../../store';
import { adminDeleteSlider } from '../../../store/slider/actions/slider-delete-action';
import { selectSlider } from '../../../store/slider/actions/slider-select-action';
import SliderForm from '../../forms/SliderForm/SliderForm';
import AdminMainListItem from '../AdminMainListItem/AdminMainListItem'

interface IProps extends ISlider {
  index: number;
}

const AdminSliderListItem = ({
  index,
  _id,
  title,
  description,
  pageUrl,
  imageUrl,
  color
}: IProps) => {
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.user.token);
  const {_id: selectedSliderId, index: selectedSliderIndex} = useSelector((state: RootState) => state.slider.selectedSlider);

  const [isReadonly, setIsReadonly] = useState<boolean>(true);

  const toggleSliderEdit = () => {
    setIsReadonly(!isReadonly);
  }

  const sliderSelectToDeleteHandler = () => {
    dispatch(selectSlider({_id, index}));
  }


  const deleteSliderHandler = () => {
    dispatch(adminDeleteSlider(token, selectedSliderId, selectedSliderIndex));
  }

  return (
    <AdminMainListItem
      _id={_id}
      title={title}
      isReadonly={isReadonly}
      deleteItem={deleteSliderHandler}
      selectItemToDelete={sliderSelectToDeleteHandler}
      toggleItemEdit={toggleSliderEdit}
    >
      <SliderForm 
        index={index}
        isReadonly={isReadonly}
        _id={_id}
        title={title}
        description={description}
        color={color}
        pageUrl={pageUrl}
        imageUrl={imageUrl}
        disableReadonly={toggleSliderEdit}
      />
    </AdminMainListItem>
  )
}

export default AdminSliderListItem