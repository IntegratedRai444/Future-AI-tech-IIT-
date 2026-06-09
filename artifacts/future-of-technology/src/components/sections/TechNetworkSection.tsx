import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const NODES = [
  { id: 'ai', label: 'Artificial Intelligence', color: '#ffffff', radius: 3, angle: 0, speed: 0.2 },
  { id: 'cyber', label: 'Cybersecurity', color: '#cccccc', radius: 4, angle: Math.PI / 3, speed: 0.15 },
  { id: 'robotics', label: 'Robotics', color: '#aaaaaa', radius: 5, angle: (Math.PI / 3) * 2, speed: 0.25 },
  { id: 'space', label: 'Space Tech', color: '#888888', radius: 6, angle: Math.PI, speed: 0.1 },
  { id: 'smart', label: 'Smart Cities', color: '#bbbbbb', radius: 4.5, angle: (Math.PI / 3) * 4, speed: 0.18 },
  { id: 'mobility', label: 'Mobility', color: '#dddddd', radius: 5.5, angle: (Math.PI / 3) * 5, speed: 0.22 },
];

function NetworkGraph() {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef} rotation={[Math.PI / 6, 0, 0]}>
      {/* Center AI Core */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.85} />
      </mesh>

      <pointLight position={[0, 0, 0]} intensity={1.5} color="#ffffff" distance={20} />

      {NODES.map((node) => (
        <NetworkNode
          key={node.id}
          node={node}
          isHovered={hoveredNode === node.id}
          onHover={setHoveredNode}
        />
      ))}
    </group>
  );
}

function NetworkNode({ node, isHovered, onHover }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [angleOffset, setAngleOffset] = useState(0);

  useFrame((state, delta) => {
    setAngleOffset(prev => prev + delta * node.speed);
  });

  const currentAngle = node.angle + angleOffset;
  const x = Math.cos(currentAngle) * node.radius;
  const z = Math.sin(currentAngle) * node.radius;
  const y = Math.sin(currentAngle * 2) * 1.5;

  return (
    <>
      <Line
        points={[[0, 0, 0], [x, y, z]]}
        color={isHovered ? '#ffffff' : '#333333'}
        lineWidth={isHovered ? 2 : 1}
        transparent
        opacity={isHovered ? 0.9 : 0.3}
      />

      <group position={[x, y, z]}>
        <mesh
          ref={meshRef}
          onPointerOver={() => { document.body.style.cursor = 'pointer'; onHover(node.id); }}
          onPointerOut={() => { document.body.style.cursor = 'auto'; onHover(null); }}
        >
          <sphereGeometry args={[isHovered ? 0.4 : 0.3, 16, 16]} />
          <meshBasicMaterial color={node.color} transparent opacity={isHovered ? 1 : 0.65} />
        </mesh>

        {isHovered && (
          <Html position={[0.5, 0.5, 0]} center className="pointer-events-none">
            <div className="bg-black/90 backdrop-blur border border-white/20 px-3 py-1.5 rounded text-sm font-medium whitespace-nowrap text-white shadow-[0_0_12px_rgba(255,255,255,0.15)]">
              {node.label}
            </div>
          </Html>
        )}
      </group>
    </>
  );
}

export default function TechNetworkSection() {
  return (
    <section id="network" className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center py-24">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
          <NetworkGraph />
          <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
        </Canvas>
      </div>

      <div className="container relative z-10 pointer-events-none mt-auto pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
            The Interactive <span className="text-gradient">Technology Network</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A visual map of converging disciplines. Drag to rotate the network. Hover over nodes to analyze specific technological domains orbiting the central AI Core.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
