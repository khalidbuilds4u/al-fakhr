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
      
      {/* 
        ROBUST GLASS: 
        Instead of 'transmission' which fails on some WebGL implementations (rendering as opaque gray), 
        we use standard transparency with high envMapIntensity and clearcoat. This guarantees it looks like glass everywhere.
      */}
      
      {/* Outer Glass Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.4, 3.0, 1.0]} />
        <meshPhysicalMaterial 
          color="#ffffff"
          metalness={0.1}
          roughness={0.05}
          transparent={true}
          opacity={0.25}       // Low opacity to see the liquid inside
          envMapIntensity={2}  // High reflection of the environment
          clearcoat={1}
          clearcoatRoughness={0.05}
          depthWrite={true}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner Liquid (Perfume) */}
      <mesh position={[0, -0.15, 0]}>
        {/* Slightly smaller than the glass */}
        <boxGeometry args={[2.2, 2.6, 0.8]} />
        <meshPhysicalMaterial 
          color="#dca838"      // Golden amber Chanel N5 liquid
          metalness={0}
          roughness={0.1}
          transparent={true}
          opacity={0.85}       // High opacity so it looks like dense liquid
          depthWrite={false}   // Prevent z-fighting with the outer glass
        />
      </mesh>

      {/* The Iconic Square Label */}
      {/* Placed EXACTLY on the glass surface (depth 1.0 / 2 = 0.5) + tiny offset to prevent z-fighting */}
      <group position={[0, -0.1, 0.501]}>
        <mesh>
          <planeGeometry args={[1.3, 1.3]} />
          <meshStandardMaterial color="#fafafa" roughness={0.9} />
        </mesh>
        
        <Text position={[0, 0.3, 0.001]} color="#000000" fontSize={0.12} anchorX="center" anchorY="middle">
          N° 1
        </Text>
        <Text position={[0, 0.05, 0.001]} color="#000000" fontSize={0.28} fontWeight="bold" letterSpacing={0.1} anchorX="center" anchorY="middle">
          AL-FAKHR
        </Text>
        <Text position={[0, -0.2, 0.001]} color="#000000" fontSize={0.1} letterSpacing={0.1} anchorX="center" anchorY="middle">
          DUBAI
        </Text>
        <Text position={[0, -0.45, 0.001]} color="#000000" fontSize={0.09} letterSpacing={0.05} anchorX="center" anchorY="middle">
          EAU DE PARFUM
        </Text>
      </group>

      {/* Neck (Gold banding) */}
      <mesh position={[0, 1.65, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 0.3, 32]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Upper Neck (White band) */}
      <mesh position={[0, 1.85, 0]}>
        <cylinderGeometry args={[0.28, 0.3, 0.15, 32]} />
        <meshStandardMaterial color="#fafafa" metalness={0} roughness={0.8} />
      </mesh>

      {/* Cap - Wide faceted transparent glass stopper */}
      <mesh position={[0, 2.2, 0]}>
        {/* Adjusted position and height to sit flush on the neck */}
        <cylinderGeometry args={[0.9, 0.8, 0.6, 8]} />
        <meshPhysicalMaterial 
          color="#ffffff"
          metalness={0.1}
          roughness={0.05}
          transparent={true}
          opacity={0.4}
          envMapIntensity={2}
          clearcoat={1}
          clearcoatRoughness={0.05}
          flatShading={true} 
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
