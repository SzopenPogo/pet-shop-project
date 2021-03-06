import { Route, Routes } from "react-router";
import MasterLayout from "./components/layout/MasterLayout/MasterLayout";
import { CART_ROUTE, CHECKOUT_ROUTE, CHECKOUT_SUCCESS_ROUTE, CONTACT_ROUTE, LOGIN_ROUTE, PRODUCT_ROUTE, PROFILE_ADMIN_EDIT_CATEGORY_ROUTE, PROFILE_ADMIN_EDIT_CONTACTDATA_ROUTE, PROFILE_ADMIN_EDIT_ORDER_ROUTE, PROFILE_ADMIN_EDIT_PRODUCT_ROUTE, PROFILE_ADMIN_EDIT_SLIDER_ROUTE, PROFILE_ADMIN_EDIT_SUBCATEGORY_ROUTE, PROFILE_ADMIN_EDIT_USERS_ROUTE, PROFILE_EDIT_ADDRESS_ROUTE, PROFILE_EDIT_DATA_ROUTE, PROFILE_ORDERS_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE, SUBCATEGORY_ROUTE } from "./constants/routes";
import LoginPage from "./pages/client/LoginPage/LoginPage";
import MainPage from "./pages/client/MainPage/MainPage";
import RegisterPage from "./pages/client/RegisterPage/RegisterPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage/AdminUsersPage";
import UserAddressPage from "./pages/user/UserAddressPage/UserAddressPage";
import UserEditDataPage from "./pages/user/UserEditDataPage/UserEditDataPage";
import UserProfilePage from "./pages/user/UserProfilePage/UserProfilePage";
import AdminCategoryPage from "./pages/admin/AdminCategoryPage/AdminCategoryPage";
import AdminSubcategoryPage from "./pages/admin/AdminSubcategoryPage/AdminSubcategoryPage";
import AdminProductPage from "./pages/admin/AdminProductPage/AdminProductPage";
import AdminSliderPage from "./pages/admin/AdminSliderPage/AdminSliderPage";
import AdminContactPage from "./pages/admin/AdminContactPage/AdminContactPage";
import SubcategoryPage from "./pages/client/SubcategoryPage/SubcategoryPage";
import ProductPage from "./pages/client/ProductPage/ProductPage";
import ContactPage from "./pages/client/ContactPage/ContactPage";
import CartPage from "./pages/client/CartPage/CartPage";
import CheckoutPage from "./pages/client/CheckoutPage/CheckoutPage";
import CheckoutSuccessPage from "./pages/client/CheckoutSuccessPage/CheckoutSuccessPage";
import UserOrderPage from "./pages/user/UserOrderPage/UserOrderPage";
import AdminOrderPage from "./pages/admin/AdminOrderPage/AdminOrderPage";

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
        <Route path={PROFILE_ORDERS_ROUTE} element={<UserOrderPage />} />

        <Route path={PROFILE_ADMIN_EDIT_USERS_ROUTE} element={<AdminUsersPage />} />
        <Route path={PROFILE_ADMIN_EDIT_CATEGORY_ROUTE} element={<AdminCategoryPage />} />
        <Route path={PROFILE_ADMIN_EDIT_SUBCATEGORY_ROUTE} element={<AdminSubcategoryPage />} />
        <Route path={PROFILE_ADMIN_EDIT_PRODUCT_ROUTE} element={<AdminProductPage />} />
        <Route path={PROFILE_ADMIN_EDIT_SLIDER_ROUTE} element={<AdminSliderPage />} />
        <Route path={PROFILE_ADMIN_EDIT_CONTACTDATA_ROUTE} element={<AdminContactPage />} />
        <Route path={PROFILE_ADMIN_EDIT_ORDER_ROUTE} element={<AdminOrderPage />} />

        <Route path={`${SUBCATEGORY_ROUTE}/:id`} element={<SubcategoryPage />} />
        <Route path={`${PRODUCT_ROUTE}/:id`} element={<ProductPage />} />

        <Route path={`${CONTACT_ROUTE}`} element={<ContactPage />} />

        <Route path={`${CART_ROUTE}`} element={<CartPage />} />
        <Route path={`${CHECKOUT_ROUTE}`} element={<CheckoutPage />} />
        <Route path={`${CHECKOUT_SUCCESS_ROUTE}/:id`} element={<CheckoutSuccessPage />} />
      </Routes>
    </MasterLayout>
  );
}

export default App;
