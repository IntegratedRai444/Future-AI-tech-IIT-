import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AmbientParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const count = 600;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 60;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
  }

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.04;
      pointsRef.current.rotation.x -= delta * 0.015;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.04}
        sizeAttenuation
        depthWrite={false}
        opacity={0.22}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function BackgroundFX() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.03)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,255,255,0.02)_0%,_transparent_60%)]" />
      <Suspense fallback={null}>
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ alpha: true }}>
          <ambientLight intensity={0.08} />
          <Stars radius={100} depth={50} count={7000} factor={3} saturation={0} fade speed={0.3} />
          <AmbientParticles />
        </Canvas>
      </Suspense>
    </div>
  );
}
