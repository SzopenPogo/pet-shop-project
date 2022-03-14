import LoginForm from '../../../components/forms/LoginForm/LoginForm'
import AccountAccessLayout from '../../../components/layout/AccountAccessLayout/AccountAccessLayout'
import SecondaryLink from '../../../components/links/SecondaryLink/SecondaryLink';
import classes from './LoginPage.module.scss';

const LoginPage = () => {
  

  return (
    <AccountAccessLayout>
      <>
        <div className={classes.login}>
          <LoginForm />
        </div>
        <div className={classes.register}>
          <h1>You don't have an account?</h1>
          <SecondaryLink route='/register' title='Create account' />
        </div>
      </>
    </AccountAccessLayout>
  )
}

export default LoginPage