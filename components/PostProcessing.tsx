"use client";

import { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export default function PostProcessing() {
  const { gl, size } = useThree();
  const [ready, setReady] = useState(false);

  // Feature flag: set to true to re-enable post-processing once library issue is resolved
  const ENABLE_POSTFX = typeof process !== "undefined" && process.env.NEXT_PUBLIC_ENABLE_POSTFX === "true";

  useEffect(() => {
    const raf = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!ENABLE_POSTFX) return null;
  if (!ready || !gl || !size?.width || !size?.height) return null;

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={0.9}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.2}
        radius={0.9}
      />
      <Vignette
        eskil={false}
        offset={0.25}
        darkness={0.6}
        blendFunction={
          // @ts-ignore postprocessing enum type
          (BlendFunction as any).NORMAL ?? BlendFunction.NORMAL
        }
      />
    </EffectComposer>
  );
}


