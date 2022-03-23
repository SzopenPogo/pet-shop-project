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
import { resetActiveSubcategory, setActiveSubcategory } from '../../../store/category/category-actions';
import { ISubcategory } from '../../../interfaces/ISubcategory';
import Spinner from '../../spinners/Spinner/Spinner';


const NavbarMobile = () => {
  const dispatch = useDispatch();

  const isHamburgerActive = useSelector((state: RootState) => state.ui.isHamburgerActive);
  const categories = useSelector((state: RootState) => state.category.categories);
  const { loading, error, data } = categories;

  const toggleNavbar = () => {
    dispatch(uiActions.toggleHamburgerMenu());
    dispatch(resetActiveSubcategory());
  }

  const clickCategoryHandler = (title: string, subcategory: Array<ISubcategory>) => {
    dispatch(setActiveSubcategory(title, subcategory));
  }

  const renderMenuButtons = data.map(category => (
    <NavbarMobileButton
      key={category._id}
      title={category.title}
      onClick={clickCategoryHandler.bind(this, category.title, category.subcategoryRef)} />
  ));

  const nodeRef = React.useRef(null);
  const animationTime = 300;
  return ReactDOM.createPortal(
    <>
      <Backdrop onClick={toggleNavbar} activate={isHamburgerActive} timeout={animationTime} />
      <CSSTransition
        nodeRef={nodeRef}
        in={isHamburgerActive}
        timeout={animationTime}
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

          {loading &&
            <div className={classes.spinner}>
              <Spinner size='10rem' borderSize='12px' color='gray' />
            </div>
          }

          {!loading && !error && renderMenuButtons}

          <NavbarMobileSubcategory />
        </nav>
      </CSSTransition>
    </>,
    document.getElementById('react-portal')!
  )
}

export default NavbarMobile