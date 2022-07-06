import ImageLink from '../../links/ImageLink/ImageLink';
import classes from './Header.module.scss';
import petShopLogo from '../../../images/logo/petShopLogo.webp';
import HamburgerButton from '../../buttons/HamburgerButton/HamburgerButton';
import UserButton from '../../icons/UserIcon/UserIcon';
import CartButton from '../../buttons/CartButton/CartButton';
import SearchInput from '../../inputs/SearchInput/SearchInput';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import NavbarDesktop from '../../nav/NavbarDesktop/NavbarDesktop';
import NavbarMobile from '../../nav/NavbarMobile/NavbarMobile';
import { useEffect, useState } from 'react';
import { categoriesFetch } from '../../../store/category/actions/category-get-actions';
import { getSearchbarProducts } from '../../../store/product/actions/product-get-searchbar';

const Header = () => {
  const dispatch = useDispatch();

  const isWindowScrolled = useSelector((state: RootState) => state.clientWindow.isWindowScrolled);
  const isMobile = useSelector((state: RootState) => state.clientWindow.isWindowMobile);
  const {loading, data} = useSelector((state: RootState) => state.product.searchbarProducts);

  const [searchBarValue, setSearchBarValue] = useState<string>('');

  const iconSize = '2.25rem';
  const headerClass = isWindowScrolled && !isMobile
    ? `${classes.header} ${classes['header--active']}`
    : classes.header;

  useEffect(() => {
    dispatch(categoriesFetch());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSearchbarProducts(searchBarValue));
  }, [dispatch, searchBarValue])
  

  const searchProductHandler = (value: string) => {
    //dispatch(getSearchbarProducts(value));
    setSearchBarValue(value)
  }

  return (
    <>
      <header className={headerClass}>
        <div className={classes.content}>
          {isMobile && <div className={classes.hamburger}>
            <HamburgerButton />
          </div> }
          <ImageLink linkTo='/' width='9rem' height='3.5rem' image={petShopLogo} />
          <div className={classes.buttons}>
            <UserButton size={iconSize} />
            <CartButton size={iconSize} />
          </div>
          <div className={classes.search}>
            <SearchInput 
              searchFunction={searchProductHandler}
              searchTime={800}
              title='Search our store'
              isSearchWindow={true}
              searchWindowData={{loading, data}}
            />
          </div>
        </div>
        { !isMobile && <NavbarDesktop />}
      </header>
      {isMobile && <NavbarMobile />}
    </>
  )
}

export default Header