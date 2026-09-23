import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, isRefreshing } = useSelector((state) => state.auth);

  if (isRefreshing) {
    return null;
  }

  return isLoggedIn ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;