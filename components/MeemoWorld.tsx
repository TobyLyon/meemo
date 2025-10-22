"use client";

import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Group } from "three";

export default function MeemoWorld() {
  const group = useRef<Group>(null);
  
  // Load the GLB model
  const { scene, animations } = useGLTF("/meemo world graphic.glb");
  const { actions, mixer } = useAnimations(animations, group);

  useEffect(() => {
    if (actions && animations.length > 0) {
      const names = Object.keys(actions);
      console.log("Available animations:", names);
      
      // Play all animations in sync
      names.forEach((key) => {
        const action = actions[key];
        if (action) {
          action.reset();
          action.play();
          // Set time scale for smooth playback
          action.timeScale = 1;
          // Set to loop indefinitely
          action.setLoop(2201, Infinity); // 2201 = THREE.LoopRepeat
        }
      });
    }

    return () => {
      // Cleanup
      if (mixer) {
        mixer.stopAllAction();
      }
    };
  }, [actions, animations, mixer]);

  return (
    <group ref={group}>
      <primitive object={scene} scale={1} position={[0, 0, 0]} />
    </group>
  );
}

// Preload the model
useGLTF.preload("/meemo world graphic.glb");

