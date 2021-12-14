import NavbarNavigation from "./navbar";
import Footer from "./footer";
import styles from "../styles/Home.module.css";
const Layout = ({ children }) => {
  return (
    <div>
      <NavbarNavigation />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
