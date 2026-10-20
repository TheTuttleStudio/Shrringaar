"use client";

import React from "react";
import * as THREE from "three";
import { Environment, Lightformer } from "@react-three/drei";

/**
 * High-Contrast Studio Lighting for fine jewellery.
 * Combines directional key/rim lights with visible high-intensity emissive panels
 * and an ivory surrounding studio dome so CubeCamera captures a luminous, realistic
 * studio environment instead of an empty black void.
 */
export function StudioLights() {
  return (
    <>
      {/* 1. Luminous warm ivory studio dome so environment rays never hit black void */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[20, 24, 24]} />
        <meshBasicMaterial color="#FBF9F5" side={THREE.BackSide} />
      </mesh>

      {/* 2. Direct illumination lights for metallic band shading */}
      <ambientLight intensity={0.5} color="#FAF7F2" />
      <directionalLight
        position={[3, 5, 4]}
        intensity={2.2}
        color="#FFFFFF"
        castShadow={false}
      />
      <directionalLight
        position={[-4, 3, -3]}
        intensity={1.5}
        color="#F2F6FA"
      />

      {/* 3. Physical High-Intensity Studio Light Panels for CubeCamera Facet Reflections */}
      {/* Overhead Key Softbox */}
      <mesh position={[0, 6, 1]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshBasicMaterial color="#FFFFFF" side={THREE.DoubleSide} />
      </mesh>

      {/* Narrow vertical key strip light on the right (creates intense linear glints) */}
      <mesh position={[3.8, 1.5, 2.2]} rotation={[0, -Math.PI / 4, 0]}>
        <planeGeometry args={[1.2, 9]} />
        <meshBasicMaterial color="#FFF9F0" side={THREE.DoubleSide} />
      </mesh>

      {/* Cool accent strip light on the left */}
      <mesh position={[-3.8, 1.5, -2.2]} rotation={[0, Math.PI / 4, 0]}>
        <planeGeometry args={[1.0, 8]} />
        <meshBasicMaterial color="#EAF4FC" side={THREE.DoubleSide} />
      </mesh>

      {/* Frontal sparkling fill spot */}
      <mesh position={[0, 2.2, 5.0]} rotation={[0, 0, 0]}>
        <circleGeometry args={[1.6, 32]} />
        <meshBasicMaterial color="#FFFFFF" side={THREE.DoubleSide} />
      </mesh>

      {/* Warm gold bounce reflector underneath */}
      <mesh position={[0, -4.0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshBasicMaterial color="#EEDCB4" side={THREE.DoubleSide} />
      </mesh>

      {/* Drei Environment for standard PBR metal reflections */}
      <Environment background={false}>
        <Lightformer
          form="rect"
          intensity={4.0}
          color="#FFFFFF"
          position={[0, 6, 1]}
          scale={[5, 5, 1]}
          target={[0, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={5.5}
          color="#FFF8EE"
          position={[3.5, 1.5, 2]}
          scale={[1.2, 8, 1]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <Lightformer
          form="rect"
          intensity={4.5}
          color="#EAF2FC"
          position={[-3.5, 1.5, -2]}
          scale={[1.0, 7, 1]}
          rotation={[0, -Math.PI / 4, 0]}
        />
      </Environment>
    </>
  );
}
