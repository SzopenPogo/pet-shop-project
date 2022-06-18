import React from 'react';
import { ISubcategory } from '../../../interfaces/ISubcategory';
import NavbarDesktopLink from '../../links/NavbarDesktopLink/NavbarDesktopLink';
import classes from './NavbarDesktopSubcategory.module.scss';
import { CSSTransition } from 'react-transition-group';
import { SUBCATEGORY_ROUTE } from '../../../constants/routes';

interface IProps {
  subcategories: Array<ISubcategory>;
  isActive: boolean;
}

const NavbarDesktopSubcategory = ({subcategories, isActive}: IProps) => {

  const renderLinks = subcategories.map(subcategory => (
    <NavbarDesktopLink
      key={subcategory._id}
      title={subcategory.title}
      route={`${SUBCATEGORY_ROUTE}/${subcategory._id}`}
      image={subcategory.imageUrl}
    />
  ))
  
  const nodeRef = React.useRef(null);
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isActive}
      timeout={100}
      mountOnEnter
      unmountOnExit
      classNames={{
        enter: classes['enter'],
        enterActive: classes['enter-active'],
        exit: classes['exit'],
        exitActive: classes['exit-active']
      }}
    >
      <div ref={nodeRef} className={classes.container}>
        {renderLinks}
      </div>
    </CSSTransition>
  )
}

export default NavbarDesktopSubcategory