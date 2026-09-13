"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, Float, Text, RoundedBox, MeshTransmissionMaterial, ContactShadows } from '@react-three/drei';
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
        {/* Using RoundedBox to match the outer glass shape, slightly smaller */}
        <RoundedBox args={[2.2, 2.6, 0.8]} radius={0.08} smoothness={4}>
          <meshPhysicalMaterial 
            color="#dca838"      // Golden amber Chanel N5 liquid
            metalness={0}
            roughness={0.1}
            transparent={true}
            opacity={0.85}       // Dense liquid
            depthWrite={false}   // Prevent z-fighting with the outer glass
          />
        </RoundedBox>
      </mesh>

      {/* Outer Thick Glass Body (Photorealistic) */}
      <mesh position={[0, 0, 0]}>
        <RoundedBox args={[2.6, 3.1, 1.1]} radius={0.15} smoothness={8}>
          {/* Advanced Physical Transmission Shader */}
          <MeshTransmissionMaterial 
            backside={true}
            samples={4}
            thickness={1.5}
            chromaticAberration={0.025}
            anisotropy={0.1}
            distortion={0}
            distortionScale={0}
            temporalDistortion={0}
            ior={1.52}
            color="#ffffff"
            roughness={0.05}
            clearcoat={1}
          />
        </RoundedBox>
      </mesh>

      {/* The Iconic Square Label */}
      <group position={[0, -0.1, 0.551]}>
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
        <cylinderGeometry args={[0.9, 0.8, 0.6, 8]} />
        <MeshTransmissionMaterial 
            backside={true}
            samples={4}
            thickness={1.5}
            chromaticAberration={0.05}
            ior={1.52}
            color="#ffffff"
            roughness={0.05}
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

          {/* Ground shadow to add weight and realism */}
          <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={2} far={4} />

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
