'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Torus, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function RadarBeacon() {
  const globeRef = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const ring3Ref = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.35;
      globeRef.current.rotation.x += delta * 0.15;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.5;
      ring1Ref.current.rotation.x += delta * 0.2;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.4;
      ring2Ref.current.rotation.y += delta * 0.3;
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.x -= delta * 0.6;
    }
  });

  return (
    <group>
      {/* Central Wireframe Beacon Globe */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1.2}>
        <Sphere ref={globeRef} args={[1.2, 24, 24]}>
          <meshStandardMaterial
            color="#6366f1"
            wireframe
            emissive="#38bdf8"
            emissiveIntensity={0.6}
            roughness={0.2}
          />
        </Sphere>
      </Float>

      {/* Inner glowing energy pulse */}
      <Sphere args={[0.6, 32, 32]}>
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.7} />
      </Sphere>

      {/* Expanding Holographic Transmission Rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.7, 0.02, 16, 64]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.8} />
      </mesh>

      <mesh ref={ring2Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.9, 0.02, 16, 64]} />
        <meshBasicMaterial color="#d946ef" transparent opacity={0.7} />
      </mesh>

      <mesh ref={ring3Ref} rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
        <torusGeometry args={[2.1, 0.02, 16, 64]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.6} />
      </mesh>

      <Sparkles count={50} scale={4} size={2} speed={0.4} color="#38bdf8" />
    </group>
  );
}

export default function Contact3D() {
  return (
    <div className="w-full h-64 sm:h-72 md:h-80 relative">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[4, 4, 4]} intensity={2.5} color="#38bdf8" />
        <pointLight position={[-4, -4, -2]} intensity={2} color="#f472b6" />
        <RadarBeacon />
      </Canvas>
    </div>
  );
}
