import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const NODES = [
  { id: 'ai', label: 'Artificial Intelligence', color: '#00F5FF', radius: 3, angle: 0, speed: 0.2 },
  { id: 'cyber', label: 'Cybersecurity', color: '#FF5500', radius: 4, angle: Math.PI / 3, speed: 0.15 },
  { id: 'robotics', label: 'Robotics', color: '#3B82F6', radius: 5, angle: (Math.PI / 3) * 2, speed: 0.25 },
  { id: 'space', label: 'Space Tech', color: '#4F46E5', radius: 6, angle: Math.PI, speed: 0.1 },
  { id: 'smart', label: 'Smart Cities', color: '#10B981', radius: 4.5, angle: (Math.PI / 3) * 4, speed: 0.18 },
  { id: 'mobility', label: 'Mobility', color: '#FBBF24', radius: 5.5, angle: (Math.PI / 3) * 5, speed: 0.22 },
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
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#00F5FF" transparent opacity={0.85} />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#00F5FF" distance={20} />

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
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const lineRef = useRef<any>(null);
  const angleRef = useRef(node.angle);

  useFrame((state, delta) => {
    angleRef.current += delta * node.speed;
    const a = angleRef.current;
    const x = Math.cos(a) * node.radius;
    const z = Math.sin(a) * node.radius;
    const y = Math.sin(a * 2) * 1.5;

    if (groupRef.current) {
      groupRef.current.position.set(x, y, z);
    }

    if (lineRef.current) {
      const posAttr = lineRef.current.geometry.getAttribute('position') as THREE.BufferAttribute;
      if (!posAttr) {
        const positions = new Float32Array([0, 0, 0, -x, -y, -z]);
        lineRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      } else {
        const array = posAttr.array as Float32Array;
        array[3] = -x;
        array[4] = -y;
        array[5] = -z;
        posAttr.needsUpdate = true;
      }
    }

    if (isHovered && ringRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 5) * 0.2;
      ringRef.current.scale.setScalar(pulse);
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.4 + Math.sin(state.clock.elapsedTime * 5) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Connection line to center — rendered at origin offset */}
      <line ref={lineRef}>
        <bufferGeometry />
        <lineBasicMaterial color={node.color} transparent opacity={isHovered ? 0.6 : 0.15} />
      </line>

      <mesh
        onPointerOver={() => { document.body.style.cursor = 'pointer'; onHover(node.id); }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; onHover(null); }}
      >
        <sphereGeometry args={[isHovered ? 0.4 : 0.3, 16, 16]} />
        <meshBasicMaterial color={node.color} transparent opacity={isHovered ? 1 : 0.65} />
      </mesh>

      {isHovered && (
        <mesh ref={ringRef}>
          <torusGeometry args={[0.55, 0.015, 16, 64]} />
          <meshBasicMaterial color={node.color} transparent opacity={0.5} />
        </mesh>
      )}

      {isHovered && (
        <Html position={[0.6, 0.6, 0]} center className="pointer-events-none">
          <div
            className="bg-black/90 backdrop-blur border px-3 py-1.5 rounded text-sm font-medium whitespace-nowrap text-white"
            style={{ borderColor: node.color, boxShadow: `0 0 12px ${node.color}40` }}
          >
            {node.label}
          </div>
        </Html>
      )}
    </group>
  );
}

function ConnectionLines() {
  const linesGroupRef = useRef<THREE.Group>(null);
  const nodeAngles = useRef(NODES.map(n => n.angle));

  useFrame((state, delta) => {
    NODES.forEach((node, i) => {
      nodeAngles.current[i] += delta * node.speed;
    });
    if (linesGroupRef.current) {
      linesGroupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      linesGroupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return <group ref={linesGroupRef} rotation={[Math.PI / 6, 0, 0]} />;
}

export default function TechNetworkSection() {
  return (
    <section id="network" className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center py-24">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
          <NetworkGraph />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />
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
