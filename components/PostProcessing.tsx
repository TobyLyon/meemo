"use client";

import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export default function PostProcessing() {
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
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}


