"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function SoundToggle() {
  const [soundEnabled, setSoundEnabled] = useState(false);

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setSoundEnabled(!soundEnabled)}
      style={{
        position: "fixed",
        bottom: "120px",
        right: "20px",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        background: soundEnabled 
          ? "linear-gradient(135deg, #4ecdc4, #44a3d5)" 
          : "rgba(255, 255, 255, 0.1)",
        border: "2px solid rgba(255, 255, 255, 0.2)",
        color: "#ffffff",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.2rem",
        zIndex: 100,
        backdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
      }}
      title={soundEnabled ? "Mute" : "Unmute"}
    >
      {soundEnabled ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: "24px", height: "24px" }}>
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <path d="M15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: "24px", height: "24px" }}>
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
    </motion.button>
  );
}

