import classes from './NavbarDesktopListItem.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ISubcategory } from '../../../interfaces/ISubcategory';
import { resetActiveSubcategory, setActiveSubcategory } from '../../../store/category/actions/category-get-actions';
import NavbarDesktopSubcategory from '../../nav/NavbarDesktopSubcategory/NavbarDesktopSubcategory';
import { RootState } from '../../../store';

interface IProps {
  title: string;
  subcategory: Array<ISubcategory>
}

const NavbarDesktopListItem = ({ title, subcategory }: IProps) => {
  const dispatch = useDispatch();

  const activeSubcategory = useSelector((state: RootState) => state.category.activeSubcategory);
  const { title: activeTitle, subcategoryRef } = activeSubcategory;

  const showSubcategoryPanel = () => {
    dispatch(setActiveSubcategory(title, subcategory));
  }

  const hideSubcategoryPanel = () => {
    dispatch(resetActiveSubcategory());
  }
  return (
    <li
      onMouseEnter={showSubcategoryPanel}
      onMouseLeave={hideSubcategoryPanel}
      className={classes.item}
    >
      {title}
      <NavbarDesktopSubcategory subcategories={subcategoryRef} isActive={title === activeTitle} />
    </li>
  )
}

export default NavbarDesktopListItem