"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { StudioLights } from "./StudioLights";
import { RingModel, MetalType, StoneType } from "./RingModel";

interface RingSceneProps {
  metal: MetalType;
  stone: StoneType;
  isLowTier: boolean;
  reducedMotion: boolean;
  onContextLost?: () => void;
}

// Inner animated stage that manages gentle rotation, inertia, and user horizontal drag
function RotatableRingStage({
  metal,
  stone,
  isLowTier,
  reducedMotion,
}: {
  metal: MetalType;
  stone: StoneType;
  isLowTier: boolean;
  reducedMotion: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const velocity = useRef(0);
  const targetRotationY = useRef(0.42); // 3/4 beauty angle
  const targetRotationX = useRef(0.52); // Forward tilt displaying diamond crown and band thickness
  const targetRotationZ = useRef(-0.12); // Subtle luxury asymmetric balance

  // Pointer event handlers for touch-safe horizontal rotation
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    velocity.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - startX.current;
    startX.current = e.clientX;

    // Apply horizontal drag only to Y-axis rotation
    targetRotationY.current += deltaX * 0.009;
    velocity.current = deltaX * 0.009;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  useFrame(() => {
    if (!groupRef.current) return;

    if (reducedMotion) {
      // Keep completely still at elegant presentation angle for accessibility
      groupRef.current.rotation.y = 0.42;
      groupRef.current.rotation.x = 0.52;
      groupRef.current.rotation.z = -0.12;
      return;
    }

    if (!isDragging.current) {
      // Gentle auto-rotation when user is not dragging
      targetRotationY.current += 0.0035;

      // Smooth inertia decay
      velocity.current *= 0.94;
      targetRotationY.current += velocity.current;
    }

    // Silky damping interpolation (lerp)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotationY.current,
      0.08
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotationX.current,
      0.08
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      targetRotationZ.current,
      0.08
    );
  });

  return (
    <group
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <RingModel metal={metal} stone={stone} isLowTier={isLowTier} />
    </group>
  );
}

export function RingScene({
  metal,
  stone,
  isLowTier,
  reducedMotion,
  onContextLost,
}: RingSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOnScreen, setIsOnScreen] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(true);

  // Pause rendering when hero is off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOnScreen(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Pause rendering when browser tab is hidden
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // WebGL context loss listener
  const handleCreated = useCallback(
    ({ gl }: { gl: THREE.WebGLRenderer }) => {
      const canvas = gl.domElement;
      canvas.addEventListener("webglcontextlost", (event) => {
        event.preventDefault();
        if (onContextLost) onContextLost();
      });
    },
    [onContextLost]
  );

  const shouldRender = isOnScreen && isTabVisible;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none cursor-grab active:cursor-grabbing"
      style={{ touchAction: "pan-y" }}
    >
      <Canvas
        frameloop={shouldRender ? "always" : "never"}
        dpr={isLowTier ? [1, 1.5] : [1, 2]}
        camera={{ position: [0, 0.6, 4.4], fov: 36 }}
        gl={{
          antialias: !isLowTier,
          alpha: true,
          powerPreference: isLowTier ? "low-power" : "high-performance",
        }}
        onCreated={handleCreated}
        style={{
          width: "100%",
          height: "100%",
          touchAction: "pan-y",
          background: "transparent",
        }}
      >
        <StudioLights />
        <RotatableRingStage
          metal={metal}
          stone={stone}
          isLowTier={isLowTier}
          reducedMotion={reducedMotion}
        />
      </Canvas>
    </div>
  );
}
