import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { sliderGet } from '../../../store/slider/actions/slider-get-actions';
import QueueBox from '../../elements/QueueBox/QueueBox';
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

  const setSlide = useCallback((slideNumber: number) => {
    if(slideNumber >= data.length) {
      return;
    }

    setIsSlideActive(false)
    setTimeout(() => {
      setActiveSlide(slideNumber);
      setIsSlideActive(true);
    }, 50);
  }, [data.length]);

  const changeSlide = useCallback((isIncreasing: boolean) => {
    if(activeSlide === data.length - 1 && isIncreasing) {
      return setSlide(0);
    }

    if(isIncreasing && activeSlide < data.length) {
      return setSlide(activeSlide + 1);
    }

    if(activeSlide - 1 < 0 && !isIncreasing) {
      return setSlide(data.length - 1);
    }

    if(!isIncreasing) {
      return setSlide(activeSlide - 1);
    }

  }, [activeSlide, data.length, setSlide])

  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide(true);
    }, 1000);
    return () => clearInterval(interval);
  }, [activeSlide, data, changeSlide]);

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
  ));
  
  return (
    <div className={classes['main-slider']}>
      {renderSlides[activeSlide]}
      <QueueBox
        queueLength={data.length}
        activeQueue={activeSlide}
        setSlide={setSlide}
      />
    </div>
  )
}

export default MobileSlider