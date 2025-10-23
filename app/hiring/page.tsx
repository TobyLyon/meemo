"use client";

import { motion } from "framer-motion";

export default function HiringPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 1.5rem",
        color: "#ffffff",
      }}
    >
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: "100%",
          maxWidth: 860,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 16,
          padding: "2rem",
          backdropFilter: "blur(10px)",
        }}
      >
        <h1 style={{ margin: 0, fontSize: 36, lineHeight: 1.2 }}>We’re Hiring</h1>
        <p style={{ marginTop: 12, opacity: 0.85 }}>
          Remote-friendly. Preference for candidates located in California, USA.
        </p>

        <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
          <div style={{ opacity: 0.9 }}>
            <strong>Open roles</strong>
            <ul style={{ margin: "8px 0 0 18px" }}>
              <li>Assistant Level Designer</li>
              <li>Sr Marketing</li>
            </ul>
          </div>

          <div style={{ opacity: 0.9 }}>
            <strong>What to send</strong>
            <ul style={{ margin: "8px 0 0 18px" }}>
              <li>Short intro (who you are, location, availability)</li>
              <li>Portfolio link (GitHub, ArtStation, personal site, etc.)</li>
              <li>Resume/CV link (optional)</li>
            </ul>
          </div>

          <div style={{ opacity: 0.9 }}>
            <strong>Where to send</strong>
            <p style={{ margin: "8px 0 0" }}>Email: <a href="mailto:meemosmagic@gmail.com" style={{ color: "#4ecdc4" }}>meemosmagic@gmail.com</a></p>
            <p style={{ margin: "4px 0 0", opacity: 0.8 }}>Subject: “Application — [Role] — [Your Name]”</p>
          </div>
        </div>
      </motion.section>
    </main>
  );
}


