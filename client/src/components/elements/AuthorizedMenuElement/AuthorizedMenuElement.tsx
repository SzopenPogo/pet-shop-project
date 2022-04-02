import { useDispatch } from 'react-redux';
import { PROFILE_ROUTE } from '../../../constants/routes'
import { userLogout } from '../../../store/user/actions/user-logout-action';
import SecondaryButton from '../../buttons/SecondaryButton/SecondaryButton';
import MainLink from '../../links/MainLink/MainLink'

interface IProps {
  _id: string;
  token: string
}

const AuthorizedMenuElement = ({ _id, token }: IProps) => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(userLogout(token));
  }

  return (
    <>
      <MainLink title='User profile' route={`${PROFILE_ROUTE}/${_id}`} />
      <SecondaryButton title='Logout' isSubmit={false} onClick={logoutHandler} />
    </>
  )
}

export default AuthorizedMenuElement