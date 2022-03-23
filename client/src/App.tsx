import { Route, Routes } from "react-router";
import MasterLayout from "./components/layout/MasterLayout/MasterLayout";
import { LOGIN_ROUTE } from "./constants/routes";
import LoginPage from "./pages/client/LoginPage/LoginPage";
import MainPage from "./pages/client/MainPage/MainPage";

const App = () => {
  return (
    <MasterLayout>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path={LOGIN_ROUTE} element={<LoginPage />} />
      </Routes>
    </MasterLayout>
  );
}

export default App;
