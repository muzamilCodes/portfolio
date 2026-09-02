'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Icosahedron, TorusKnot } from '@react-three/drei';
import * as THREE from 'three';

function RotatingKnot() {
  const knotRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (knotRef.current) {
      knotRef.current.rotation.x += delta * 0.4;
      knotRef.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.2}>
      <mesh ref={knotRef}>
        <torusKnotGeometry args={[1.1, 0.32, 128, 32]} />
        <meshStandardMaterial
          color="#6366f1"
          emissive="#38bdf8"
          emissiveIntensity={0.2}
          roughness={0.15}
          metalness={0.85}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

function OrbitingNode({ radius, speed, color, size, offset = 0 }: { radius: number; speed: number; color: string; size: number; offset?: number }) {
  const nodeRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + offset;
    if (nodeRef.current) {
      nodeRef.current.position.x = Math.cos(t) * radius;
      nodeRef.current.position.z = Math.sin(t) * radius;
      nodeRef.current.position.y = Math.sin(t * 1.5) * 0.5;
    }
  });

  return (
    <mesh ref={nodeRef}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.9}
        roughness={0.2}
      />
    </mesh>
  );
}

export default function Skills3D() {
  return (
    <div className="w-full h-64 sm:h-80 md:h-96 relative">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[4, 4, 4]} intensity={2.5} color="#38bdf8" />
        <pointLight position={[-4, -4, -2]} intensity={2} color="#f472b6" />
        <directionalLight position={[0, 6, 2]} intensity={1.2} />

        <RotatingKnot />
        
        {/* Orbital interactive tech spheres */}
        <OrbitingNode radius={2.0} speed={1.2} color="#61dafb" size={0.15} offset={0} />
        <OrbitingNode radius={2.2} speed={-0.9} color="#38bdf8" size={0.13} offset={Math.PI / 3} />
        <OrbitingNode radius={1.9} speed={1.5} color="#f472b6" size={0.14} offset={Math.PI} />
        <OrbitingNode radius={2.4} speed={-1.1} color="#a855f7" size={0.12} offset={Math.PI * 1.5} />
        <OrbitingNode radius={2.1} speed={0.8} color="#34d399" size={0.13} offset={Math.PI * 0.7} />
      </Canvas>
    </div>
  );
}
