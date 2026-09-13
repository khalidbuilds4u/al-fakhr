"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, Float, Text } from '@react-three/drei';
import React, { useRef } from 'react';
import * as THREE from 'three';

function BottleMesh() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Inner Liquid (Perfume) */}
      <mesh position={[0, -0.1, 0]}>
        {/* Slightly smaller than the glass, positioned slightly lower to simulate not being completely full */}
        <boxGeometry args={[2.0, 2.7, 1.0]} />
        <meshPhysicalMaterial 
          color="#8c4a16" // Rich amber / oudh color
          metalness={0.1}
          roughness={0.2}
          transmission={0.4}
          opacity={1}
          transparent
        />
      </mesh>

      {/* Outer Thick Glass Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.2, 3, 1.2]} />
        <meshPhysicalMaterial 
          color="#ffffff"
          metalness={0.1}
          roughness={0.05}
          transmission={1} // Full glass transmission
          ior={1.5}        // Index of refraction for glass
          thickness={0.5}  // Volume thickness
          clearcoat={1}
          clearcoatRoughness={0.05}
          transparent={true}
          opacity={1}
        />
      </mesh>

      {/* Gold Label Branding */}
      <group position={[0, 0.2, 0.61]}>
        {/* Main Logo */}
        <Text 
          position={[0, 0, 0]} 
          color="#d4af37" 
          fontSize={0.35} 
          anchorX="center" 
          anchorY="middle"
        >
          AL-FAKHR
        </Text>
        {/* Subtitle */}
        <Text 
          position={[0, -0.4, 0]} 
          color="#d4af37" 
          fontSize={0.12} 
          letterSpacing={0.25}
          anchorX="center" 
          anchorY="middle"
        >
          EXTRAIT DE PARFUM
        </Text>
        {/* Ornate Divider */}
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[0.8, 0.01, 0.01]} />
          <meshBasicMaterial color="#d4af37" />
        </mesh>
      </group>

      {/* Gold Neck */}
      <mesh position={[0, 1.75, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 0.5, 32]} />
        <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.1} />
      </mesh>

      {/* Crystal Cut Gold Cap */}
      <mesh position={[0, 2.5, 0]}>
        <icosahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.15} flatShading />
      </mesh>
    </group>
  );
}

export default function GlassBottle3D() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '600px', cursor: 'grab', touchAction: 'pan-y' }}>
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }} 
        dpr={[1, 1.5]} 
        gl={{ powerPreference: "high-performance", antialias: false }}
        style={{ touchAction: 'pan-y' }}
      >
        <React.Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={1.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
            <BottleMesh />
          </Float>

          <Environment preset="city" />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={true}
            autoRotate 
            autoRotateSpeed={0.5}
            touches={{ ONE: 0, TWO: 0 } as any} // Disable touch drag — allows page scroll on mobile
          />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
