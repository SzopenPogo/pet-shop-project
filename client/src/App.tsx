import { Route, Routes } from "react-router";
import LoginPage from "./pages/client/LoginPage/LoginPage";
import MainPage from "./pages/client/MainPage/MainPage";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/login' element={<LoginPage />} />
    </Routes>
  );
}

export default App;
