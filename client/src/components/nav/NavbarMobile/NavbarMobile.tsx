import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../../store/ui/ui-slice';
import Backdrop from '../../Backdrop/Backdrop';
import NavbarMobileButton from '../../buttons/NavbarMobileButton/NavbarMobileButton';
import NavbarMobileHead from '../NavbarMobileHead/NavbarMobileHead';
import NavbarMobileSubcategory from '../NavbarMobileSubcategory/NavbarMobileSubcategory';
import classes from './NavbarMobile.module.scss';
import { CSSTransition } from 'react-transition-group';
import { RootState } from '../../../store';
import React from 'react';


const NavbarMobile = () => {
  const dispatch = useDispatch();
  const isHamburgerActive = useSelector((state: RootState) => state.ui.isHamburgerActive);

  const toggleNavbar = () => {
    dispatch(uiActions.toggleHamburgerMenu());
  }

  const clickCategoryHandler = () => {

  }

  const nodeRef = React.useRef(null)
  return ReactDOM.createPortal(
    <>
      {isHamburgerActive && <Backdrop onClick={toggleNavbar} />}
      <CSSTransition
        nodeRef={nodeRef}
        in={isHamburgerActive}
        timeout={300}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: classes['enter'],
          enterActive: classes['enter-active'],
          exit: classes['exit'],
          exitActive: classes['exit-active']
        }}
      >
        <nav className={classes['navbar-mobile']} ref={nodeRef}>
          <NavbarMobileHead title='Menu' isHamburgerButton={true} />
          <NavbarMobileButton title='Psy' onClick={clickCategoryHandler} />

          <NavbarMobileSubcategory visible={false} title='Psy' />
        </nav>
      </CSSTransition>
    </>,
    document.getElementById('react-portal')!
  )
}

export default NavbarMobile