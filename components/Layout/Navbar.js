import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Moon, Sun } from "react-feather";

import Hamburger from "./Hamburger";

import layoutStyles from "./Layout.module.css";
import styles from "./Navbar.module.css";

export default function Navbar({ isDarkMode, modifyTheme }) {
  const [ham, setHam] = useState(false);

  return (
    <header className={[layoutStyles.header, styles.header].join(" ")}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>FPF Events</h1>
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
      </div>

      <nav className={[styles.nav, ham && styles.openHam].join(" ")}>
        <Link href="/">
          <a className={styles.navItem} onClick={() => setHam(false)}>
            Home
          </a>
        </Link>
        <Link href="/event">
          <a className={styles.navItem} onClick={() => setHam(false)}>
            Event
          </a>
        </Link>
        <Link href="/leaderboard">
          <a className={styles.navItem} onClick={() => setHam(false)}>
            Leaderboard
          </a>
        </Link>
        <a
          className={[styles.navItem, styles.discordItem].join(" ")}
          href="https://discord.gg/5NQWyePKmp"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setHam(false)}
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
      <div className={styles.hamContainer}>
        <Hamburger isOpen={ham} onClick={() => setHam((prev) => !prev)} />
      </div>
    </header>
  );
}
