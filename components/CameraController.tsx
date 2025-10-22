"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";

export default function CameraController() {
  const { camera } = useThree();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(() => {
    // Define camera path based on scroll progress
    const angle = scrollProgress * Math.PI * 2; // Full rotation
    const radius = 8 - scrollProgress * 3; // Move closer as you scroll
    const height = 3.5 + Math.sin(scrollProgress * Math.PI) * 2; // Higher arc for better centering

    // Camera position
    const targetX = Math.sin(angle) * radius;
    const targetZ = Math.cos(angle) * radius;
    const targetY = height;

    // Smooth interpolation
    camera.position.lerp(
      new THREE.Vector3(targetX, targetY, targetZ),
      0.05
    );

    // Always look at the center (raise target slightly to center the model)
    camera.lookAt(0, 1.2, 0);
  });

  return null;
}

