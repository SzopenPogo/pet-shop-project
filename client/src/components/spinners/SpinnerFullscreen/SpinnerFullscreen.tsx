import ReactDOM from 'react-dom';
import Spinner from '../Spinner/Spinner';
import classes from './SpinnerFullscreen.module.scss';

interface IProps {
  isLoading: boolean;
}

const SpinnerFullscreen = ({isLoading}: IProps) => {
  return ReactDOM.createPortal(
    <>
      {isLoading && <div className={classes['spinner-container']}>
        <Spinner borderSize='white' color='white' size='10rem' />
      </div>}
    </>,
    document.getElementById('spinner-fullscreen')!
  )
}

export default SpinnerFullscreen