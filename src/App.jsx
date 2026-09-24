import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase.js";
import { setUser, clearUser } from "./redux/auth/authSlice.js";
import { fetchFavourites, clearFavourites } from "./redux/favourites/favouritesSlice.js";
import Layout from "./components/Layout/Layout.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import TeachersPage from "./pages/TeachersPage/TeachersPage.jsx";
import FavouritesPage from "./pages/FavouritesPage/FavouritesPage.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({ uid: user.uid, email: user.email, name: user.displayName }));
        dispatch(fetchFavourites(user.uid));
      } else {
        dispatch(clearUser());
        dispatch(clearFavourites());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="teachers" element={<TeachersPage />} />
          <Route path="favourites" element={
              <PrivateRoute>
                <FavouritesPage />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;