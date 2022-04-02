import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { RootState } from '../../../store';
import MainLayout from '../MainLayout/MainLayout';
import classes from './UserLayout.module.scss';

interface IProps {
  children: React.ReactChild
}

const UserLayout = ({ children }: IProps) => {
  const navigate = useNavigate();

  const userData = useSelector((state: RootState) => state.user);
  const { token } = userData;
  
  useEffect(() => {
    if (!token) {
      navigate(-1);
    }
  }, [token, navigate]);
  
  return (
    <MainLayout>
      <main className={classes['user-page']}>
        {children}
      </main>
    </MainLayout>
  )
}

export default UserLayout