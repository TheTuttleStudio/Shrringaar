"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CubeCamera, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { StudioLights } from "./StudioLights";
import { RingModel, MetalType, StoneType } from "./RingModel";

interface RingSceneProps {
  metal: MetalType;
  stone: StoneType;
  isLowTier: boolean;
  reducedMotion: boolean;
  lightTierMode?: "physical" | "reflective";
  onContextLost?: () => void;
  onFpsReport?: (fps: number) => void;
}

// Inner animated stage that manages gentle rotation, inertia, and user horizontal drag
function RotatableRingStage({
  metal,
  stone,
  isLowTier,
  reducedMotion,
  lightTierMode,
  onFpsReport,
}: {
  metal: MetalType;
  stone: StoneType;
  isLowTier: boolean;
  reducedMotion: boolean;
  lightTierMode?: "physical" | "reflective";
  onFpsReport?: (fps: number) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const velocity = useRef(0);
  const targetRotationY = useRef(0.58); // Elegant 3/4 jewellery perspective
  const targetRotationX = useRef(0.48); // Forward tilt revealing brilliant crown & table facets

  // FPS measurement
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());

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

    // Measure FPS every 60 frames
    frameCount.current++;
    const now = performance.now();
    if (now - lastTime.current >= 1000) {
      const measuredFps = Math.round((frameCount.current * 1000) / (now - lastTime.current));
      if (onFpsReport) onFpsReport(measuredFps);
      frameCount.current = 0;
      lastTime.current = now;
    }

    if (reducedMotion) {
      // Keep completely still at elegant presentation angle for accessibility
      groupRef.current.rotation.y = 0.58;
      groupRef.current.rotation.x = 0.48;
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
  });

  return (
    <group
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* CubeCamera captures the studio environment into a dynamic 512px cubemap */}
      <CubeCamera
        resolution={isLowTier ? 256 : 512}
        frames={isLowTier ? 1 : Infinity}
        near={0.1}
        far={50}
      >
        {(texture) => (
          <RingModel
            metal={metal}
            stone={stone}
            isLowTier={isLowTier}
            envMap={texture}
            lightTierMode={lightTierMode}
          />
        )}
      </CubeCamera>
    </group>
  );
}

export function RingScene({
  metal,
  stone,
  isLowTier,
  reducedMotion,
  lightTierMode,
  onContextLost,
  onFpsReport,
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
        camera={{ position: [0, 0.42, 5.5], fov: 34 }}
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
          lightTierMode={lightTierMode}
          onFpsReport={onFpsReport}
        />

        {/* Soft grounding contact shadow under the ring */}
        <ContactShadows
          position={[0, -1.48, 0]}
          opacity={0.34}
          scale={4.8}
          blur={2.0}
          far={3.0}
          color="#1C1714"
        />

        {/* Subtle Bloom for direct glints - desktop only */}
        {!isLowTier && (
          <EffectComposer enableNormalPass={false}>
            <Bloom
              luminanceThreshold={0.93}
              luminanceSmoothing={0.15}
              intensity={0.4}
              mipmapBlur
            />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
