import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Trail, Float } from '@react-three/drei';
import * as THREE from 'three';

interface AICoreProps {
  scale?: number;
  color?: string;
}

export default function AICore({ scale = 1, color = "#00F5FF" }: AICoreProps) {
  const groupRef = useRef<THREE.Group>(null);
  const outerSphereRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  
  const { viewport, mouse } = useThree();

  const particles = useMemo(() => {
    const count = 300;
    const pts = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      pts[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pts[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pts[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pts;
  }, []);

  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (outerSphereRef.current) {
      outerSphereRef.current.rotation.y -= delta * 0.1;
      outerSphereRef.current.rotation.x -= delta * 0.05;
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
      particlesRef.current.rotation.y += delta * 0.1;
    }

    if (groupRef.current) {
      // Base rotation
      groupRef.current.rotation.y = time * 0.1;
      
      // Mouse reactivity tilt (max ±15 degrees = 0.26 radians)
      const targetRotationX = (mouse.y * 0.26);
      const targetRotationY = (mouse.x * 0.26) + time * 0.1;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.1);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.1);
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      <pointLight color="#00F5FF" intensity={3} distance={20} />

      {/* Outermost wireframe shell */}
      <mesh ref={outerSphereRef}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial
          color="#00F5FF"
          wireframe
          transparent
          opacity={0.05}
        />
      </mesh>

      {/* Second layer */}
      <Sphere args={[1.6, 64, 64]}>
        <MeshDistortMaterial
          color="#00F5FF"
          emissive="#00F5FF"
          emissiveIntensity={0.5}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.15}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>

      {/* Third layer - Inner solid core */}
      <Sphere args={[1.0, 64, 64]}>
        <MeshDistortMaterial
          color="#ffffff"
          emissive="#00F5FF"
          emissiveIntensity={1}
          distort={0.5}
          speed={4}
          transparent
          opacity={0.9}
          roughness={0.1}
          metalness={1}
        />
      </Sphere>

      {/* Orbital Rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.8, 0.008, 16, 100]} />
        <meshBasicMaterial color="#00F5FF" transparent opacity={0.6} />
      </mesh>
      
      <mesh ref={ring2Ref} rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[2.1, 0.008, 16, 100]} />
        <meshBasicMaterial color="#7B61FF" transparent opacity={0.6} />
      </mesh>

      <mesh ref={ring3Ref} rotation={[0, 0, (Math.PI / 3) * 2]}>
        <torusGeometry args={[2.4, 0.008, 16, 100]} />
        <meshBasicMaterial color="#00FFD5" transparent opacity={0.6} />
      </mesh>

      {/* Particle System */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#ffffff"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}