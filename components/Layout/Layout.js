import { useState, useEffect } from "react";

import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

import styles from "./Layout.module.css";

import darkTheme from "styles/themes/dark.module.css";
import lightTheme from "styles/themes/light.module.css";

export default function Layout({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(null);

  const modifyTheme = (val) => {
    setIsDarkMode(val);
  };

  // window object is only accessible on load
  useEffect(() => {
    const val =
      window.matchMedia("(prefers-color-scheme: dark)").matches || false;
    modifyTheme(val);
  }, []);

  return (
    <div
      className={[
        styles.container,
        isDarkMode ? darkTheme.theme : lightTheme.theme,
      ].join(" ")}
    >
      <Head>
        <title>FPF Guild</title>
        <meta
          name="description"
          content="First Place Fishing Guild App - for guild event leaderboards and more!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar isDarkMode={isDarkMode} modifyTheme={modifyTheme} />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
