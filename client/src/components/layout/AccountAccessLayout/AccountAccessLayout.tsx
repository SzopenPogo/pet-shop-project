import React from 'react'
import classes from './AccountAccessLayout.module.scss';
import SimpleHeader from '../../ui/SimpleHeader/SimpleHeader'

interface IProps {
  children: React.ReactChild
}

const AccountAccessLayout = ({ children }: IProps) => {
  return (
    <>
      <SimpleHeader />
      <section className={classes.container}>
        {children}
      </section>
    </>
  )
}

export default AccountAccessLayout