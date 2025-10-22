"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function BackgroundGradient() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Change background gradient based on scroll
  const gradientColors = {
    start: scrollProgress < 0.5 
      ? `rgba(15, 15, 30, ${0.3 + scrollProgress * 0.3})` 
      : `rgba(26, 26, 46, ${0.3 + scrollProgress * 0.3})`,
    end: scrollProgress < 0.5 
      ? `rgba(26, 26, 46, ${0.2 + scrollProgress * 0.2})` 
      : `rgba(22, 33, 62, ${0.2 + scrollProgress * 0.2})`,
  };

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: `radial-gradient(circle at ${50 + scrollProgress * 20}% ${50 - scrollProgress * 20}%, ${gradientColors.start}, ${gradientColors.end})`,
        opacity: 0.5,
        zIndex: 0,
        pointerEvents: "none",
      }}
      animate={{
        opacity: 0.3 + scrollProgress * 0.4,
      }}
      transition={{ duration: 0.5 }}
    />
  );
}

