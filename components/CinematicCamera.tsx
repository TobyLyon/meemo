"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type Waypoint = {
  position: THREE.Vector3;
  lookAt?: THREE.Vector3;
};

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function CinematicCamera({
  waypoints: externalWaypoints,
}: {
  waypoints?: Waypoint[];
}) {
  const { camera, scene } = useThree();
  const [scrollT, setScrollT] = useState(0);
  const smoothedT = useRef(0);
  const MIN_RADIUS = 7.5; // keep camera from getting too close to center (building)
  const LOOK_Y = 1.2; // default vertical look target
  const MID_LIFT = 2.0; // extra vertical lift at mid-scroll to clear building
  const START_OFFSET = 0.08; // start slightly further along path for perfect cat alignment
  const START_HEIGHT_DROP = 3.0; // lower camera at start for upward angle (slightly stronger)
  const START_LOOK_LIFT = 1.0; // raise look target at start for dramatic upward tilt (reduced)
  const START_FOV = 30; // zoomed-in at start (narrower FOV)
  const END_FOV = 50; // default FOV later in the path
  const ZOOM_SECTION = 0.25; // first 25% of scroll transitions FOV
  const PATH_COVERAGE = 0.9; // cover only 90% of the curve to cut the end

  // Try to discover waypoints from the GLB by node names like CamPath_01, CamPath_02, ...
  const discoveredWaypoints = useMemo(() => {
    // Collect by numeric index embedded in name
    const byIndex: Record<number, Waypoint> = {};
    scene.traverse((obj) => {
      if (!obj.name) return;
      const pathMatch = obj.name.match(/^CamPath_(\d{2})$/i);
      const lookMatch = obj.name.match(/^CamLook_(\d{2})$/i);
      if (pathMatch) {
        const idx = parseInt(pathMatch[1], 10);
        const pos = obj.getWorldPosition(new THREE.Vector3());
        byIndex[idx] = byIndex[idx] || ({} as Waypoint);
        byIndex[idx].position = pos;
      }
      if (lookMatch) {
        const idx = parseInt(lookMatch[1], 10);
        const look = obj.getWorldPosition(new THREE.Vector3());
        byIndex[idx] = byIndex[idx] || ({} as Waypoint);
        byIndex[idx].lookAt = look;
      }
    });
    const ordered = Object.keys(byIndex)
      .map((k) => parseInt(k, 10))
      .sort((a, b) => a - b)
      .map((k) => byIndex[k])
      .filter((w) => w && w.position);
    return ordered;
  }, [scene]);

  // Optional explicit start marker named "CamStart" in the GLB
  const startMarker = useMemo(() => {
    let marker: THREE.Vector3 | null = null;
    scene.traverse((obj) => {
      if (obj.name === "CamStart") {
        marker = obj.getWorldPosition(new THREE.Vector3());
      }
    });
    return marker;
  }, [scene]);

  const waypoints: Waypoint[] = useMemo(() => {
    if (externalWaypoints && externalWaypoints.length >= 2) return externalWaypoints;
    if (discoveredWaypoints.length >= 2) return discoveredWaypoints;
    // Fallback default path around origin
    const fallback: Waypoint[] = [
      { position: new THREE.Vector3(7.5, 4.6, 7.5), lookAt: new THREE.Vector3(0, LOOK_Y, 0) },
      { position: new THREE.Vector3(3.0, 5.0, 9.5), lookAt: new THREE.Vector3(0, LOOK_Y, 0) },
      { position: new THREE.Vector3(-7.5, 4.2, 7.5), lookAt: new THREE.Vector3(0, LOOK_Y, 0) },
      { position: new THREE.Vector3(-9.5, 4.8, 0), lookAt: new THREE.Vector3(0, LOOK_Y, 0) },
      { position: new THREE.Vector3(-7.5, 4.4, -7.5), lookAt: new THREE.Vector3(0, LOOK_Y, 0) },
      { position: new THREE.Vector3(3.0, 4.6, -9.5), lookAt: new THREE.Vector3(0, LOOK_Y, 0) },
      { position: new THREE.Vector3(7.5, 4.0, -7.5), lookAt: new THREE.Vector3(0, LOOK_Y, 0) },
      { position: new THREE.Vector3(9.5, 4.8, 0), lookAt: new THREE.Vector3(0, LOOK_Y, 0) },
    ];
    return fallback;
  }, [externalWaypoints, discoveredWaypoints]);

  // Determine waypoint ordering:
  // - If GLB waypoints exist, honor their order (CamPath_01..). If a CamStart
  //   marker exists, rotate so the nearest waypoint becomes first.
  // - Otherwise (fallback), auto-pick a pleasant head-on start.
  const rotatedWaypoints = useMemo(() => {
    if (waypoints.length === 0) return waypoints;

    // If we discovered explicit GLB waypoints, trust creator intent
    if (discoveredWaypoints.length >= 2) {
      if (startMarker) {
        // Rotate so the waypoint closest to the start marker is first
        let nearestIdx = 0;
        let nearestDist = Infinity;
        discoveredWaypoints.forEach((w, i) => {
          const d = w.position.distanceTo(startMarker!);
          if (d < nearestDist) {
            nearestDist = d;
            nearestIdx = i;
          }
        });
        return [
          ...discoveredWaypoints.slice(nearestIdx),
          ...discoveredWaypoints.slice(0, nearestIdx),
        ];
      }
      // No explicit start marker: keep provided order (CamPath_01 is start)
      return discoveredWaypoints;
    }

    // Fallback path: auto-pick a good head-on start
    const centerlineDir = new THREE.Vector3(0, 0, 1);
    let bestScore = -Infinity;
    let startIdx = 0;
    waypoints.forEach((w, i) => {
      const horiz = new THREE.Vector3(w.position.x, 0, w.position.z).normalize();
      const dirDot = horiz.dot(centerlineDir);
      const xOffset = Math.abs(w.position.x);
      const score = dirDot * 20 - xOffset * 2 + w.position.y * 0.4;
      if (score > bestScore) {
        bestScore = score;
        startIdx = i;
      }
    });
    return [...waypoints.slice(startIdx), ...waypoints.slice(0, startIdx)];
  }, [waypoints, discoveredWaypoints, startMarker]);

  const curve = useMemo(() => {
    const pts = rotatedWaypoints.map((w) => w.position);
    // Closed loop path to mimic cyclic path
    return new THREE.CatmullRomCurve3(pts, true, "catmullrom", 0.5);
  }, [rotatedWaypoints]);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const t = Math.min(Math.max(scrollTop / docHeight, 0), 1);
      setScrollT(t);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame(() => {
    // Smooth the scroll value for cinematic feel
    const targetT = easeInOutCubic(scrollT);
    smoothedT.current += (targetT - smoothedT.current) * 0.06;

    // Apply offset so camera starts perfectly aligned with the cat
    // Use raw smoothedT (not offsetT) for effects to prevent wrap glitches
    const effectiveOffset = discoveredWaypoints.length >= 2 ? 0 : START_OFFSET;
    const offsetStart = effectiveOffset;
    const offsetEnd = Math.min(effectiveOffset + PATH_COVERAGE, 0.999);
    const offsetT = offsetStart + (offsetEnd - offsetStart) * smoothedT.current;
    const pos = curve.getPointAt(offsetT).clone();
    const aheadT = Math.min(offsetT + 0.002, offsetEnd);
    const ahead = curve.getPointAt(aheadT).clone();

    // Safety: keep camera outside a minimum horizontal radius to avoid clipping through the building
    const horizLen = Math.hypot(pos.x, pos.z);
    if (horizLen < MIN_RADIUS) {
      const nx = pos.x / (horizLen || 1e-6);
      const nz = pos.z / (horizLen || 1e-6);
      pos.x = nx * MIN_RADIUS;
      pos.z = nz * MIN_RADIUS;
    }

    // Smooth vertical lift peaked at halfway through the scroll (t = 0.5)
    const midLift = MID_LIFT * Math.pow(Math.sin(Math.PI * offsetT), 2);
    pos.y += midLift;

    // Lower camera at start for upward viewing angle (fades out as scroll progresses)
    // Use smoothedT to avoid reactivation at loop end
    const startDropFactor = Math.max(0, 1 - smoothedT.current * 4); // fade out in first 25% of scroll
    pos.y -= START_HEIGHT_DROP * startDropFactor;

    // Interpolate optional lookAt from nearest waypoints if provided
    const segment = offsetT * rotatedWaypoints.length;
    const i0 = Math.floor(segment) % rotatedWaypoints.length;
    const i1 = (i0 + 1) % rotatedWaypoints.length;
    const localT = segment - Math.floor(segment);

    const look0 = rotatedWaypoints[i0].lookAt ?? new THREE.Vector3(0, LOOK_Y, 0);
    const look1 = rotatedWaypoints[i1].lookAt ?? new THREE.Vector3(0, LOOK_Y, 0);
    const look = new THREE.Vector3().lerpVectors(look0, look1, localT);
    // Nudge look target upward slightly when lifted so framing stays centered
    look.y += midLift * 0.5;
    // Raise look target at start for dramatic upward angle
    look.y += START_LOOK_LIFT * startDropFactor;

    // Slightly pull back along view direction for extra safety near geometry
    const toLook = new THREE.Vector3().subVectors(look, pos).normalize();
    const pulledBack = pos.clone().addScaledVector(toLook, -0.5);

    camera.position.lerp(pulledBack, 0.18);
    camera.lookAt(look);

    // Cinematic zoom: start zoomed-in (lower FOV), ease out to normal FOV
    const zoomPhase = Math.min(smoothedT.current / ZOOM_SECTION, 1);
    const easedZoom = easeInOutCubic(zoomPhase);
    const desiredFov = THREE.MathUtils.lerp(START_FOV, END_FOV, easedZoom);
    const maybePerspective = camera as THREE.PerspectiveCamera;
    if ((maybePerspective as any).isPerspectiveCamera) {
      if (maybePerspective.fov !== desiredFov) {
        maybePerspective.fov = desiredFov;
        maybePerspective.updateProjectionMatrix();
      }
    }
  });

  return null;
}


