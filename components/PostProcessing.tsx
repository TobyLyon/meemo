"use client";

import { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export default function PostProcessing() {
  const { gl, size } = useThree();
  const [ready, setReady] = useState(false);

  // Enable glow by default; set NEXT_PUBLIC_ENABLE_POSTFX="false" to disable if needed
  const ENABLE_POSTFX =
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_ENABLE_POSTFX !== "false") ||
    typeof process === "undefined";

  useEffect(() => {
    const raf = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!ENABLE_POSTFX) return null;
  if (!ready || !gl || !size?.width || !size?.height) return null;

  return (
    <EffectComposer multisampling={0}>
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


