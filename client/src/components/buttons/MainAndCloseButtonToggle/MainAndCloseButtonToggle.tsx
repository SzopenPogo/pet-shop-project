import CloseButton from '../CloseButton/CloseButton';
import MainButton from '../MainButton/MainButton';
import classes from './MainAndCloseButtonToggle.module.scss';

interface IProps {
  title: string;
  isToClose: boolean;
  toggleFunction: () => void;
}

const MainAndCloseButtonToggle = ({title, isToClose, toggleFunction}: IProps) => {
  const buttonsStyle = isToClose ? { justifyContent: 'flex-end', width: '100%' } : {};

  return (
    <div className={classes.buttons} style={buttonsStyle}>
        {!isToClose && <MainButton
          isSubmit={false}
          title={title}
          onClick={toggleFunction}
        />}
        {isToClose && <CloseButton onClick={toggleFunction} />}
    </div>
  )
}

export default MainAndCloseButtonToggle