"use client";

import { motion } from "framer-motion";

export default function CommunityPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 1.5rem",
        color: "#ffffff",
        background: "transparent",
      }}
   >
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: "100%",
          maxWidth: 760,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 16,
          padding: "2rem",
          backdropFilter: "blur(10px)",
        }}
      >
        <h1 style={{ margin: 0, fontSize: 36, lineHeight: 1.2 }}>Join the Community</h1>
        <p style={{ marginTop: 12, opacity: 0.8 }}>
          Connect with fellow adventurers restoring Meemo. Follow updates and participate.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "0.8rem 1.2rem",
              borderRadius: 999,
              background: "linear-gradient(135deg,#4ecdc4,#44a3d5)",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Twitter
          </a>
          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "0.8rem 1.2rem",
              borderRadius: 999,
              border: "2px solid rgba(255,255,255,0.3)",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Discord
          </a>
        </div>
      </motion.section>
    </main>
  );
}


