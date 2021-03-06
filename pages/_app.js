import "../styles/globals.css";
import Layout from "../comps/layout";
import "../styles/index.scss";

function MyApp({ Component, pageProps }) {
  return (
    <Layout className="vh-100 mx-auto">
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
