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
      <Link href="/" className={styles.logo}>
        <span className={styles.logoText}>meemo</span>
        <div className={styles.logoAccent} />
      </Link>
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


