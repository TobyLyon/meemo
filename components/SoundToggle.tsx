"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_VOLUME = 0.25;
const FADE_DURATION_MS = 1800;

export default function SoundToggle() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasAutoFadedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    console.log('[SoundToggle] Initializing audio element');
    audio.volume = 0; // start silent; fade in on first interaction
    audio.muted = true; // prime autoplay policies
    audio.loop = true;
    audio.preload = "auto";

    const onCanPlay = () => {
      console.log('[SoundToggle] Audio loaded and ready to play');
    };
    const onError = (e: Event) => {
      console.error('[SoundToggle] Audio load error:', e);
    };
    audio.addEventListener('canplaythrough', onCanPlay);
    audio.addEventListener('error', onError);

    // Prime playback muted (allowed on most browsers)
    audio.play().then(() => {
      console.log('[SoundToggle] Primed muted playback');
      audio.pause();
      audio.currentTime = 0;
    }).catch((e) => {
      console.log('[SoundToggle] Priming muted play failed:', e);
    });

    return () => {
      audio.removeEventListener('canplaythrough', onCanPlay);
      audio.removeEventListener('error', onError);
      try { audio.pause(); } catch {}
    };
  }, []);

  // Helper: fade volume up smoothly
  const fadeToVolume = useCallback((targetVolume: number, durationMs: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const start = performance.now();
    const from = audio.volume;
    const to = Math.max(0, Math.min(1, targetVolume));
    function step(now: number) {
      if (!audioRef.current) return; // null-safety check
      const t = Math.min(1, (now - start) / Math.max(1, durationMs));
      const eased = t * t * (3 - 2 * t); // smoothstep
      audioRef.current.volume = from + (to - from) * eased;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, []);

  // Start playback and fade in once (on first interaction)
  const startPlaybackWithFadeIn = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) {
      console.log('[SoundToggle] No audio ref in startPlaybackWithFadeIn');
      return;
    }
    console.log('[SoundToggle] Starting playback with fade-in');
    const doPlay = () => {
      audio.muted = false;
      audio.currentTime = Math.max(0, audio.currentTime);
      audio.play().then(() => {
        console.log('[SoundToggle] Audio play succeeded, fading to', DEFAULT_VOLUME);
        fadeToVolume(DEFAULT_VOLUME, FADE_DURATION_MS);
        setSoundEnabled(true);
      }).catch((e) => {
        console.log('[SoundToggle] Audio play failed after ready:', e);
      });
    };
    if (audio.readyState < 2) {
      console.log('[SoundToggle] Audio not ready, waiting canplaythrough...');
      const once = () => {
        audio.removeEventListener('canplaythrough', once);
        doPlay();
      };
      audio.addEventListener('canplaythrough', once);
      try { audio.load(); } catch {}
    } else {
      doPlay();
    }
  }, [fadeToVolume]);

  useEffect(() => {
    function onFirstInteract(e: Event) {
      if (hasAutoFadedRef.current) return;
      console.log('[SoundToggle] First interaction detected:', e.type);
      hasAutoFadedRef.current = true;
      startPlaybackWithFadeIn();
      remove();
    }
    function add() {
      console.log('[SoundToggle] Adding event listeners for auto-play');
      window.addEventListener("pointerdown", onFirstInteract, { passive: true });
      window.addEventListener("touchstart", onFirstInteract, { passive: true });
      window.addEventListener("keydown", onFirstInteract);
      window.addEventListener("wheel", onFirstInteract, { passive: true });
      window.addEventListener("scroll", onFirstInteract, { passive: true });
    }
    function remove() {
      console.log('[SoundToggle] Removing event listeners');
      window.removeEventListener("pointerdown", onFirstInteract as any);
      window.removeEventListener("touchstart", onFirstInteract as any);
      window.removeEventListener("keydown", onFirstInteract as any);
      window.removeEventListener("wheel", onFirstInteract as any);
      window.removeEventListener("scroll", onFirstInteract as any);
    }
    add();
    return remove;
  }, [startPlaybackWithFadeIn]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (soundEnabled) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
      audio.volume = 0; // reset for next fade-in
    }
  }, [soundEnabled]);

  return (
    <>
      <audio ref={audioRef} loop preload="auto" playsInline style={{ display: "none" }}>
        <source src="/meemobgmusic.mp3" type="audio/mpeg" />
      </audio>
      <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => {
        const next = !soundEnabled;
        setSoundEnabled(next);
        const audio = audioRef.current;
        if (!audio) return;
        if (next) {
          // Enable: ensure unmuted and fade in
          startPlaybackWithFadeIn();
        } else {
          // Disable: pause and reset volume
          try { audio.pause(); } catch {}
          audio.volume = 0;
        }
      }}
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
    </>
  );
}

