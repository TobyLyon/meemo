"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimationDebuggerProps {
  animations: string[];
}

export default function AnimationDebugger({ animations }: AnimationDebuggerProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setShow(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          style={{
            position: "fixed",
            top: "180px",
            right: "20px",
            background: "rgba(0, 0, 0, 0.9)",
            color: "#ffffff",
            padding: "15px",
            borderRadius: "8px",
            fontFamily: "monospace",
            fontSize: "12px",
            zIndex: 9999,
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            maxWidth: "300px",
          }}
        >
          <div style={{ marginBottom: "10px", fontWeight: "bold", color: "#4ecdc4" }}>
            Active Animations ({animations.length})
          </div>
          {animations.length > 0 ? (
            animations.map((anim, index) => (
              <div key={index} style={{ padding: "4px 0", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                <span style={{ color: "#ffe66d" }}>▶</span> {anim}
              </div>
            ))
          ) : (
            <div style={{ opacity: 0.5 }}>No animations found</div>
          )}
          <div style={{ marginTop: "10px", fontSize: "10px", opacity: 0.6 }}>
            Ctrl+Shift+A to hide
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

