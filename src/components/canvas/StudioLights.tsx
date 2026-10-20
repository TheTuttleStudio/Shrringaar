"use client";

import React from "react";
import { Environment, Lightformer } from "@react-three/drei";

/**
 * Pure code-based studio lighting using Drei Lightformers.
 * No external HDRI downloads required; 100% offline, lightweight, and fast.
 */
export function StudioLights() {
  return (
    <>
      {/* Soft ambient foundation */}
      <ambientLight intensity={0.65} color="#FAF7F2" />

      {/* Warm key directional light for gold lustre */}
      <directionalLight
        position={[4, 6, 5]}
        intensity={1.2}
        color="#FFF6E5"
        castShadow={false}
      />

      {/* Gentle cool fill light for crisp gemstone facets */}
      <directionalLight
        position={[-5, 3, -4]}
        intensity={0.8}
        color="#F0F4F8"
      />

      {/* Procedural Studio Environment */}
      <Environment background={false}>
        {/* Soft overhead rectangular softbox */}
        <Lightformer
          form="rect"
          intensity={2.5}
          color="#FFFDFB"
          position={[0, 5, 0]}
          scale={[8, 8, 1]}
          target={[0, 0, 0]}
        />

        {/* Lateral key strip light - creates the signature fine jewellery highlight */}
        <Lightformer
          form="rect"
          intensity={3.0}
          color="#FFE9C7"
          position={[4, 2, 2]}
          scale={[2, 6, 1]}
          rotation={[0, Math.PI / 4, 0]}
        />

        {/* Lateral cool rim strip light */}
        <Lightformer
          form="rect"
          intensity={2.0}
          color="#D4E4F7"
          position={[-4, 1, -2]}
          scale={[2, 6, 1]}
          rotation={[0, -Math.PI / 4, 0]}
        />

        {/* Ground bounce for underside gold richness */}
        <Lightformer
          form="ring"
          intensity={1.2}
          color="#E8D5B7"
          position={[0, -3, 0]}
          scale={[6, 6, 1]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </Environment>
    </>
  );
}
