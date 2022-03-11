import { Route, Routes } from "react-router";
import MainPage from "./pages/client/MainPage/MainPage";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
    </Routes>
  );
}

export default App;
