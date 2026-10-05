import { Outlet } from "react-router-dom";
import Header from "../Header/Header.jsx";
import { useModal } from "../../hooks/useModal.js";
import styles from "./Layout.module.css";

const Layout = () => {
  const loginModal = useModal();

  return (
    <>
      <Header loginModal={loginModal} />
      <main>
        <Outlet context={{ openLoginModal: loginModal.open }} />
      </main>
    </>
  );
};

export default Layout;