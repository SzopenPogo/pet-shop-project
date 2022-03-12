import classes from './NavbarMobileButton.module.scss';

interface IProps {
  title: string;
  onClick: () => void;
}

const NavbarMobileButton = ({title, onClick}: IProps) => {
  return (
    <button className={classes['nav-button']} onClick={onClick}>
      <h3>{title}</h3>
      <div className={classes['nav-arrow']} />
    </button>
  )
}

export default NavbarMobileButton