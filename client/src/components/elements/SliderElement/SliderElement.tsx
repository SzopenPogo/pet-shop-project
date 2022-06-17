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
  isDirectionRight: boolean;
}

const SliderElement = ({
  title,
  description,
  color,
  imageUrl,
  pageUrl,
  isActive,
  timeout,
  isDirectionRight
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

  const enterClass = isDirectionRight ? `${classes['enter']}` : `${classes['enter--left']}`;
  const exitActiveClass = isDirectionRight ? `${classes['exit-active']}` : `${classes['exit-active--left']}`;

  const sliderClass = `${classes['slider-element']} ${sliderTextClasses[getRandomNumber(0, sliderTextClasses.length)]}`

  return (
    <CSSTransition
        nodeRef={nodeRef}
        in={isActive}
        timeout={timeout}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: enterClass,
          enterActive: classes['enter-active'],
          exit: classes['exit'],
          exitActive: exitActiveClass
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