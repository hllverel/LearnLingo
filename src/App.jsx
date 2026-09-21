import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import TeachersPage from "./pages/TeachersPage/TeachersPage.jsx";
import FavouritesPage from "./pages/FavouritesPage/FavouritesPage.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="teachers" element={<TeachersPage />} />
          <Route path="favourites" element={<FavouritesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;