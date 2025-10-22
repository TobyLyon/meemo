"use client";

import { Suspense } from "react";
import Scene from "@/components/Scene";
import UI from "@/components/UI";
import LoadingScreen from "@/components/LoadingScreen";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import ScrollHint from "@/components/ScrollHint";
import BackgroundGradient from "@/components/BackgroundGradient";
import SoundToggle from "@/components/SoundToggle";

export default function Home() {
  return (
    <>
      <BackgroundGradient />
      <Suspense fallback={<LoadingScreen />}>
        <Scene />
      </Suspense>
      <UI />
      <ScrollHint />
      <SoundToggle />
      <PerformanceMonitor />
    </>
  );
}

