import { ISubcategory } from '../../../interfaces/ISubcategory';
import NavbarDesktopLink from '../../links/NavbarDesktopLink/NavbarDesktopLink';
import classes from './NavbarDesktopSubcategory.module.scss';

interface IProps {
  subcategories: Array<ISubcategory>
}

const NavbarDesktopSubcategory = ({subcategories}: IProps) => {

  const renderLinks = subcategories.map(subcategory => (
    <NavbarDesktopLink
      key={subcategory._id}
      title={subcategory.title}
      route={`subcategory/${subcategory.categoryId}`}
      image={subcategory.imageUrl}
    />
  ))

  return (
    <div className={classes.container}>
      {renderLinks}
    </div>
  )
}

export default NavbarDesktopSubcategory