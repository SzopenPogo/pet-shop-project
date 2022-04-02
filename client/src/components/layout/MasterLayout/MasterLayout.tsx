import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { getUserMe } from '../../../store/user/actions/user-get-action';
import SpinnerFullscreen from '../../spinners/SpinnerFullscreen/SpinnerFullscreen';

interface IProps {
  children: React.ReactChild
}

const MasterLayout = ({ children }: IProps) => {
  const dispatch = useDispatch();

  const userData = useSelector((state: RootState) => state.user);
  const { token, data, loading } = userData;

  useEffect(() => {
    if (token && !data._id) {
      dispatch(getUserMe(token));
    }    
  }, [token, data, dispatch]);

  return (
    <>
      {children}
      <SpinnerFullscreen isLoading={loading} />
    </>
  )
}

export default MasterLayout