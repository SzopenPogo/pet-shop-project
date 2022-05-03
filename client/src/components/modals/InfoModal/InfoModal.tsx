import classes from './InfoModal.module.scss';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { removeInfoMessage } from '../../../store/ui/actions/info-items-actions';
import InfoMessageListItem from '../../list-items/InfoMessageListItem/InfoMessageListItem';


const InfoModal = () => {
  const infoMessages = useSelector((state: RootState) => state.ui.infoMessages);
  const dispatch = useDispatch();

  const removeInfoItem = (index: number) => {
    dispatch(removeInfoMessage(index));
  }

  const renderMessages = infoMessages.map((message, index) => (
    <InfoMessageListItem 
      key={index}
      removeFunction={removeInfoItem.bind(this, index)}
      timeout={message.timeout}
      isPositive={message.isPositive}
    >
      <p>{message.message}</p>
    </InfoMessageListItem>
  ))

  return createPortal(
      <ul className={classes['info-modal-container']}>
        {renderMessages}
      </ul>
    , document.getElementById('react-info-modal')!)
}

export default InfoModal