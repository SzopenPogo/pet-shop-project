import classes from './RegisterPage.module.scss';
import RegisterForm from '../../../components/forms/RegisterForm/RegisterForm'
import AccountAccessLayout from '../../../components/layout/AccountAccessLayout/AccountAccessLayout'
import SecondaryLink from '../../../components/links/SecondaryLink/SecondaryLink'
import { LOGIN_ROUTE } from '../../../constants/routes'

const RegisterPage = () => {
  return (
    <AccountAccessLayout>
      <>
        <div className={classes.register}>
          <RegisterForm />
        </div>
        <div className={classes.login}>
          <h1>Already have an account?</h1>
          <SecondaryLink route={LOGIN_ROUTE} title='Login' />
        </div>
      </>
    </AccountAccessLayout>
  )
}

export default RegisterPage