import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import NavbarDesktopListItem from '../../list-items/NavbarDesktopListItem';
import classes from './NavbarDesktop.module.scss';

const NavbarDesktop = () => {
  const categories = useSelector((state: RootState) => state.category.categories);
  const { loading, error, data } = categories;

  const renderMenuItems = data.map(category => (
    <NavbarDesktopListItem key={category._id} title={category.title} subcategory={category.subcategoryRef} />
  ));

  return (
    <nav className={classes.navbar}>
      <ul>
        {!loading && !error && renderMenuItems}
      </ul>
    </nav>
  )
}

export default NavbarDesktop