"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import styles from "./UI.module.css";
import { TOKEN_ADDRESS } from "@/config/constants";

export default function UI() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const smoothed = useRef(0);
  const router = useRouter();
  const tokenAddress = TOKEN_ADDRESS;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth the progress value to reduce abrupt transitions
  smoothed.current += (scrollProgress - smoothed.current) * 0.1;

  // Add a small hysteresis so sections don't flicker near boundaries
  const thresholds = useRef({ a: 0.33, b: 0.66 });
  const t = smoothed.current;
  let activeSection: 0 | 1 | 2;
  if (t < thresholds.current.a - 0.02) {
    activeSection = 0;
  } else if (t > thresholds.current.b + 0.02) {
    activeSection = 2;
  } else if (t < 0.5) {
    activeSection = t >= thresholds.current.a ? 1 : 0;
  } else {
    activeSection = 1;
  }

  return (
    <>
      {/* Header moved to universal NavBar in layout */}

      {/* Scroll Progress Indicator */}
      <div className={styles.scrollIndicator}>
        <motion.div
          className={styles.scrollProgress}
          style={{ scaleY: smoothed.current }}
        />
      </div>

      {/* Section 1: Welcome - Story */}
      <AnimatePresence>
        {activeSection === 0 && (
          <motion.div
            key="section-1"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
            className={`${styles.contentSection} ${styles.aboveFooter}`}
            id="story"
          >
            <div className={`${styles.card} ${styles.cardCompact}`}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className={styles.cardAccent}
              />
              <h1 className={styles.title}>
                <span className={styles.titleMain}>Meemo&apos;s</span>
                <span className={styles.titleSub}>Magic Land</span>
              </h1>
              <p className={styles.subtitle}>Welcome</p>
              <p className={styles.description}>
                When the market went dark, only one light bled through the pain. MeeMo&apos;s Magic Land is a memecoin exclusively made to bring back the magic that once existed on-chain. Believers will win.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  navigator.clipboard.writeText(tokenAddress);
                }}
                className={styles.tokenButton}
              >
                <span className={styles.tokenLabel}>Token Address</span>
                <span className={styles.tokenAddress}>{tokenAddress}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.copyIcon}>
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
              </motion.button>
              <div className={styles.scrollHint}>
                <span>Scroll</span>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className={styles.scrollArrow}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: "24px", height: "24px" }}>
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section 2: World Features */}
      <AnimatePresence>
        {activeSection === 1 && (
          <motion.div
            key="section-2"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.6 }}
            className={`${styles.contentSection} ${styles.aboveFooter}`}
            id="world"
          >
            <div className={`${styles.card} ${styles.cardCompact}`}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className={styles.cardAccent}
                style={{ background: "linear-gradient(135deg, #4ecdc4, #44a3d5)" }}
              />
              <h2 className={styles.sectionTitle}>
                <span>Explore the World</span>
              </h2>
              <div className={styles.featureGrid}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={styles.feature}
                >
                  <div className={styles.featureIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  </div>
                  <h3>Repair Quest</h3>
                  <p>Gather · mend · glow</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className={styles.feature}
                >
                  <div className={styles.featureIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2C8 2 4 5 4 9C4 13 8 17 12 22C16 17 20 13 20 9C20 5 16 2 12 2Z" />
                      <path d="M2 12h20M12 2v20" opacity="0.5" />
                    </svg>
                  </div>
                  <h3>Heart</h3>
                  <p>Kindness powers all</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className={styles.feature}
                >
                  <div className={styles.featureIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M7 12h10M12 7v10" opacity="0.4" />
                      <circle cx="12" cy="12" r="3" fill="currentColor" />
                    </svg>
                  </div>
                  <h3>Token</h3>
                  <p>memecoin × art</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section 3: Coming Soon */}
      <AnimatePresence>
        {activeSection === 2 && (
          <motion.div
            key="section-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6 }}
            className={`${styles.contentSection} ${styles.aboveFooter}`}
            id="journey"
          >
            <div className={`${styles.card} ${styles.cardCompact}`}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className={styles.cardAccent}
                style={{ background: "linear-gradient(135deg, #ff6b6b, #ee5a6f)" }}
              />
              <h2 className={styles.sectionTitle}>
                <span>Begin Your Journey</span>
              </h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className={styles.comingSoon}
              >
                <p className={`${styles.releaseText} ${styles.releaseTextCompact}`}>
                  Help mend Meemo — coming soon.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                onClick={() => {
                  navigator.clipboard.writeText(tokenAddress);
                }}
                  className={styles.tokenButton}
                  style={{ marginBottom: "2rem" }}
                >
                  <span className={styles.tokenLabel}>Token Address</span>
                <span className={styles.tokenAddress}>{tokenAddress}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.copyIcon}>
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                </motion.button>
                <div className={styles.buttonGroup}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={styles.primaryButton}
                    onClick={() => {
                    window.open("https://t.me/meemosportal", "_blank", "noopener,noreferrer");
                    }}
                  >
                    Join
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer - Always visible at bottom */}
      <motion.footer
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className={styles.footer}
      >
        <div className={styles.footerContent}>
          <p>© 2025 Meemo&apos;s Magic Land. All rights reserved.</p>
          <div className={styles.socialLinks}>
            <a href="https://x.com/MeemosMagic" className={styles.socialLink} target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://t.me/meemosportal" className={styles.socialLink} target="_blank" rel="noopener noreferrer">Telegram</a>
          </div>
        </div>
      </motion.footer>
    </>
  );
}

