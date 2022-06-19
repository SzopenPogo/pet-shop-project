import { useDispatch } from "react-redux";
import { clientWindowActions } from "../../../store/clientWindow/clientWindow-slice";
import Footer from "../../ui/Footer/Footer";
import Header from "../../ui/Header/Header";
import classes from './MainLayout.module.scss';

interface IProps {
  children: React.ReactChild
}

const MainLayout = ({ children }: IProps) => {
  const dispatch = useDispatch();
  
  const scrollHandler = () => {
    dispatch(clientWindowActions.setWindowScroll(window.scrollY));
  }
  window.addEventListener('scroll', scrollHandler);

  const setDisplayDevice = () => {
    dispatch(clientWindowActions.setWindowMobile(window.innerWidth));
  }
  window.addEventListener('resize', setDisplayDevice);
  setDisplayDevice();

  return (
    <>
      <Header />
      <section className={classes.content}>
        {children}
      </section>
      <Footer />
    </>
  )
}

export default MainLayout