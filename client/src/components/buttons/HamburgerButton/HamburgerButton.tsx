import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { uiActions } from '../../../store/ui/ui-slice';
import classes from './HamburgerButton.module.scss';

const HamburgerButton = () => {
  const dispatch = useDispatch();
  const isActive = useSelector((state: RootState) => state.ui.isHamburgerActive);

  const hamburgerButtonHandler = () => {
    dispatch(uiActions.toggleHamburgerMenu());
  }

  const hamburgerButtonClass = isActive ? `${classes["hamburger-button"]} ${classes["hamburger-button--active"]}`:
    classes["hamburger-button"];

  return (
    <button onClick={hamburgerButtonHandler} className={hamburgerButtonClass}>
        <span className={classes["hamburger-button__box"]}>
            <span className={classes["hamburger-button__line"]}></span>
        </span>
    </button>
  )
}

export default HamburgerButton