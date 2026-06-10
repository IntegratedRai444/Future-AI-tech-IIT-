import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface AICoreProps {
  scale?: number;
  color?: string;
}

export default function AICore({ scale = 1 }: AICoreProps) {
  const groupRef = useRef<THREE.Group>(null);
  const outerSphereRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const { mouse } = useThree();

  const particles = useMemo(() => {
    const count = 300;
    const pts = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      pts[i * 3]     = radius * Math.sin(phi) * Math.cos(theta);
      pts[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pts[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pts;
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (outerSphereRef.current) {
      outerSphereRef.current.rotation.y -= delta * 0.08;
      outerSphereRef.current.rotation.x -= delta * 0.04;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = time * 0.2;
      ring1Ref.current.rotation.x = Math.PI / 2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -time * 0.3;
      ring2Ref.current.rotation.x = Math.PI / 3;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = time * 0.4;
      ring3Ref.current.rotation.x = Math.PI / 1.5;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.08;
    }
    if (groupRef.current) {
      const targetX = mouse.y * 0.22;
      const targetY = mouse.x * 0.22 + time * 0.08;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.08);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.08);
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      <pointLight color="#ffffff" intensity={1.5} distance={20} />

      {/* Outermost wireframe shell */}
      <mesh ref={outerSphereRef}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.04} />
      </mesh>

      {/* Energy envelope */}
      <Sphere args={[1.6, 64, 64]}>
        <MeshDistortMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.25}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.1}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>

      {/* Inner core */}
      <Sphere args={[1.0, 64, 64]}>
        <MeshDistortMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.7}
          distort={0.5}
          speed={4}
          transparent
          opacity={0.92}
          roughness={0.1}
          metalness={1}
        />
      </Sphere>

      {/* Orbital rings — white / mid-gray / light-gray */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.8, 0.007, 16, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.55} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[2.1, 0.007, 16, 100]} />
        <meshBasicMaterial color="#aaaaaa" transparent opacity={0.45} />
      </mesh>
      <mesh ref={ring3Ref} rotation={[0, 0, (Math.PI / 3) * 2]}>
        <torusGeometry args={[2.4, 0.007, 16, 100]} />
        <meshBasicMaterial color="#666666" transparent opacity={0.35} />
      </mesh>

      {/* Particle cloud */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles, 3]}
            count={particles.length / 3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color="#ffffff"
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
