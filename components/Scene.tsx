"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import TumiWorld from "./TumiWorld";
import CinematicCamera from "./CinematicCamera";
import PostProcessing from "./PostProcessing";
import { Environment, Stars } from "@react-three/drei";

export default function Scene() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1,
      }}
    >
      <Canvas
        shadows
        camera={{ position: [0, 2, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#0a0a15"]} />
        
        {/* Lighting Setup */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, 10, -10]} intensity={0.5} color="#4ecdc4" />
        <pointLight position={[10, -10, 10]} intensity={0.3} color="#ff6b6b" />
        
        {/* Environment and Background */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        
        <Suspense fallback={null}>
          <Environment preset="night" />
          <TumiWorld />
        </Suspense>
        
        {/* Cinematic Camera Path Controller */}
        <CinematicCamera />
        
        {/* Post Processing Effects */}
        <PostProcessing />
      </Canvas>
    </div>
  );
}

