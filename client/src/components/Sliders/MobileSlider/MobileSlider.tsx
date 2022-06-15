import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { sliderGet } from '../../../store/slider/actions/slider-get-actions';
import SliderElement from '../../elements/SliderElement/SliderElement';
import classes from './MobileSlider.module.scss';

const MobileSlider = () => {
  const dispatch = useDispatch();
  
  const {loading, data} = useSelector((state: RootState) => state.slider.slider);

  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [isSlideActive, setIsSlideActive] = useState<boolean>(true);

  const slideTimeout = 1500;


  useEffect(() => {
    //Get slider data
    dispatch(sliderGet());
  }, [dispatch]);


  const changeActiveSlide = useCallback(() => {
    //setIsSlideActive(false);
    const activeSlideTimeout = setTimeout(() => {
      setIsSlideActive(!isSlideActive);
      const nextActiveSlide = activeSlide < data.length - 1
      ? activeSlide + 1 : 0;
      setActiveSlide(nextActiveSlide);  
      clearTimeout(activeSlideTimeout);
    }, slideTimeout);

      
  }, [activeSlide, data, isSlideActive])


  useEffect(() => {
    const interval = setInterval(() => {
      changeActiveSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [activeSlide, data, changeActiveSlide]);

  


  const renderSlides = data.map(slider => (
    <SliderElement
      key={slider._id}
      title={slider.title}
      description={slider.description}
      color={slider.color}
      imageUrl={slider.imageUrl ? slider.imageUrl : ''}
      pageUrl={slider.pageUrl}
      isActive={isSlideActive}
      timeout={slideTimeout}  
    />
  ))
  
  return (
    <div className={classes['main-slider']}>
      {renderSlides[activeSlide]}
    </div>
  )
}

export default MobileSlider