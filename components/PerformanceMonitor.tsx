"use client";

import { useEffect, useState } from "react";

export default function PerformanceMonitor() {
  const [fps, setFps] = useState(60);
  const [showMonitor, setShowMonitor] = useState(false);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
      }
      
      animationId = requestAnimationFrame(measureFPS);
    };

    // Toggle monitor with Ctrl+Shift+P
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setShowMonitor(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    animationId = requestAnimationFrame(measureFPS);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  if (!showMonitor) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "100px",
        right: "20px",
        background: "rgba(0, 0, 0, 0.8)",
        color: fps > 50 ? "#4ecdc4" : fps > 30 ? "#ffe66d" : "#ff6b6b",
        padding: "10px 15px",
        borderRadius: "8px",
        fontFamily: "monospace",
        fontSize: "14px",
        zIndex: 9999,
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div>FPS: {fps}</div>
      <div style={{ fontSize: "10px", opacity: 0.6, marginTop: "4px" }}>
        Ctrl+Shift+P to hide
      </div>
    </div>
  );
}

