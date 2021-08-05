import Link from "next/link";
import Image from "next/image";

import { Moon, Sun } from "react-feather";

import layoutStyles from "./Layout.module.css";
import styles from "./Navbar.module.css";

export default function Navbar({ isDarkMode, modifyTheme }) {
  return (
    <header className={[layoutStyles.header, styles.header].join(" ")}>
      <h1 className={styles.title}>FPF Guild App</h1>
      <nav className={styles.nav}>
        <div className={styles.iconContainer}>
          {isDarkMode ? (
            <Sun
              onClick={() => modifyTheme(false)}
              className={styles.themeIcon}
            />
          ) : (
            <Moon
              onClick={() => modifyTheme(true)}
              className={styles.themeIcon}
            />
          )}
        </div>
        <Link href="/">
          <a className={styles.navItem}>Home</a>
        </Link>
        <Link href="/event">
          <a className={styles.navItem}>Event</a>
        </Link>
        <Link href="/leaderboard">
          <a className={styles.navItem}>Leaderboard</a>
        </Link>
        <a
          className={[styles.navItem, styles.discordItem].join(" ")}
          href="https://github.com/RabidSheep55"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={styles.discord}>
            <Image
              src="/discord.svg"
              alt="Discord Logo"
              width={30}
              height={30}
              layout="responsive"
            />
          </div>

          <span>Discord</span>
        </a>
      </nav>
    </header>
  );
}
