import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

const getLinkClass = ({ isActive }) =>
  isActive ? `${styles.link} ${styles.active}` : styles.link;

const Navigation = ({ isLoggedIn, onNavigate }) => {
  return (
    <nav>
      <ul className={styles.nav}>
        <li>
          <NavLink to="/" end className={getLinkClass} onClick={onNavigate}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/teachers" className={getLinkClass} onClick={onNavigate}>
            Teachers
          </NavLink>
        </li>
        {isLoggedIn && (
          <li>
            <NavLink to="/favourites" className={getLinkClass} onClick={onNavigate}>
              Favourites
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;