import { Route, Routes } from "react-router";
import MasterLayout from "./components/layout/MasterLayout/MasterLayout";
import { LOGIN_ROUTE, PROFILE_ADMIN_EDIT_CATEGORY_ROUTE, PROFILE_ADMIN_EDIT_SUBCATEGORY_ROUTE, PROFILE_ADMIN_EDIT_USERS_ROUTE, PROFILE_EDIT_ADDRESS_ROUTE, PROFILE_EDIT_DATA_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE } from "./constants/routes";
import LoginPage from "./pages/client/LoginPage/LoginPage";
import MainPage from "./pages/client/MainPage/MainPage";
import RegisterPage from "./pages/client/RegisterPage/RegisterPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage/AdminUsersPage";
import UserAddressPage from "./pages/user/UserAddressPage/UserAddressPage";
import UserEditDataPage from "./pages/user/UserEditDataPage/UserEditDataPage";
import UserProfilePage from "./pages/user/UserProfilePage/UserProfilePage";
import AdminCategoryPage from "./pages/admin/AdminCategoryPage/AdminCategoryPage";
import AdminSubcategoryPage from "./pages/admin/AdminSubcategoryPage/AdminSubcategoryPage";

const App = () => {
  return (
    <MasterLayout>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path={LOGIN_ROUTE} element={<LoginPage />} />
        <Route path={REGISTER_ROUTE} element={<RegisterPage />} />
        <Route path={`${PROFILE_ROUTE}/:id`} element={<UserProfilePage />} />
        <Route path={PROFILE_EDIT_ADDRESS_ROUTE} element={<UserAddressPage />} />
        <Route path={PROFILE_EDIT_DATA_ROUTE} element={<UserEditDataPage />} />
        <Route path={PROFILE_ADMIN_EDIT_USERS_ROUTE} element={<AdminUsersPage />} />
        <Route path={PROFILE_ADMIN_EDIT_CATEGORY_ROUTE} element={<AdminCategoryPage />} />
        <Route path={PROFILE_ADMIN_EDIT_SUBCATEGORY_ROUTE} element={<AdminSubcategoryPage />} />
      </Routes>
    </MasterLayout>
  );
}

export default App;
