import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

const getLinkClass = ({ isActive }) =>
  isActive ? `${styles.link} ${styles.active}` : styles.link;

const Navigation = ({ isLoggedIn }) => {
  return (
    <nav>
      <ul className={styles.nav}>
        <li>
          <NavLink to="/" end className={getLinkClass}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/teachers" className={getLinkClass}>
            Teachers
          </NavLink>
        </li>
        {isLoggedIn && (
          <li>
            <NavLink to="/favourites" className={getLinkClass}>
              Favourites
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;