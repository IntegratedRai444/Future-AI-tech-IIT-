import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Create a custom particle system for ambient floating dust
function AmbientParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Create 500 random positions
  const count = 500;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
  }

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.05;
      pointsRef.current.rotation.x -= delta * 0.02;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00F5FF"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function BackgroundFX() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#020617]">
      {/* CSS subtle animated nebula background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-[#020617] to-[#020617] opacity-50 mix-blend-screen animate-pulse duration-[10s]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-secondary/10 via-transparent to-transparent opacity-30 mix-blend-screen"></div>
      
      <Suspense fallback={null}>
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ alpha: true }}>
          <ambientLight intensity={0.2} />
          {/* Dense, distant starfield */}
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />
          
          {/* Slowly moving glowing ambient particles */}
          <AmbientParticles />
        </Canvas>
      </Suspense>
    </div>
  );
}
