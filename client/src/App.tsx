import { Route, Routes } from "react-router";
import MasterLayout from "./components/layout/MasterLayout/MasterLayout";
import { LOGIN_ROUTE, PROFILE_EDIT_ADDRESS_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE } from "./constants/routes";
import LoginPage from "./pages/client/LoginPage/LoginPage";
import MainPage from "./pages/client/MainPage/MainPage";
import RegisterPage from "./pages/client/RegisterPage/RegisterPage";
import UserAddressPage from "./pages/user/UserAddressPage/UserAddressPage";
import UserProfilePage from "./pages/user/UserProfilePage/UserProfilePage";

const App = () => {
  return (
    <MasterLayout>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path={LOGIN_ROUTE} element={<LoginPage />} />
        <Route path={REGISTER_ROUTE} element={<RegisterPage />} />
        <Route path={`${PROFILE_ROUTE}/:id`} element={<UserProfilePage />} />
        <Route path={`${PROFILE_EDIT_ADDRESS_ROUTE}/:id`} element={<UserAddressPage />} />
      </Routes>
    </MasterLayout>
  );
}

export default App;
