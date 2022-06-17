import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { sliderGet } from '../../../store/slider/actions/slider-get-actions';
import QueueBox from '../../elements/QueueBox/QueueBox';
import SliderElement from '../../elements/SliderElement/SliderElement';
import Spinner from '../../spinners/Spinner/Spinner';
import classes from './MainSlider.module.scss';

const MainSlider = () => {
  const dispatch = useDispatch();
  
  const {loading, data} = useSelector((state: RootState) => state.slider.slider);
  const isMobile = useSelector((state: RootState) => state.clientWindow.isWindowMobile);

  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [isSlideActive, setIsSlideActive] = useState<boolean>(true);
  const [isDirectionRight, setIsDirectionRight] = useState<boolean>(true);
  const [mobileTouchStartPosX, setMobileTouchStartPosX] = useState<number>(0);

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

    //RIGHT
    if(isIncreasing && activeSlide < data.length) {
      setIsDirectionRight(true);
      return setSlide(activeSlide + 1);
    }

    //LEFT
    if(activeSlide - 1 < 0 && !isIncreasing) {
      setIsDirectionRight(false);
      return setSlide(data.length - 1);
    }

    //LEFT
    if(!isIncreasing) {
      setIsDirectionRight(false);
      return setSlide(activeSlide - 1);
    }

  }, [activeSlide, data.length, setSlide])

  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide(true);
    }, 2000);
    return () => clearInterval(interval);
  }, [activeSlide, data, changeSlide]);

  const handleStartTouchingPos = useCallback((event: TouchEvent) => {
    setMobileTouchStartPosX(event.changedTouches[0].clientX)
  }, []);

  const handleChangeSlideByTouch = useCallback((event: TouchEvent) => {
    const mobileTouchEndPoxX = event.changedTouches[0].clientX;
    if(mobileTouchStartPosX < mobileTouchEndPoxX) {
      return changeSlide(true);
    }
    changeSlide(false);
  }, [mobileTouchStartPosX, changeSlide])

  useEffect(() => {
    if(isMobile) {
      window.addEventListener('touchstart', handleStartTouchingPos);
      window.addEventListener('touchend', handleChangeSlideByTouch);
    }

    return () => {
      if(isMobile) {
        window.removeEventListener('touchstart', handleStartTouchingPos);
        window.removeEventListener('touchend', handleChangeSlideByTouch);
      }
    }
  }, [isMobile, handleStartTouchingPos, handleChangeSlideByTouch]);

  

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
      isDirectionRight={isDirectionRight} 
    />
  ));
  
  return (
    <div className={classes['main-slider']}>
      {!loading && <>
        {renderSlides[activeSlide]}
        <QueueBox
          queueLength={data.length}
          activeQueue={activeSlide}
          setSlide={setSlide}
        />
      </>}

      {loading && <Spinner size={'5rem'} borderSize={'.45rem'} color={'gray'} />}
    </div>
  )
}

export default MainSlider