import classes from './NavbarMobileSubcategory.module.scss';
import { CSSTransition } from 'react-transition-group';
import React from 'react';
import NavbarMobileHead from '../NavbarMobileHead/NavbarMobileHead';
import NavbarMobileLink from '../../links/NavbarMobileLink/NavbarMobileLink';


interface IProps {
  title: string;
  visible: boolean;
}

const NavbarMobileSubcategory = ({visible, title}: IProps) => {
  const nodeRef = React.useRef(null)

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={visible}
      timeout={300}
      mountOnEnter
      unmountOnExit
      classNames={{
        enter: classes['fade-enter'],
        enterActive: classes['fade-enter-active'],
        exit: classes['fade-exit'],
        exitActive: classes['fade-exit-active']
      }}
    >
      <div className={classes['nav-content']} ref={nodeRef}>
        <NavbarMobileHead title={title} isHamburgerButton={false} />
        <NavbarMobileLink title='Zabawki' route='/' />
      </div>
    </CSSTransition>
  )
}

export default NavbarMobileSubcategory