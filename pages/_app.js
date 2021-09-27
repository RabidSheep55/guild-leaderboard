import NProgress from "nprogress";
import Router from "next/router";
import "nprogress/nprogress.css";

import { hotjar } from "react-hotjar";
import { useEffect } from "react";

NProgress.configure({
  minimum: 0.2,
  easing: "ease",
  speed: 800,
  showSpinner: false,
  parent: "#progressbar",
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

import Layout from "../components/Layout";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    hotjar.initialize(2622707, 6);
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
