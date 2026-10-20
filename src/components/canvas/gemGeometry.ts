import * as THREE from "three";

/**
 * Procedural 57-Facet Round Brilliant Cut Diamond Geometry.
 *
 * Proportions:
 * - Table width is about 56% of the stone's width.
 * - Crown height is about 15% of the width.
 * - Girdle thickness is about 2.5% of the width.
 * - Pavilion depth is about 43% of the width.
 * - 8-fold octagonal symmetry with flat shading (unshared triangle vertices).
 */
export function createRoundBrilliantGeometry(scale: number = 1.0): THREE.BufferGeometry {
  const R = 0.5 * scale;
  const rTable = R * 0.56;
  const hCrown = R * 2.0 * 0.15;
  const hGirdle = R * 2.0 * 0.025;
  const dPavilion = R * 2.0 * 0.43;

  const yTable = hCrown;
  const yUpperGirdle = 0;
  const yLowerGirdle = -hGirdle;
  const yCulet = -hGirdle - dPavilion;

  // Mid-crown star height & radius
  const yStar = hCrown * 0.58;
  const rStar = R * 0.82;

  // Mid-pavilion break height & radius for lower girdle facets
  const yPavBreak = yLowerGirdle - dPavilion * 0.55;
  const rPavBreak = R * 0.58;

  const positions: number[] = [];

  function addTriangle(
    p1: [number, number, number],
    p2: [number, number, number],
    p3: [number, number, number]
  ) {
    positions.push(...p1, ...p2, ...p3);
  }

  // Helper polar point
  function pt(radius: number, y: number, angleRad: number): [number, number, number] {
    return [radius * Math.cos(angleRad), y, radius * Math.sin(angleRad)];
  }

  const tableCenter: [number, number, number] = [0, yTable, 0];
  const culetPoint: [number, number, number] = [0, yCulet, 0];

  // 1. Table Facets (Flat octagonal top face)
  for (let i = 0; i < 8; i++) {
    const a1 = (i * 2 * Math.PI) / 8;
    const a2 = ((i + 1) * 2 * Math.PI) / 8;
    addTriangle(tableCenter, pt(rTable, yTable, a1), pt(rTable, yTable, a2));
  }

  // 2. Crown: 8 Star Facets (triangles connecting table edge to star points)
  for (let i = 0; i < 8; i++) {
    const aTable1 = (i * 2 * Math.PI) / 8;
    const aTable2 = ((i + 1) * 2 * Math.PI) / 8;
    const aStar = ((i + 0.5) * 2 * Math.PI) / 8;

    addTriangle(
      pt(rTable, yTable, aTable1),
      pt(rStar, yStar, aStar),
      pt(rTable, yTable, aTable2)
    );
  }

  // 3. Crown: 8 Kite (Bezel) Facets (connecting table corner, 2 star points, and main upper girdle corner)
  for (let i = 0; i < 8; i++) {
    const aTable = (i * 2 * Math.PI) / 8;
    const aStarPrev = ((i - 0.5) * 2 * Math.PI) / 8;
    const aStarNext = ((i + 0.5) * 2 * Math.PI) / 8;
    const aGirdleMain = (i * 2 * Math.PI) / 8;

    // Split kite into 2 triangles
    addTriangle(
      pt(rTable, yTable, aTable),
      pt(rStar, yStar, aStarPrev),
      pt(R, yUpperGirdle, aGirdleMain)
    );
    addTriangle(
      pt(rTable, yTable, aTable),
      pt(R, yUpperGirdle, aGirdleMain),
      pt(rStar, yStar, aStarNext)
    );
  }

  // 4. Crown: 16 Upper Girdle Facets (pairs of triangles between star points and girdle)
  for (let i = 0; i < 8; i++) {
    const aStar = ((i + 0.5) * 2 * Math.PI) / 8;
    const aGirdleMain1 = (i * 2 * Math.PI) / 8;
    const aGirdleMid = ((i + 0.5) * 2 * Math.PI) / 8;
    const aGirdleMain2 = ((i + 1) * 2 * Math.PI) / 8;

    // Left upper girdle triangle
    addTriangle(
      pt(rStar, yStar, aStar),
      pt(R, yUpperGirdle, aGirdleMain1),
      pt(R, yUpperGirdle, aGirdleMid)
    );
    // Right upper girdle triangle
    addTriangle(
      pt(rStar, yStar, aStar),
      pt(R, yUpperGirdle, aGirdleMid),
      pt(R, yUpperGirdle, aGirdleMain2)
    );
  }

  // 5. Girdle Facets (Thin 16-sided vertical rim)
  const girdleSegments = 16;
  for (let i = 0; i < girdleSegments; i++) {
    const a1 = (i * 2 * Math.PI) / girdleSegments;
    const a2 = ((i + 1) * 2 * Math.PI) / girdleSegments;

    const u1 = pt(R, yUpperGirdle, a1);
    const u2 = pt(R, yUpperGirdle, a2);
    const l1 = pt(R, yLowerGirdle, a1);
    const l2 = pt(R, yLowerGirdle, a2);

    addTriangle(u1, l1, l2);
    addTriangle(u1, l2, u2);
  }

  // 6. Pavilion: 8 Main Pavilion Facets (kites from main girdle points to culet)
  for (let i = 0; i < 8; i++) {
    const aMain = (i * 2 * Math.PI) / 8;
    const aMidPrev = ((i - 0.5) * 2 * Math.PI) / 8;
    const aMidNext = ((i + 0.5) * 2 * Math.PI) / 8;

    // Main pavilion rib to culet split
    addTriangle(
      pt(R, yLowerGirdle, aMain),
      pt(rPavBreak, yPavBreak, aMidPrev),
      culetPoint
    );
    addTriangle(
      pt(R, yLowerGirdle, aMain),
      culetPoint,
      pt(rPavBreak, yPavBreak, aMidNext)
    );
  }

  // 7. Pavilion: 16 Lower Girdle Facets (pairs connecting girdle midpoints to main ribs)
  for (let i = 0; i < 8; i++) {
    const aGirdleMid = ((i + 0.5) * 2 * Math.PI) / 8;
    const aMain1 = (i * 2 * Math.PI) / 8;
    const aMain2 = ((i + 1) * 2 * Math.PI) / 8;

    addTriangle(
      pt(R, yLowerGirdle, aGirdleMid),
      pt(R, yLowerGirdle, aMain1),
      pt(rPavBreak, yPavBreak, aGirdleMid)
    );
    addTriangle(
      pt(R, yLowerGirdle, aGirdleMid),
      pt(rPavBreak, yPavBreak, aGirdleMid),
      pt(R, yLowerGirdle, aMain2)
    );
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  // Flat shading: Each triangle has its own 3 vertices with flat surface normals
  geometry.computeVertexNormals();

  return geometry;
}
