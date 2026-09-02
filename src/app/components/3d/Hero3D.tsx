'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, 
  MeshDistortMaterial, 
  Sphere, 
  Torus, 
  Icosahedron,
  OrbitControls,
  Sparkles,
  Html
} from '@react-three/drei';
import * as THREE from 'three';

function Floating3DBadge({ position, text, icon, color }: { position: [number, number, number]; text: string; icon: string; color: string }) {
  return (
    <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1.5} position={position}>
      <Html center distanceFactor={10} className="pointer-events-none select-none">
        <div 
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border backdrop-blur-md shadow-xl text-xs font-bold whitespace-nowrap animate-pulse-slow"
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            borderColor: color,
            color: '#ffffff',
            boxShadow: `0 0 20px ${color}33`,
          }}
        >
          <span>{icon}</span>
          <span>{text}</span>
        </div>
      </Html>
    </Float>
  );
}

function HolographicCore() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Group>(null!);
  const ring2Ref = useRef<THREE.Group>(null!);
  const ring3Ref = useRef<THREE.Group>(null!);
  const icosahedronRef = useRef<THREE.Mesh>(null!);

  const [clicked, setClicked] = useState(false);

  useFrame((state, delta) => {
    const mouseX = state.pointer.x * 0.8;
    const mouseY = state.pointer.y * 0.8;

    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4;
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouseX * 0.3, 0.08);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouseY * 0.3, 0.08);
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.6;
      ring1Ref.current.rotation.y += delta * 0.3;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.5;
      ring2Ref.current.rotation.z += delta * 0.4;
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.x -= delta * 0.3;
      ring3Ref.current.rotation.z -= delta * 0.7;
    }

    if (icosahedronRef.current) {
      icosahedronRef.current.rotation.y += delta * 0.9;
      icosahedronRef.current.rotation.x -= delta * 0.6;
    }
  });

  return (
    <group onClick={() => setClicked(!clicked)}>
      {/* Central Organic Distorted Hologram Sphere */}
      <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.5}>
        <Sphere ref={meshRef} args={[1.1, 64, 64]} scale={clicked ? 1.25 : 1}>
          <MeshDistortMaterial
            color="#6366f1"
            attach="material"
            distort={0.45}
            speed={2.5}
            roughness={0.15}
            metalness={0.9}
            emissive="#312e81"
            emissiveIntensity={0.6}
          />
        </Sphere>
      </Float>

      {/* Wireframe Glowing Holographic Icosahedron inside */}
      <Float speed={3} rotationIntensity={2} floatIntensity={1.2}>
        <Icosahedron ref={icosahedronRef} args={[0.75, 0]}>
          <meshStandardMaterial
            color="#38bdf8"
            wireframe
            emissive="#38bdf8"
            emissiveIntensity={0.9}
          />
        </Icosahedron>
      </Float>

      {/* Outer Gyroscopic Neon Ring 1 */}
      <group ref={ring1Ref}>
        <Torus args={[1.8, 0.03, 16, 100]}>
          <meshStandardMaterial
            color="#ec4899"
            emissive="#ec4899"
            emissiveIntensity={1.2}
            roughness={0.1}
            metalness={0.9}
          />
        </Torus>
      </group>

      {/* Outer Gyroscopic Neon Ring 2 */}
      <group ref={ring2Ref}>
        <Torus args={[1.55, 0.025, 16, 100]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={1.2}
            roughness={0.1}
            metalness={0.9}
          />
        </Torus>
      </group>

      {/* Outer Gyroscopic Neon Ring 3 */}
      <group ref={ring3Ref}>
        <Torus args={[1.35, 0.02, 16, 100]} rotation={[-Math.PI / 4, 0, Math.PI / 3]}>
          <meshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={1.2}
            roughness={0.1}
            metalness={0.9}
          />
        </Torus>
      </group>

      {/* Orbiting Sparkles and Floating Tech Badges */}
      <Sparkles count={80} scale={4.5} size={2.5} speed={0.6} color="#38bdf8" />
      <Sparkles count={50} scale={3.5} size={3} speed={0.8} color="#f472b6" />

      {/* 3D Floating Tech Badges in 3D Space */}
      <Floating3DBadge position={[-2.2, 1.3, 0.5]} text="React & Next.js" icon="⚛️" color="#38bdf8" />
      <Floating3DBadge position={[2.2, 1.1, -0.3]} text="Three.js / 3D" icon="🪐" color="#a855f7" />
      <Floating3DBadge position={[-1.9, -1.3, 0.4]} text="Full Stack Dev" icon="⚡" color="#ec4899" />
      <Floating3DBadge position={[2.0, -1.2, -0.5]} text=".NET & Node.js" icon="🚀" color="#10b981" />
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="w-full h-full min-h-[420px] sm:min-h-[480px] lg:min-h-[540px] relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.8} color="#ffffff" />
        <pointLight position={[-4, -4, 3]} intensity={3} color="#ec4899" />
        <pointLight position={[4, 4, 4]} intensity={3.5} color="#06b6d4" />
        <pointLight position={[0, -3, 3]} intensity={2.5} color="#6366f1" />

        <HolographicCore />

        {/* Buttery Smooth Drag & Rotate controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.8}
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
