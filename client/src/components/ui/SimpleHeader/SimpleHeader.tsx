import classes from './SimpleHeader.module.scss';
import petShopLogo from '../../../images/logo/petShopLogo.webp';
import ImageLink from '../../links/ImageLink/ImageLink';

const SimpleHeader = () => {
  return (
    <header className={classes.header}>
      <ImageLink linkTo='/' width='10rem' height='4rem' image={petShopLogo} />
    </header>
  )
}

export default SimpleHeader