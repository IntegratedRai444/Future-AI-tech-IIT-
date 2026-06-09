import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Trail } from '@react-three/drei';
import * as THREE from 'three';

interface AICoreProps {
  scale?: number;
  color?: string;
  distort?: number;
  speed?: number;
}

export default function AICore({
  scale = 1,
  color = "#ffffff",
  distort = 0.4,
  speed = 2
}: AICoreProps) {
  const coreRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<any>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.2;
      coreRef.current.rotation.z = time * 0.1;
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1;
      groupRef.current.position.y = Math.sin(time) * 0.1;
    }

    if (materialRef.current) {
      materialRef.current.emissiveIntensity = 0.8 + Math.sin(time * 3) * 0.3;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Outer energy field */}
      <mesh scale={1.2}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.06}
          wireframe
        />
      </mesh>

      {/* Inner distorting core */}
      <Trail
        width={0.15}
        color="#cccccc"
        length={1}
        decay={1}
        local={false}
        stride={0}
        interval={1}
      >
        <Sphere ref={coreRef} args={[0.8, 64, 64]}>
          <MeshDistortMaterial
            ref={materialRef}
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.8}
            distort={distort}
            speed={speed}
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.92}
          />
        </Sphere>
      </Trail>

      {/* Orbiting particles — white / light-gray / mid-gray */}
      <OrbitingParticles color="#ffffff" count={20} radius={1.5} speed={0.5} />
      <OrbitingParticles color="#aaaaaa" count={15} radius={2} speed={-0.3} axis="x" />
      <OrbitingParticles color="#666666" count={10} radius={2.5} speed={0.4} axis="z" />
    </group>
  );
}

function OrbitingParticles({ count, radius, speed, color, axis = 'y' }: any) {
  const groupRef = useRef<THREE.Group>(null);

  const particles = Array.from({ length: count }).map((_, i) => {
    const angle = (i / count) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    return { position: [x, 0, z] as [number, number, number] };
  });

  useFrame((state) => {
    if (groupRef.current) {
      const rotation = state.clock.getElapsedTime() * speed;
      if (axis === 'y') groupRef.current.rotation.y = rotation;
      if (axis === 'x') groupRef.current.rotation.x = rotation;
      if (axis === 'z') groupRef.current.rotation.z = rotation;
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.position}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
}
