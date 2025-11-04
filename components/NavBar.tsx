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
          href="https://solana.com/"
          className={styles.navLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Solana"
          title="Solana"
          style={{ display: "inline-flex", alignItems: "center", fontWeight: 600 }}
        >
          Solana
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
          Story
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
          World
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
          Journey
        </a>
      </nav>
    </motion.header>
  );
}


