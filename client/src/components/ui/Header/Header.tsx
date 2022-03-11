import ImageLink from '../../links/ImageLink/ImageLink';
import classes from './Header.module.scss';
import petShopLogo from '../../../images/logo/petShopLogo.webp';
import HamburgerButton from '../../buttons/HamburgerButton/HamburgerButton';
import UserButton from '../../buttons/UserButton/UserButton';
import CartButton from '../../buttons/CartButton/CartButton';
import SearchInput from '../../inputs/SearchInput/SearchInput';

const Header = () => {
  const iconSize = '2.25rem'
  
  return (
    <header className={classes.header}>
      <div className={classes.hamburger}>
        <HamburgerButton />
      </div>
      <ImageLink linkTo='/' width='9rem' height='3.5rem' image={petShopLogo} />
      <div className={classes.buttons}>
        <UserButton size={iconSize} />
        <CartButton size={iconSize} />
      </div>
      <div className={classes.search}>
        <SearchInput />
      </div>
    </header>
  )
}

export default Header