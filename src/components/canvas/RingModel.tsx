"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { MeshRefractionMaterial, useCursor } from "@react-three/drei";
import { createRoundBrilliantGeometry } from "./gemGeometry";
import { RingPartId } from "./RingPartDetail";

export type MetalType = "yellow" | "rose" | "white";
export type StoneType = "diamond" | "emerald" | "ruby" | "sapphire";

interface RingModelProps {
  metal?: MetalType;
  stone?: StoneType;
  isLowTier: boolean;
  envMap: THREE.Texture | THREE.CubeTexture | null;
  lightTierMode?: "physical" | "reflective";
  activePart?: RingPartId | null;
  hoveredPart?: RingPartId | null;
  onHoverPart?: (part: RingPartId | null) => void;
  onSelectPart?: (part: RingPartId) => void;
}

// Warm, authentic fine jewellery metal specifications (strictly no karat claims)
const METAL_CONFIGS: Record<MetalType, { color: string; roughness: number; metalness: number }> = {
  yellow: { color: "#E0B758", roughness: 0.14, metalness: 0.90 },
  rose: { color: "#E2A492", roughness: 0.15, metalness: 0.88 },
  white: { color: "#F0F4F6", roughness: 0.14, metalness: 0.84 },
};

// Vibrant, luminous stone configurations (bright & rich, never near black)
const STONE_CONFIGS: Record<StoneType, { color: string; ior: number; bounces: number; aberration: number; fresnel: number }> = {
  diamond: { color: "#FFFFFF", ior: 2.417, bounces: 4, aberration: 0.025, fresnel: 0.35 },
  emerald: { color: "#14A05C", ior: 1.58, bounces: 3, aberration: 0.015, fresnel: 0.28 },
  ruby: { color: "#D0173F", ior: 1.77, bounces: 4, aberration: 0.02, fresnel: 0.32 },
  sapphire: { color: "#2A5BD7", ior: 1.77, bounces: 4, aberration: 0.02, fresnel: 0.32 },
};

