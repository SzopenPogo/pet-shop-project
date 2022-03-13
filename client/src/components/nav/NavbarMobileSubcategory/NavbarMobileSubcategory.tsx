import classes from './NavbarMobileSubcategory.module.scss';
import { CSSTransition } from 'react-transition-group';
import React from 'react';
import NavbarMobileHead from '../NavbarMobileHead/NavbarMobileHead';
import NavbarMobileLink from '../../links/NavbarMobileLink/NavbarMobileLink';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

const NavbarMobileSubcategory = () => {
  const activeSubcategory = useSelector((state: RootState) => state.category.activeSubcategory);
  const { title, subcategoryRef: subcategories } = activeSubcategory;

  const renderMenuLinks = subcategories.map(subcategory => (
    <NavbarMobileLink
      key={subcategory._id}
      title={subcategory.title}
      route={`subcategory/${subcategory._id}`} />
  ));

  const nodeRef = React.useRef(null)
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={title !== ''}
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
        {renderMenuLinks}
      </div>
    </CSSTransition>
  )
}

export default NavbarMobileSubcategory