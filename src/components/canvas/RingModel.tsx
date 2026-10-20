"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { MeshTransmissionMaterial } from "@react-three/drei";

export type MetalType = "yellow" | "rose" | "white";
export type StoneType = "diamond" | "emerald" | "ruby" | "sapphire";

interface RingModelProps {
  metal: MetalType;
  stone: StoneType;
  isLowTier: boolean;
}

const METAL_CONFIGS: Record<MetalType, { color: string; roughness: number; metalness: number }> = {
  yellow: { color: "#E0B758", roughness: 0.14, metalness: 0.96 },
  rose: { color: "#DE9F8E", roughness: 0.15, metalness: 0.95 },
  white: { color: "#E4EAEC", roughness: 0.12, metalness: 0.98 },
};

const STONE_CONFIGS: Record<StoneType, { color: string; transmissionColor: string; ior: number; dispersion: number }> = {
  diamond: { color: "#FFFFFF", transmissionColor: "#FFFFFF", ior: 2.42, dispersion: 0.06 },
  emerald: { color: "#116942", transmissionColor: "#188656", ior: 1.58, dispersion: 0.02 },
  ruby: { color: "#9E1439", transmissionColor: "#B51A43", ior: 1.77, dispersion: 0.03 },
  sapphire: { color: "#163778", transmissionColor: "#204DA0", ior: 1.77, dispersion: 0.03 },
};

export function RingModel({ metal, stone, isLowTier }: RingModelProps) {
  const metalConfig = METAL_CONFIGS[metal];
  const stoneConfig = STONE_CONFIGS[stone];

  // Band & prongs metal material
  const metalMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(metalConfig.color),
      roughness: metalConfig.roughness,
      metalness: metalConfig.metalness,
      envMapIntensity: 1.8,
    });
  }, [metalConfig]);

  // Combined diamond/gemstone geometry (Crown + Pavilion)
  const gemGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    
    // Create brilliant cut approximation using indexed vertices
    // Table facet + Upper girdle + Lower girdle + Culet point
    const segments = 16;
    const tableRadius = 0.38;
    const girdleRadius = 0.58;
    const tableHeight = 0.18;
    const girdleHeight = 0.0;
    const culetHeight = -0.52;

    const vertices: number[] = [];
    const indices: number[] = [];

    // Vertex 0: Table center
    vertices.push(0, tableHeight, 0);

    // Vertices 1..segments: Table rim
    for (let i = 0; i < segments; i++) {
      const angle = (i * 2 * Math.PI) / segments;
      vertices.push(Math.cos(angle) * tableRadius, tableHeight, Math.sin(angle) * tableRadius);
    }

    // Vertices (segments+1)..(2*segments): Girdle rim
    for (let i = 0; i < segments; i++) {
      const angle = (i * 2 * Math.PI) / segments;
      vertices.push(Math.cos(angle) * girdleRadius, girdleHeight, Math.sin(angle) * girdleRadius);
    }

    // Vertex 2*segments + 1: Culet (point at bottom)
    const culetIndex = 2 * segments + 1;
    vertices.push(0, culetHeight, 0);

    // Faces: Table top fan
    for (let i = 1; i <= segments; i++) {
      const next = i === segments ? 1 : i + 1;
      indices.push(0, i, next);
    }

    // Faces: Crown facets (Table rim to Girdle rim)
    for (let i = 0; i < segments; i++) {
      const table1 = 1 + i;
      const table2 = 1 + ((i + 1) % segments);
      const girdle1 = 1 + segments + i;
      const girdle2 = 1 + segments + ((i + 1) % segments);

      // Triangulate crown quad
      indices.push(table1, girdle1, girdle2);
      indices.push(table1, girdle2, table2);
    }

    // Faces: Pavilion facets (Girdle to Culet point)
    for (let i = 0; i < segments; i++) {
      const girdle1 = 1 + segments + i;
      const girdle2 = 1 + segments + ((i + 1) % segments);
      indices.push(girdle1, culetIndex, girdle2);
    }

    geom.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    geom.setIndex(indices);
    geom.computeVertexNormals();

    return geom;
  }, []);

  return (
    <group position={[0, -0.4, 0]}>
      {/* 1. Main Gold Ring Band (Shank) */}
      <mesh material={metalMaterial} castShadow receiveShadow>
        <torusGeometry args={[1.3, 0.13, 32, 64]} />
      </mesh>

      {/* 2. Prong Setting Bezel & Seat */}
      <group position={[0, 1.25, 0]}>
        {/* Under-gallery support collar */}
        <mesh position={[0, 0.05, 0]} material={metalMaterial}>
          <torusGeometry args={[0.42, 0.035, 16, 32]} />
        </mesh>

        {/* 6 Curved Prongs holding the solitaire */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i * Math.PI) / 3;
          const radius = 0.44;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          return (
            <mesh
              key={i}
              position={[x, 0.22, z]}
              rotation={[
                0.14 * Math.sin(angle),
                0,
                -0.14 * Math.cos(angle),
              ]}
              material={metalMaterial}
            >
              <cylinderGeometry args={[0.035, 0.024, 0.44, 16]} />
            </mesh>
          );
        })}

        {/* 3. Brilliant Solitaire Gemstone */}
        <mesh position={[0, 0.35, 0]} geometry={gemGeometry}>
          {isLowTier ? (
            /* High-performance physical material for mobile / low concurrency */
            <meshPhysicalMaterial
              color={stoneConfig.color}
              roughness={0.04}
              metalness={0.02}
              transmission={0.92}
              thickness={0.85}
              ior={stoneConfig.ior}
              transparent
              opacity={stone === "diamond" ? 0.94 : 0.92}
              envMapIntensity={2.4}
              reflectivity={0.95}
              clearcoat={1.0}
              clearcoatRoughness={0.02}
            />
          ) : (
            /* High-fidelity transmission material for desktop */
            <MeshTransmissionMaterial
              backside
              samples={6}
              resolution={384}
              transmission={0.95}
              roughness={0.03}
              thickness={0.9}
              ior={stoneConfig.ior}
              chromaticAberration={stoneConfig.dispersion}
              anisotropy={0.1}
              distortion={0.05}
              distortionScale={0.1}
              temporalDistortion={0}
              color={stoneConfig.color}
              attenuationColor={stoneConfig.transmissionColor}
              attenuationDistance={0.5}
            />
          )}
        </mesh>
      </group>
    </group>
  );
}