export function RingModel({
  metal = "yellow",
  stone = "diamond",
  isLowTier,
  envMap,
  lightTierMode = "physical",
  activePart = null,
  hoveredPart = null,
  onHoverPart,
  onSelectPart,
}: RingModelProps) {
  const metalConfig = METAL_CONFIGS[metal];
  const stoneConfig = STONE_CONFIGS[stone];

  // Base metal material for band, basket, and claws
  const metalMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(metalConfig.color),
      roughness: metalConfig.roughness,
      metalness: metalConfig.metalness,
      envMapIntensity: 2.2,
    });
  }, [metalConfig]);

  // Highlighted metal material for hovered/selected parts
  const highlightedMetalMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#F3CA68"),
      emissive: new THREE.Color("#B8975A"),
      emissiveIntensity: 0.25,
      roughness: 0.12,
      metalness: 0.92,
      envMapIntensity: 2.4,
    });
  }, []);

  // Main 57-Facet Brilliant Cut Gemstone Geometry (Scale: 1.15 units diameter)
  const gemGeometry = useMemo(() => {
    return createRoundBrilliantGeometry(1.15);
  }, []);

  // Accent Diamond Geometry (Tiny round brilliant)
  const accentGemGeometry = useMemo(() => {
    return createRoundBrilliantGeometry(0.14);
  }, []);

  // Material for accent stones
  const accentStoneMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.02,
      metalness: 0.08,
      transmission: 0.9,
      ior: 2.4,
      reflectivity: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
    });
  }, []);

  // Ring band dimensions (vertical circle in XY plane)
  const ringRadius = 1.20;

  // Comfort-fit tapered band profile (smooth rounded cross-section in XY plane)
  const bandGeometry = useMemo(() => {
    const segments = 96;
    const tubeSegments = 24;
    const positions: number[] = [];
    const indices: number[] = [];

    for (let i = 0; i <= segments; i++) {
      const u = (i / segments) * Math.PI * 2;
      const cosU = Math.cos(u);
      const sinU = Math.sin(u);

      // Tapering factor: slightly narrower near head (u ~ Math.PI / 2)
      const distFromTop = Math.abs(u - Math.PI / 2);
      const taper = distFromTop < 0.6 ? 0.78 + 0.22 * (distFromTop / 0.6) : 1.0;
      const tubeRadiusR = 0.085 * taper;
      const tubeRadiusZ = 0.11 * taper;

      for (let j = 0; j <= tubeSegments; j++) {
        const v = (j / tubeSegments) * Math.PI * 2;
        const cosV = Math.cos(v);
        const sinV = Math.sin(v);

        const r = ringRadius + tubeRadiusR * cosV;
        const x = r * cosU;
        const y = r * sinU;
        const z = tubeRadiusZ * sinV;

        positions.push(x, y, z);
      }
    }

    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < tubeSegments; j++) {
        const a = i * (tubeSegments + 1) + j;
        const b = (i + 1) * (tubeSegments + 1) + j;
        const c = (i + 1) * (tubeSegments + 1) + (j + 1);
        const d = i * (tubeSegments + 1) + (j + 1);

        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
  }, [ringRadius]);

  // 6 Curved Claw Prongs (Tubular curves hugging the girdle and claws over the crown)
  const prongGeometries = useMemo(() => {
    const prongs: THREE.BufferGeometry[] = [];
    const count = 6;
    const baseRadius = 0.32;
    const girdleRadius = 0.58;
    const crownRadius = 0.48;

    for (let i = 0; i < count; i++) {
      const angle = (i * 2 * Math.PI) / count;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      const p0 = new THREE.Vector3(cos * baseRadius, -0.22, sin * baseRadius);
      const p1 = new THREE.Vector3(cos * (girdleRadius + 0.02), 0.02, sin * (girdleRadius + 0.02));
      const p2 = new THREE.Vector3(cos * crownRadius, 0.16, sin * crownRadius);

      const curve = new THREE.QuadraticBezierCurve3(p0, p1, p2);
      const tube = new THREE.TubeGeometry(curve, 18, 0.028, 8, false);
      prongs.push(tube);
    }
    return prongs;
  }, []);

  // Shoulder Accent Diamonds placement
  const accentPositions = useMemo(() => {
    const items: { x: number; y: number; z: number; rotZ: number }[] = [];
    for (let side = -1; side <= 1; side += 2) {
      for (let step = 1; step <= 3; step++) {
        const angleOffset = side * (0.13 + step * 0.075);
        const angle = Math.PI / 2 + angleOffset;
        const r = ringRadius + 0.075;
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        const rotZ = angle - Math.PI / 2;
        items.push({ x, y, z: 0, rotZ });
      }
    }
    return items;
  }, [ringRadius]);

  // Milgrain bead geometry (single merged buffer for clean rendering)
  const milgrainGeometry = useMemo(() => {
    const positions: number[] = [];
    const sphere = new THREE.SphereGeometry(0.014, 6, 6);
    const spherePos = sphere.attributes.position.array;

    for (let side = -1; side <= 1; side += 2) {
      for (let step = 1; step <= 10; step++) {
        const angleOffset = side * (0.11 + step * 0.038);
        const angle = Math.PI / 2 + angleOffset;
        const r = ringRadius + 0.082;
        const cx = Math.cos(angle) * r;
        const cy = Math.sin(angle) * r;

        for (const cz of [-0.065, 0.065]) {
          for (let i = 0; i < spherePos.length; i += 3) {
            positions.push(
              spherePos[i] + cx,
              spherePos[i + 1] + cy,
              spherePos[i + 2] + cz
            );
          }
        }
      }
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geom.computeVertexNormals();
    return geom;
  }, [ringRadius]);

  // Is a particular part selected or hovered?
  const isShankActive = activePart === "shank" || hoveredPart === "shank";
  const isShoulderActive = activePart === "shoulder" || hoveredPart === "shoulder";
  const isBasketActive = activePart === "basket" || hoveredPart === "basket";
  const isHeadActive = activePart === "head" || hoveredPart === "head";

  // Dynamic cursor: turns to pointer over inspectable jewellery parts
  useCursor(hoveredPart !== null);

  return (
    <group position={[0, -0.16, 0]}>
      {/* 1. Comfort-fit Ring Band (Shank) */}
      <mesh
        geometry={bandGeometry}
        material={isShankActive ? highlightedMetalMaterial : metalMaterial}
        onPointerEnter={(e) => {
          e.stopPropagation();
          onHoverPart?.("shank");
        }}
        onPointerLeave={(e) => {
          e.stopPropagation();
          onHoverPart?.(null);
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelectPart?.("shank");
        }}
        castShadow
        receiveShadow
      />

      {/* 2. Shoulder Accent Diamonds & Milgrain (Shoulders) */}
      <group
        onPointerEnter={(e) => {
          e.stopPropagation();
          onHoverPart?.("shoulder");
        }}
        onPointerLeave={(e) => {
          e.stopPropagation();
          onHoverPart?.(null);
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelectPart?.("shoulder");
        }}
      >
        {accentPositions.map((pos, idx) => (
          <mesh
            key={idx}
            geometry={accentGemGeometry}
            material={accentStoneMaterial}
            position={[pos.x, pos.y, pos.z]}
            rotation={[0, 0, pos.rotZ]}
          />
        ))}
        <mesh
          geometry={milgrainGeometry}
          material={isShoulderActive ? highlightedMetalMaterial : metalMaterial}
        />
      </group>

      {/* 3. Solitaire Head Setting (Basket & Center Gemstone) */}
      <group position={[0, ringRadius + 0.22, 0]}>
        {/* Gallery collar basket under girdle (Basket) */}
        <group
          onPointerEnter={(e) => {
            e.stopPropagation();
            onHoverPart?.("basket");
          }}
          onPointerLeave={(e) => {
            e.stopPropagation();
            onHoverPart?.(null);
          }}
          onClick={(e) => {
            e.stopPropagation();
            onSelectPart?.("basket");
          }}
        >
          <mesh
            position={[0, -0.14, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            material={isBasketActive ? highlightedMetalMaterial : metalMaterial}
          >
            <torusGeometry args={[0.38, 0.026, 12, 32]} />
          </mesh>
          <mesh
            position={[0, -0.26, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            material={isBasketActive ? highlightedMetalMaterial : metalMaterial}
          >
            <torusGeometry args={[0.26, 0.022, 12, 32]} />
          </mesh>

          {/* 6 Curved Claw Prongs */}
          {prongGeometries.map((geom, idx) => (
            <mesh
              key={idx}
              geometry={geom}
              material={isBasketActive ? highlightedMetalMaterial : metalMaterial}
            />
          ))}
        </group>

        {/* 4. Center Brilliant Cut Gemstone (Head / Crown) */}
        <mesh
          geometry={gemGeometry}
          position={[0, 0, 0]}
          onPointerEnter={(e) => {
            e.stopPropagation();
            onHoverPart?.("head");
          }}
          onPointerLeave={(e) => {
            e.stopPropagation();
            onHoverPart?.(null);
          }}
          onClick={(e) => {
            e.stopPropagation();
            onSelectPart?.("head");
          }}
        >
          {!isLowTier && envMap ? (
            <MeshRefractionMaterial
              envMap={envMap}
              color={stoneConfig.color}
              ior={stoneConfig.ior}
              bounces={stoneConfig.bounces}
              aberrationStrength={stoneConfig.aberration}
              fresnel={isHeadActive ? 0.6 : stoneConfig.fresnel}
              fastChroma={true}
            />
          ) : lightTierMode === "reflective" ? (
            <meshStandardMaterial
              color={stoneConfig.color}
              metalness={0.96}
              roughness={0.02}
              envMapIntensity={2.8}
            />
          ) : (
            <meshPhysicalMaterial
              color={stoneConfig.color}
              roughness={0.02}
              metalness={0.08}
              transmission={0.92}
              thickness={1.0}
              ior={stoneConfig.ior}
              transparent
              opacity={stone === "diamond" ? 0.95 : 0.92}
              envMapIntensity={2.4}
              reflectivity={0.95}
              clearcoat={1.0}
              clearcoatRoughness={0.02}
            />
          )}
        </mesh>
      </group>
    </group>
  );
}
