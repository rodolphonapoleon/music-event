import NavbarNavigation from "./navbar";
import Footer from "./footer";
import styles from "../styles/Home.module.css";
const Layout = ({ children }) => {
  return (
    <>
      <div className="min-vh-100">
        <NavbarNavigation />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
