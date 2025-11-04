"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollHint() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    // Auto-hide after 5 seconds
    const timer = setTimeout(() => setShow(false), 5000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: 1 }}
          style={{
            position: "fixed",
            bottom: "120px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            color: "rgba(255, 255, 255, 0.6)",
            pointerEvents: "none",
          }}
        >
          <div style={{ fontSize: "0.9rem", letterSpacing: "0.2em", textAlign: "center" }}>
            SCROLL TO EXPLORE
          </div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ fontSize: "2rem" }}
          >
            ⌄
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

