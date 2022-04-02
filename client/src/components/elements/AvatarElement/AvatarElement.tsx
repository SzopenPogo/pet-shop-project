import { BACKEND_URL } from '../../../constants/backend';
import AvatarInput from '../../inputs/AvatarInput/AvatarInput';
import classes from './AvatarElement.module.scss';
import catImage from '../../../images/icon/catIcon.svg';

interface IProps {
  avatarUrl: string;
}

const AvatarElement = ({avatarUrl}: IProps) => {
  const backgroundStyle = avatarUrl
    ? { backgroundImage: `url(${BACKEND_URL}/${avatarUrl})` }
    : { backgroundImage: `url(${catImage})`};

  return (
    <div className={classes.avatar} style={backgroundStyle}>
      <AvatarInput />
    </div>
  )
}

export default AvatarElement