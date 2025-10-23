"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./UI.module.css";

export default function NavBar() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={styles.header}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>meemo</span>
          <div className={styles.logoAccent} />
        </Link>
        <a
          href="https://www.binance.com/"
          className={styles.navLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Binance"
          title="Binance"
          style={{ display: "inline-flex", alignItems: "center" }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="#F3BA2F"
            aria-hidden="true"
            focusable="false"
          >
            <polygon points="12,4 14,6 12,8 10,6" />
            <polygon points="6,10 8,12 6,14 4,12" />
            <polygon points="18,10 20,12 18,14 16,12" />
            <polygon points="12,16 14,18 12,20 10,18" />
            <polygon points="12,10 14,12 12,14 10,12" />
          </svg>
        </a>
      </div>
      <nav className={styles.nav}>
        <a
          href="#story"
          className={styles.navLink}
          onClick={(e) => {
            // In-page smooth scroll
            const doc = document.documentElement;
            const body = document.body;
            const height = (body.scrollHeight || doc.scrollHeight) - window.innerHeight;
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          故事 story
        </a>
        <a
          href="#world"
          className={styles.navLink}
          onClick={(e) => {
            const doc = document.documentElement;
            const body = document.body;
            const height = (body.scrollHeight || doc.scrollHeight) - window.innerHeight;
            window.scrollTo({ top: height * 0.5, behavior: "smooth" });
          }}
        >
          世界 world
        </a>
        <a
          href="#journey"
          className={styles.navLink}
          onClick={(e) => {
            const doc = document.documentElement;
            const body = document.body;
            const height = (body.scrollHeight || doc.scrollHeight) - window.innerHeight;
            window.scrollTo({ top: height * 0.98, behavior: "smooth" });
          }}
        >
          旅程 journey
        </a>
      </nav>
    </motion.header>
  );
}


