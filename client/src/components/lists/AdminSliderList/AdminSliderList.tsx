import classes from './AdminSliderList.module.scss';
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import Spinner from '../../spinners/Spinner/Spinner';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import AdminSliderListItem from '../../list-items/AdminSliderListItem/AdminSliderListItem';

interface IProps {
  activate: boolean;
  timeout: number;
  closeList?: () => void;
}

const AdminSliderList = ({ activate, timeout, closeList }: IProps) => {
  const nodeRef = useRef(null);

  const {loading, error, data} = useSelector((state: RootState) => state.slider.slider);
  
  const renderSliders = data.map((slider, index) => (
    <AdminSliderListItem
      index={index}
      key={slider._id}
      _id={slider._id}
      title={slider.title} 
      description={slider.description} 
      color={slider.color} 
      pageUrl={slider.pageUrl} 
      imageUrl={slider.imageUrl} 
    />
  ))

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={activate}
      timeout={timeout}
      mountOnEnter
      unmountOnExit
      classNames={{
        enter: classes['enter'],
        enterActive: classes['enter-active'],
        exit: classes['exit'],
        exitActive: classes['exit-active']
      }}
    >
    <ul 
      ref={nodeRef}
      className={classes['admin-slider-list']}
    >
      {loading && <div className={classes['spinner-container']}>
          <Spinner size={'11rem'} borderSize={'.75rem'} color={'black'} />  
      </div>}
      {data.length >= 0 && renderSliders}
      {data.length <= 0 && <h1>No sliders found</h1>}
      {!loading && error && <h1>{error}</h1>}
    </ul>
    </CSSTransition>
  )
}

export default AdminSliderList