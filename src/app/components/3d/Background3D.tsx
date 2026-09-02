'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function InteractiveParticleWave() {
  const pointsRef = useRef<THREE.Points>(null!);
  const countX = 45;
  const countY = 45;
  const numParticles = countX * countY;

  const [positions, initialPositions, colors] = useMemo(() => {
    const pos = new Float32Array(numParticles * 3);
    const initPos = new Float32Array(numParticles * 3);
    const cols = new Float32Array(numParticles * 3);

    const c1 = new THREE.Color('#4f46e5'); // Indigo
    const c2 = new THREE.Color('#06b6d4'); // Cyan
    const c3 = new THREE.Color('#d946ef'); // Magenta

    let i = 0;
    const separation = 0.9;
    const offsetX = (countX * separation) / 2;
    const offsetY = (countY * separation) / 2;

    for (let ix = 0; ix < countX; ix++) {
      for (let iy = 0; iy < countY; iy++) {
        const x = ix * separation - offsetX;
        const y = -6; // Position plane below view angled up
        const z = iy * separation - offsetY;

        pos[i * 3] = x;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = z;

        initPos[i * 3] = x;
        initPos[i * 3 + 1] = y;
        initPos[i * 3 + 2] = z;

        // Gradient color along diagonal
        const factor = (ix + iy) / (countX + countY);
        const col = factor < 0.5 
          ? c1.clone().lerp(c2, factor * 2) 
          : c2.clone().lerp(c3, (factor - 0.5) * 2);

        cols[i * 3] = col.r;
        cols[i * 3 + 1] = col.g;
        cols[i * 3 + 2] = col.b;

        i++;
      }
    }
    return [pos, initPos, cols];
  }, [numParticles]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime() * 1.5;
    const positionAttr = pointsRef.current.geometry.attributes.position;
    const currentPos = positionAttr.array as Float32Array;

    const mouseX = state.pointer.x * 5;
    const mouseY = state.pointer.y * 5;

    let i = 0;
    for (let ix = 0; ix < countX; ix++) {
      for (let iy = 0; iy < countY; iy++) {
        const initX = initialPositions[i * 3];
        const initZ = initialPositions[i * 3 + 2];

        // Complex multi-wave sine calculations for realistic ocean fluid motion
        const wave1 = Math.sin(ix * 0.25 + time) * 0.7;
        const wave2 = Math.cos(iy * 0.25 + time * 0.8) * 0.7;
        const wave3 = Math.sin((ix + iy) * 0.15 + time * 1.2) * 0.5;

        // Interactive mouse disturbance
        const distToMouse = Math.sqrt((initX - mouseX) ** 2 + (initZ - mouseY) ** 2);
        const mouseEffect = Math.max(0, (6 - distToMouse) * 0.35);

        currentPos[i * 3 + 1] = initialPositions[i * 3 + 1] + wave1 + wave2 + wave3 + mouseEffect;
        i++;
      }
    }

    positionAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} rotation={[-Math.PI / 5, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.075}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Floating3DConstellations({ count = 100 }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#818cf8'),
      new THREE.Color('#38bdf8'),
      new THREE.Color('#f472b6'),
      new THREE.Color('#ffffff'),
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25 + 4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const chosen = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = chosen.r;
      col[i * 3 + 1] = chosen.g;
      col[i * 3 + 2] = chosen.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60 dark:opacity-80">
      <Canvas
        camera={{ position: [0, 4, 18], fov: 55 }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1.5]}
      >
        <InteractiveParticleWave />
        <Floating3DConstellations count={120} />
      </Canvas>
    </div>
  );
}
