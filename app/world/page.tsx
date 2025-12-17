"use client";

import { motion } from "framer-motion";
import { TOKEN_ADDRESS } from "@/config/constants";

export default function WorldPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 1.25rem 2.5rem",
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
          maxWidth: 820,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 16,
          padding: "2rem",
          backdropFilter: "blur(10px)",
        }}
      >
        <h1 style={{ margin: 0, fontSize: 36, lineHeight: 1.2 }}>World</h1>
        <p style={{ marginTop: 12, opacity: 0.85, lineHeight: 1.7 }}>
          Magic returns to the trenches.
        </p>

        <div style={{ marginTop: 18, display: "grid", gap: 14 }}>
          <div
            style={{
              padding: "1rem 1.1rem",
              borderRadius: 14,
              background: "rgba(0,0,0,0.18)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div style={{ fontWeight: 700 }}>From Traders to Believers</div>
            <div style={{ marginTop: 6, opacity: 0.8, lineHeight: 1.6 }}>Flip the meta: conviction over convenience.</div>
          </div>
          <div
            style={{
              padding: "1rem 1.1rem",
              borderRadius: 14,
              background: "rgba(0,0,0,0.18)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div style={{ fontWeight: 700 }}>Magic, Not Hype</div>
            <div style={{ marginTop: 6, opacity: 0.8, lineHeight: 1.6 }}>Art-first culture lighting up the trenches.</div>
          </div>
          <div
            style={{
              padding: "1rem 1.1rem",
              borderRadius: 14,
              background: "rgba(0,0,0,0.18)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div style={{ fontWeight: 700 }}>Powered by Solana</div>
            <div style={{ marginTop: 6, opacity: 0.8, lineHeight: 1.6 }}>Fast, low-fee rails for real community.</div>
          </div>
        </div>

        <div
          style={{
            marginTop: 22,
            padding: "1rem 1.1rem",
            borderRadius: 12,
            background: "rgba(0,0,0,0.22)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div style={{ fontSize: 12, opacity: 0.7, letterSpacing: "0.12em" }}>TOKEN ADDRESS</div>
          <div
            style={{
              marginTop: 8,
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              color: "#4ecdc4",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            title={TOKEN_ADDRESS}
          >
            {TOKEN_ADDRESS}
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
          <a
            href="https://x.com/MeemosMagic"
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
            X
          </a>
          <a
            href="https://t.me/meemosportal"
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
            Telegram
          </a>
        </div>
      </motion.section>
    </main>
  );
}
