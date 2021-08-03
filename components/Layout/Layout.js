import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

import styles from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>FPF Guild</title>
        <meta
          name="description"
          content="First Place Fishing Guild App - for guild event leaderboards and more!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
