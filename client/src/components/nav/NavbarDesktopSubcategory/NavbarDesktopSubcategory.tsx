import React from 'react';
import { ISubcategory } from '../../../interfaces/ISubcategory';
import NavbarDesktopLink from '../../links/NavbarDesktopLink/NavbarDesktopLink';
import classes from './NavbarDesktopSubcategory.module.scss';
import { CSSTransition } from 'react-transition-group';

interface IProps {
  subcategories: Array<ISubcategory>;
  isActive: boolean;
}

const NavbarDesktopSubcategory = ({subcategories, isActive}: IProps) => {

  const renderLinks = subcategories.map(subcategory => (
    <NavbarDesktopLink
      key={subcategory._id}
      title={subcategory.title}
      route={`subcategory/${subcategory._id}`}
      image={subcategory.imageUrl}
    />
  ))

  // const huj = subcategories.map(subcategory => {
  //   console.log(subcategory._id);
    
  // })

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