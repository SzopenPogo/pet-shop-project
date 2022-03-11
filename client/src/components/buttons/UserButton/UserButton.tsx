import ImageButton from "../ImageButton/ImageButton"

import userIcon from '../../../images/icon/user.svg';

interface IProps {
  size: string;
}

const UserButton = ({size}: IProps) => {
  const userButtonHandler = () => {

  }

  return (
    <ImageButton
      width={size}
      height={size}
      image={userIcon}
      onClick={userButtonHandler}
    />
  )
}

export default UserButton