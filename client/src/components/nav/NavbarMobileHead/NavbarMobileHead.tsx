import HamburgerButton from '../../buttons/HamburgerButton/HamburgerButton';
import ImageButton from '../../buttons/ImageButton/ImageButton';
import classes from './NavbarMobileHead.module.scss';
import backArrow from '../../../images/icon/backArrow.svg';

interface IProps {
  title: string;
  isHamburgerButton: boolean;
}

const NavbarMobileHead = ({ title, isHamburgerButton }: IProps) => {
  const backButtonSize = '1.5rem';

  const backToMenuHandler = () => {
    console.log('<- BACK');
    
  }

  return (
    <div className={classes['navbar-head']}>
      <div className={classes['button-container']}>
        {isHamburgerButton
          ? <HamburgerButton />
          : <ImageButton image={backArrow} width={backButtonSize} height={backButtonSize} onClick={backToMenuHandler} />
        }
      </div>
      <h1>{title}</h1>
    </div>
  )
}

export default NavbarMobileHead