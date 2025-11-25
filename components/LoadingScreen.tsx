"use client";

import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)",
        zIndex: 9999,
      }}
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          fontSize: "4rem",
          fontWeight: 700,
          background: "linear-gradient(45deg, #ff6b6b, #4ecdc4, #ffe66d)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "2rem",
        }}
      >
        Tumi
      </motion.div>
      <motion.div
        style={{
          width: "200px",
          height: "2px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "1px",
          overflow: "hidden",
        }}
      >
        <motion.div
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: "50%",
            height: "100%",
            background: "linear-gradient(90deg, transparent, #4ecdc4, transparent)",
          }}
        />
      </motion.div>
      <p style={{ marginTop: "2rem", fontSize: "0.9rem", opacity: 0.6 }}>
        Loading Magic...
      </p>
    </motion.div>
  );
}

