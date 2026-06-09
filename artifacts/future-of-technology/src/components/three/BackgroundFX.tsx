import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AmbientParticles({ color, count, speed, reverse = false }: { color: string, count: number, speed: number, reverse?: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      const dir = reverse ? -1 : 1;
      pointsRef.current.rotation.y += delta * speed * dir;
      pointsRef.current.rotation.x += delta * (speed * 0.5) * dir;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function BackgroundFX() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505]">
      {/* Subtle radial vignettes for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--primary)/0.08)_0%,_transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(var(--secondary)/0.06)_0%,_transparent_60%)]"></div>

      <Suspense fallback={null}>
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ alpha: true }}>
          <ambientLight intensity={0.1} />
          <Stars radius={100} depth={50} count={6000} factor={3} saturation={0} fade speed={0.3} />
          <AmbientParticles color="#00F5FF" count={500} speed={0.05} />
          <AmbientParticles color="#7B61FF" count={200} speed={0.03} reverse />
        </Canvas>
      </Suspense>
    </div>
  );
}