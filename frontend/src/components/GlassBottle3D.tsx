"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, Float, MeshTransmissionMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function BottleMesh() {
  const groupRef = useRef<THREE.Group>(null);

  // Slowly rotate the entire bottle group for a premium display effect
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Heavy Glass Body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 3, 1.2]} />
        <MeshTransmissionMaterial 
          backside
          thickness={2.5}
          roughness={0.05}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.08}
          anisotropy={0.2}
          color="#e6f2ed"
        />
      </mesh>

      {/* Internal Liquid / Core (simulated with a smaller inner box) */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[1.7, 2.2, 0.8]} />
        <meshPhysicalMaterial 
          color="#d4af37" // Golden amber liquid
          transmission={0.5}
          opacity={0.8}
          transparent
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>

      {/* Gold Neck */}
      <mesh position={[0, 1.75, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.4, 0.5, 32]} />
        <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.1} />
      </mesh>

      {/* Crystal Cut Gold Cap */}
      <mesh position={[0, 2.5, 0]} castShadow>
        <icosahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.15} flatShading />
      </mesh>
    </group>
  );
}

export default function GlassBottle3D() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '600px', cursor: 'grab' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={1.5} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {/* Floating animation for a magical, weightless feel */}
        <Float speed={2.5} rotationIntensity={0.2} floatIntensity={1.5}>
          <BottleMesh />
        </Float>

        {/* Studio environment reflections for the glass and gold to look realistic */}
        <Environment preset="city" />
        
        {/* Allow the user to drag and rotate the scene in 3D */}
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
