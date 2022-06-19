import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CART_ROUTE, CONTACT_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE } from '../../../constants/routes';
import { RootState } from '../../../store';
import FooterLink from '../../links/FooterLink/FooterLink';
import classes from './Footer.module.scss';

const Footer = () => {
  const token = useSelector((state: RootState) => state.user.token);
  const userId = useSelector((state: RootState) => state.user.data._id);

  const userLinkText = !token ? 'Sign in' : 'Profile'
  const userLinkRoute = !token ? LOGIN_ROUTE : `${PROFILE_ROUTE}/${userId}`
  const date = new Date();

  return (
    <footer className={classes['footer']}>
      <Link to={'/'} className={classes['petshop-logo']} />
      <section className={classes['links']}>
        <FooterLink title={userLinkText} route={userLinkRoute} />
        <FooterLink title='Cart' route={CART_ROUTE} />
        <FooterLink title='Contact' route={CONTACT_ROUTE} />
      </section>
      <span className={classes['copyright']}>© {date.getFullYear()} SzopenScript</span>
    </footer>
  )
}

export default Footer