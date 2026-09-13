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
      <mesh position={[0, -0.15, 0]}>
        {/* Slightly smaller than the glass, positioned slightly lower to simulate not being completely full */}
        <boxGeometry args={[2.3, 2.7, 0.8]} />
        <meshPhysicalMaterial 
          color="#dca838" // Golden amber / Chanel N5 liquid color
          metalness={0}
          roughness={0.1}
          transparent={true}
          opacity={0.9}
          depthWrite={false}
        />
      </mesh>

      {/* Outer Thick Glass Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.6, 3.1, 1.1]} />
        <meshPhysicalMaterial 
          color="#ffffff"
          metalness={0}
          roughness={0.05}
          transmission={1}
          ior={1.52}
          thickness={1.5}
          clearcoat={1}
          clearcoatRoughness={0.05}
          transparent={true}
          opacity={1}
        />
      </mesh>

      {/* The Iconic Square Label */}
      <group position={[0, -0.1, 0.56]}>
        {/* Label Background */}
        <mesh>
          <planeGeometry args={[1.4, 1.4]} />
          <meshStandardMaterial color="#ebebeb" roughness={0.8} />
        </mesh>
        
        {/* Branding on Label */}
        <Text 
          position={[0, 0.3, 0.01]} 
          color="#000000" 
          fontSize={0.12} 
          anchorX="center" 
          anchorY="middle"
        >
          N° 1
        </Text>
        <Text 
          position={[0, 0.05, 0.01]} 
          color="#000000" 
          fontSize={0.28} 
          fontWeight="bold"
          letterSpacing={0.1}
          anchorX="center" 
          anchorY="middle"
        >
          AL-FAKHR
        </Text>
        <Text 
          position={[0, -0.2, 0.01]} 
          color="#000000" 
          fontSize={0.1} 
          letterSpacing={0.1}
          anchorX="center" 
          anchorY="middle"
        >
          DUBAI
        </Text>
        <Text 
          position={[0, -0.45, 0.01]} 
          color="#000000" 
          fontSize={0.09} 
          letterSpacing={0.05}
          anchorX="center" 
          anchorY="middle"
        >
          EAU DE PARFUM
        </Text>
      </group>

      {/* Neck (Gold banding) */}
      <mesh position={[0, 1.7, 0]}>
        <cylinderGeometry args={[0.35, 0.45, 0.3, 32]} />
        <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.2} />
      </mesh>
      
      {/* Upper Neck (White band like Chanel) */}
      <mesh position={[0, 1.9, 0]}>
        <cylinderGeometry args={[0.33, 0.33, 0.15, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={0} roughness={0.5} />
      </mesh>

      {/* Cap - Wide faceted transparent glass stopper */}
      <mesh position={[0, 2.35, 0]}>
        {/* An octagonal flat box simulates the Chanel stopper perfectly */}
        <cylinderGeometry args={[1.0, 0.9, 0.6, 8]} />
        <meshPhysicalMaterial 
          color="#ffffff"
          metalness={0}
          roughness={0.05}
          transmission={1}
          ior={1.52}
          thickness={1.5}
          clearcoat={1}
          clearcoatRoughness={0.05}
          transparent={true}
          opacity={1}
          flatShading={true} // Emphasizes the facets
        />
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
