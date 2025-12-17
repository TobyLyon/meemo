"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./UI.module.css";

export default function NavBar() {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={styles.header}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>Meemo</span>
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
        {isMobile ? (
          <>
            <Link href="/story" className={styles.navLink}>
              Hi
            </Link>
            <Link href="/world" className={styles.navLink}>
              World
            </Link>
            <Link href="/journey" className={styles.navLink}>
              Journey
            </Link>
          </>
        ) : isHome ? (
          <>
            <a
              href="#story"
              className={styles.navLink}
              onClick={() => {
                // In-page smooth scroll
                const doc = document.documentElement;
                const body = document.body;
                const height = (body.scrollHeight || doc.scrollHeight) - window.innerHeight;
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Hi
            </a>
            <a
              href="#world"
              className={styles.navLink}
              onClick={() => {
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
              onClick={() => {
                const doc = document.documentElement;
                const body = document.body;
                const height = (body.scrollHeight || doc.scrollHeight) - window.innerHeight;
                window.scrollTo({ top: height * 0.98, behavior: "smooth" });
              }}
            >
              Journey
            </a>
          </>
        ) : (
          <>
            <Link href="/#story" className={styles.navLink}>
              Hi
            </Link>
            <Link href="/#world" className={styles.navLink}>
              World
            </Link>
            <Link href="/#journey" className={styles.navLink}>
              Journey
            </Link>
          </>
        )}
      </nav>
    </motion.header>
  );
}


