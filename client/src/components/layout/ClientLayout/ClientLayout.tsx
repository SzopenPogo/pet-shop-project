import Header from "../../ui/Header/Header";
import classes from './ClientLayout.module.scss';

interface IProps {
  children: React.ReactChild
}

const ClientLayout = ({children}: IProps) => {
  return (
    <>
      <Header />
      <section className={classes.content}>
        {children}
      </section>
    </>
  )
}

export default ClientLayout