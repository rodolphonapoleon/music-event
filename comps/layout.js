import NavbarNavigation from "./navbar";
import Footer from "./footer";
import styles from "../styles/Home.module.css";
const Layout = ({ children }) => {
  return (
    <>
      <NavbarNavigation />
      <div className="min-vh-100 fluid">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
