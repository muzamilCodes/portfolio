'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface NodeData {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  color: THREE.Color;
  size: number;
}

const COLOR_PALETTE = [
  '#38bdf8', // Cyan
  '#fbbf24', // Gold / Amber
  '#f472b6', // Pink
  '#a855f7', // Purple
  '#34d399', // Emerald
  '#ffffff', // White
];

// Connected 3D Nodes Network with dynamic line web
function ConstellationNetwork({ count = 55, maxDistance = 3.2 }) {
  const lineMeshRef = useRef<THREE.LineSegments>(null!);
  const pointsMeshRef = useRef<THREE.Points>(null!);

  // Initialize nodes
  const nodes = useMemo<NodeData[]>(() => {
    const arr: NodeData[] = [];
    for (let i = 0; i < count; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 7
      );
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.008,
        (Math.random() - 0.5) * 0.008,
        (Math.random() - 0.5) * 0.006
      );
      const colorHex = COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
      const color = new THREE.Color(colorHex);
      const size = 0.12 + Math.random() * 0.14;
      arr.push({ position, velocity, color, size });
    }
    return arr;
  }, [count]);

  const maxLines = (count * (count - 1)) / 2;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);
  const lineColors = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);

  const pointPositions = useMemo(() => new Float32Array(count * 3), [count]);
  const pointColors = useMemo(() => new Float32Array(count * 3), [count]);

  useFrame((state) => {
    const mouseX = state.pointer.x * 1.5;
    const mouseY = state.pointer.y * 1.5;

    let lineIndex = 0;

    // Update node positions
    for (let i = 0; i < count; i++) {
      const node = nodes[i];
      node.position.add(node.velocity);

      // Bounce off boundaries
      if (Math.abs(node.position.x) > 8.5) node.velocity.x *= -1;
      if (Math.abs(node.position.y) > 5.0) node.velocity.y *= -1;
      if (Math.abs(node.position.z) > 4.0) node.velocity.z *= -1;

      // Subtle mouse repulsion / attraction
      const distToMouse = Math.sqrt(
        (node.position.x - mouseX) ** 2 + (node.position.y - mouseY) ** 2
      );
      if (distToMouse < 2.5) {
        node.position.x += (node.position.x - mouseX) * 0.004;
        node.position.y += (node.position.y - mouseY) * 0.004;
      }

      pointPositions[i * 3] = node.position.x;
      pointPositions[i * 3 + 1] = node.position.y;
      pointPositions[i * 3 + 2] = node.position.z;

      pointColors[i * 3] = node.color.r;
      pointColors[i * 3 + 1] = node.color.g;
      pointColors[i * 3 + 2] = node.color.b;
    }

    // Connect nodes within distance threshold
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const p1 = nodes[i].position;
        const p2 = nodes[j].position;
        const dist = p1.distanceTo(p2);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.7;

          linePositions[lineIndex * 6] = p1.x;
          linePositions[lineIndex * 6 + 1] = p1.y;
          linePositions[lineIndex * 6 + 2] = p1.z;
          linePositions[lineIndex * 6 + 3] = p2.x;
          linePositions[lineIndex * 6 + 4] = p2.y;
          linePositions[lineIndex * 6 + 5] = p2.z;

          // Average color with alpha blend
          const c1 = nodes[i].color;
          const c2 = nodes[j].color;

          lineColors[lineIndex * 6] = c1.r * alpha;
          lineColors[lineIndex * 6 + 1] = c1.g * alpha;
          lineColors[lineIndex * 6 + 2] = c1.b * alpha;
          lineColors[lineIndex * 6 + 3] = c2.r * alpha;
          lineColors[lineIndex * 6 + 4] = c2.g * alpha;
          lineColors[lineIndex * 6 + 5] = c2.b * alpha;

          lineIndex++;
        }
      }
    }

    // Clear unused line vertices
    for (let k = lineIndex * 6; k < linePositions.length; k++) {
      linePositions[k] = 0;
      lineColors[k] = 0;
    }

    if (lineMeshRef.current) {
      lineMeshRef.current.geometry.attributes.position.needsUpdate = true;
      lineMeshRef.current.geometry.attributes.color.needsUpdate = true;
      lineMeshRef.current.geometry.setDrawRange(0, lineIndex * 2);
    }

    if (pointsMeshRef.current) {
      pointsMeshRef.current.geometry.attributes.position.needsUpdate = true;
      pointsMeshRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Connected Wireframe Lines */}
      <lineSegments ref={lineMeshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Glowing Star Nodes */}
      <points ref={pointsMeshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[pointPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[pointColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          vertexColors
          transparent
          opacity={0.95}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

// 3D Floating Frosted Glass / Neon Cubes (as in the video reference!)
function FloatingGlassCubes() {
  return (
    <group>
      {/* Cube 1 - Top Left */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2} position={[-4.5, 2.2, -1]}>
        <mesh rotation={[0.4, 0.6, 0.2]}>
          <boxGeometry args={[0.9, 0.9, 0.9]} />
          <meshStandardMaterial
            color="#a5b4fc"
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={0.7}
            emissive="#4f46e5"
            emissiveIntensity={0.4}
          />
        </mesh>
      </Float>

      {/* Cube 2 - Top Center / Right */}
      <Float speed={2.5} rotationIntensity={1.8} floatIntensity={1.8} position={[1.5, 2.8, -1.5]}>
        <mesh rotation={[0.8, 0.3, 0.5]}>
          <boxGeometry args={[0.75, 0.75, 0.75]} />
          <meshStandardMaterial
            color="#38bdf8"
            roughness={0.15}
            metalness={0.85}
            transparent
            opacity={0.75}
            emissive="#0284c7"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>

      {/* Cube 3 - Center Floating */}
      <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.5} position={[-1.2, 0.8, -0.5]}>
        <mesh rotation={[0.2, 0.7, 0.4]}>
          <boxGeometry args={[0.65, 0.65, 0.65]} />
          <meshStandardMaterial
            color="#f472b6"
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.7}
            emissive="#db2777"
            emissiveIntensity={0.45}
          />
        </mesh>
      </Float>

      {/* Cube 4 - Bottom Left */}
      <Float speed={2.2} rotationIntensity={1.6} floatIntensity={2} position={[-5.2, -2.4, -1]}>
        <mesh rotation={[0.5, 0.2, 0.9]}>
          <boxGeometry args={[0.85, 0.85, 0.85]} />
          <meshStandardMaterial
            color="#c084fc"
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={0.65}
            emissive="#7c3aed"
            emissiveIntensity={0.4}
          />
        </mesh>
      </Float>

      {/* Cube 5 - Far Right */}
      <Float speed={2.6} rotationIntensity={2} floatIntensity={1.6} position={[5.8, -1.5, -2]}>
        <mesh rotation={[0.3, 0.9, 0.1]}>
          <boxGeometry args={[1.0, 1.0, 1.0]} />
          <meshStandardMaterial
            color="#34d399"
            roughness={0.15}
            metalness={0.75}
            transparent
            opacity={0.6}
            emissive="#059669"
            emissiveIntensity={0.4}
          />
        </mesh>
      </Float>
    </group>
  );
}

// 4-Point Cross Sparkles
function SparkleCross({ position, size = 0.25, color = "#ffffff" }: { position: [number, number, number]; size?: number; color?: string }) {
  const meshRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * 0.4;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1} position={position}>
      <group ref={meshRef}>
        {/* Horizontal bar */}
        <mesh>
          <planeGeometry args={[size, size * 0.15]} />
          <meshBasicMaterial color={color} transparent opacity={0.85} side={THREE.DoubleSide} />
        </mesh>
        {/* Vertical bar */}
        <mesh>
          <planeGeometry args={[size * 0.15, size]} />
          <meshBasicMaterial color={color} transparent opacity={0.85} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </Float>
  );
}

export default function HeroConstellation3D() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 8, 5]} intensity={1.8} color="#ffffff" />
        <pointLight position={[-4, 3, 2]} intensity={3} color="#38bdf8" />
        <pointLight position={[4, -3, 2]} intensity={3} color="#f472b6" />
        <pointLight position={[0, 4, 3]} intensity={2.5} color="#fbbf24" />

        <ConstellationNetwork count={55} maxDistance={3.0} />
        <FloatingGlassCubes />

        {/* 4-Point Twinkling Cross Stars */}
        <SparkleCross position={[-3.5, 3.2, 0]} size={0.35} color="#38bdf8" />
        <SparkleCross position={[4.2, 2.5, -0.5]} size={0.4} color="#f472b6" />
        <SparkleCross position={[-2.8, -2.8, 0.5]} size={0.3} color="#fbbf24" />
        <SparkleCross position={[3.5, -3.2, -0.2]} size={0.38} color="#a855f7" />
        <SparkleCross position={[0.5, -2.2, 0.8]} size={0.28} color="#34d399" />
      </Canvas>
    </div>
  );
}
