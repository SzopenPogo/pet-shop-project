import classes from './BigAdminButton.module.scss';
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';

interface IProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  activate: boolean;
  timeout: number;
  onClick?: () => void;
}

const BigAdminButton = ({
  title,
  subtitle,
  backgroundImage,
  activate,
  timeout,
  onClick
  }: IProps) => {
  const nodeRef = useRef(null);
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
      <button
        ref={nodeRef}
        type='button'
        className={classes['add-button']}
        onClick={onClick}
        style={{
          backgroundImage: `url('${backgroundImage}')`
        }}
      >
        <h3>{subtitle}</h3>
        <h1>{title}</h1>
      </button>
    </CSSTransition>
  )
}

export default BigAdminButton