import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation.jsx"
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
        <Link to="/" className={styles.logo}>
            <svg className={styles.logosvg}>
                <use href="/symbol-defs.svg#TravelTrucksLogo"></use>
            </svg>
            <p>LearnLingo</p>
        </Link>

        <Navigation />

        <div className={styles.auth}>
          <button type="button" className={styles.loginbutton}>
            <svg className={styles.loginsvg}>
                <use href="/symbol-defs.svg#TravelTrucksLogo"></use>
            </svg>
            Log in
          </button>
          <button type="button" className={styles.registerbutton}>
            Registration
          </button>
        </div>
    </header>
  );
};

export default Header;