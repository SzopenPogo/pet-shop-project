import { useRef } from 'react';
import classes from './SliderElement.module.scss';
import { CSSTransition } from 'react-transition-group';
import { BACKEND_URL } from '../../../constants/backend';
import { getRandomNumber } from '../../../utils/random/getRandomNumber';

interface IProps {
  title: string;
  description: string;
  color: string;
  imageUrl: string;
  pageUrl: string;
  isActive: boolean;
  timeout: number;
}

const SliderElement = ({
  title,
  description,
  color,
  imageUrl,
  pageUrl,
  isActive,
  timeout
}:IProps) => {

  const nodeRef = useRef(null);
  const sliderStyle = {
    backgroundImage: `url('${BACKEND_URL}/${imageUrl}')`,
    color
  }
  
  const sliderTextClasses = [
    classes['slider-element--text-bottom-left'],
    classes['slider-element--text-top-right'],
    classes['slider-element--text-top-left'],
    classes['slider-element--text-bottom-right']
  ];

  const sliderClass = `${classes['slider-element']} ${sliderTextClasses[getRandomNumber(0, 3)]}`

  return (
    <CSSTransition
        nodeRef={nodeRef}
        in={isActive}
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
      <a
        ref={nodeRef}
        href={pageUrl}
        className={sliderClass}
        style={sliderStyle}
      >
        <div className={classes['slider-text']}>
          <h1 className={classes['slider-title']}>{title}</h1>
          <span className={classes['slider-description']}>{description}</span>
        </div>
      </a>
    </CSSTransition>
  )
}

export default SliderElement