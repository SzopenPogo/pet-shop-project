import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import NavbarDesktopListItem from '../../list-items/NavbarDesktopListItem';
import Spinner from '../../spinners/Spinner/Spinner';
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
        {loading && <Spinner borderSize='.35rem' size='2rem' color='black' />}
      </ul>
    </nav>
  )
}

export default NavbarDesktop