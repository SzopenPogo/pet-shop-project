import classes from './EditButton.module.scss';
import penIcon from '../../../images/icon/penIconBlack.svg';
import closeIcon from '../../../images/icon/closeIcon.svg';

interface IProps {
  isActive: boolean;
  onClick: () => void;
}

const EditButton = ({ isActive, onClick }: IProps) => {
  const bg = isActive
    ? {backgroundImage: `url(${penIcon})`}
    : {backgroundImage: `url(${closeIcon})`}

  return (
    <button
      type='button'
      className={classes['edit-button']}
      onClick={onClick}
      style={bg}
    />
  )
}

export default EditButton