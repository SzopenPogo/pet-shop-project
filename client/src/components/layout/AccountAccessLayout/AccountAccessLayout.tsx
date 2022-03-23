import React, { useEffect } from 'react'
import classes from './AccountAccessLayout.module.scss';
import SimpleHeader from '../../ui/SimpleHeader/SimpleHeader'
import SpinnerFullscreen from '../../spinners/SpinnerFullscreen/SpinnerFullscreen';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

interface IProps {
  children: React.ReactChild
}

const AccountAccessLayout = ({ children }: IProps) => {
  const navigate = useNavigate();
  
  const userData = useSelector((state: RootState) => state.user);
  const { token, loading } = userData;
  
  useEffect(() => {
    if (token) {
      navigate(-1);
    }
  }, [token, navigate]);

  return (
    <>
      <SimpleHeader />
      <section className={classes.container}>
        {children}
      </section>
      <SpinnerFullscreen isLoading={loading} />
    </>
  )
}

export default AccountAccessLayout