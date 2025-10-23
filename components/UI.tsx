"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import styles from "./UI.module.css";

export default function UI() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const router = useRouter();

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

  // Determine which section is active based on scroll
  const activeSection = 
    scrollProgress < 0.33 ? 0 : scrollProgress < 0.66 ? 1 : 2;

  return (
    <>
      {/* Header moved to universal NavBar in layout */}

      {/* Scroll Progress Indicator */}
      <div className={styles.scrollIndicator}>
        <motion.div
          className={styles.scrollProgress}
          style={{ scaleY: scrollProgress }}
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
              <p className={styles.subtitle}>歡迎來到魔法國度 · Welcome to the Magic Land</p>
              <p className={styles.description}>
                你的任務：把破舊的 Meemo 修補成世界最受喜愛的泰迪熊 · Your quest: restore Meemo from worn to beloved.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  navigator.clipboard.writeText("Coming Soon");
                }}
                className={styles.tokenButton}
              >
                <span className={styles.tokenLabel}>代幣地址 · Token Address</span>
                <span className={styles.tokenAddress}>Coming Soon</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.copyIcon}>
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
              </motion.button>
              <div className={styles.scrollHint}>
                <span>向下捲動 · Scroll</span>
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
                <span className={styles.kanji}>世界</span>
                <span>探索世界 · Explore the World</span>
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
                  <h3>修補之旅 · The Repair Journey</h3>
                  <p>收集碎片、縫補裂痕 · Gather pieces, mend the seams</p>
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
                  <h3>心之火花 · Heart Sparks</h3>
                  <p>善意會發光 · Kindness powers your progress</p>
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
                  <h3>社群代幣 · Community Token</h3>
                  <p>Meemo memecoin · art in motion</p>
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
                <span className={styles.kanji}>旅程</span>
                <span>開始旅程 · Begin Your Journey</span>
              </h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className={styles.comingSoon}
              >
                <div className={styles.comingSoonBadge}>即將啟航 · Setting Sail</div>
                <p className={`${styles.releaseText} ${styles.releaseTextCompact}`}>
                  一起修補 Meemo — 即將啟程 · Help mend Meemo — coming soon.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    navigator.clipboard.writeText("Coming Soon");
                  }}
                  className={styles.tokenButton}
                  style={{ marginBottom: "2rem" }}
                >
                  <span className={styles.tokenLabel}>代幣地址 · Token Address</span>
                  <span className={styles.tokenAddress}>Coming Soon</span>
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
                    onClick={() => router.push("/community")}
                  >
                    加入社群 · Join Community
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={styles.secondaryButton}
                    onClick={() => router.push("/hiring")}
                  >
                    招募資訊 · Hiring
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
            <a href="#" className={styles.socialLink} target="_blank" rel="noopener noreferrer">Discord</a>
            <a href="#" className={styles.socialLink} target="_blank" rel="noopener noreferrer">YouTube</a>
          </div>
        </div>
      </motion.footer>
    </>
  );
}

