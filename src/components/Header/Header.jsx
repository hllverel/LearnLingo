import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navigation from "../Navigation/Navigation.jsx";
import Modal from "../Modal/Modal.jsx";
import RegisterForm from "../RegisterForm/RegisterForm.jsx";
import LoginForm from "../LoginForm/LoginForm.jsx";
import { registerUser, loginUser, logoutUser } from "../../firebase/auth.js";
import {useModal} from "../../hooks/useModal.js";
import styles from "./Header.module.css";

const getAuthErrorMessage = (error) => {
  if (error.code === "auth/email-already-in-use") {
    return "This email is already registered. Try logging in instead.";
  }
  if (error.code === "auth/invalid-credential") {
    return "Incorrect email or password.";
  }
  return "Something went wrong. Please try again.";
};

const Header = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const registerModal = useModal();
  const loginModal = useModal();

  const handleRegister = async (data) => {
    try {
      registerModal.setError(null);
      await registerUser(data);
      registerModal.close();
    } catch (error) {
      registerModal.setError(getAuthErrorMessage(error));
    }
  };

  const handleLogin = async (data) => {
    try {
      loginModal.setError(null);
      await loginUser(data);
      loginModal.close();
    } catch (error) {
      loginModal.setError(getAuthErrorMessage(error));
    }
  };

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <header className={styles.header}>
        <Link to="/" className={styles.logo}>
            <svg className={styles.logosvg}>
                <use href="/symbol-defs.svg#TravelTrucksLogo"></use>
            </svg>
            <p>LearnLingo</p>
        </Link>

        <Navigation isLoggedIn={isLoggedIn} />

        {isLoggedIn ? (
          <div className={styles.auth}>
            <p className={styles.username}>{user.name || user.email}</p>
            <button type="button" className={styles.registerbutton} onClick={handleLogout}>
              Log out
            </button>
          </div>
        ) : (
          <div className={styles.auth}>
            <button type="button" className={styles.loginbutton} onClick={loginModal.open}>
              <svg className={styles.loginsvg}>
                  <use href="/symbol-defs.svg#TravelTrucksLogo"></use>
              </svg>
              Log in
            </button>
            <button type="button" className={styles.registerbutton} onClick={registerModal.open}>
              Registration
            </button>
          </div>
        )}

      {registerModal.isOpen && (
        <Modal onClose={registerModal.close}>
          <RegisterForm onSubmit={handleRegister} submitError={registerModal.error} />
        </Modal>
      )}
      {loginModal.isOpen && (
        <Modal onClose={loginModal.close}>
          <LoginForm onSubmit={handleLogin} submitError={loginModal.error} />
        </Modal>
      )}
    </header>
  );
};

export default Header;