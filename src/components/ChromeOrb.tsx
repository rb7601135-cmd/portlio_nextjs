"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

export const ChromeOrbMesh: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    // Idle rotation
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.22;
    }

    if (ringRef1.current) {
      ringRef1.current.rotation.x += delta * 0.18;
      ringRef1.current.rotation.z += delta * 0.25;
    }

    if (ringRef2.current) {
      ringRef2.current.rotation.y += delta * 0.28;
      ringRef2.current.rotation.x -= delta * 0.12;
    }

    // Gentle pointer tracking with inertia (lerp)
    if (groupRef.current) {
      const targetRotationY = state.pointer.x * 0.35;
      const targetRotationX = -state.pointer.y * 0.3;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotationY,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotationX,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      <Float
        speed={1.8}
        rotationIntensity={0.4}
        floatIntensity={0.6}
        floatingRange={[-0.15, 0.15]}
      >
        {/* Central Sculptural Metallic Object (Icosahedron with high detail) */}
        <mesh ref={meshRef} castShadow receiveShadow>
          <icosahedronGeometry args={[1.35, 12]} />
          <meshPhysicalMaterial
            color="#e8ecf2"
            metalness={0.96}
            roughness={0.12}
            reflectivity={0.9}
            clearcoat={1.0}
            clearcoatRoughness={0.08}
            envMapIntensity={1.5}
          />
        </mesh>

        {/* Outer Orbiting Slender Metallic Ring 1 */}
        <mesh ref={ringRef1} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1.85, 0.025, 16, 100]} />
          <meshPhysicalMaterial
            color="#ccff00"
            metalness={0.9}
            roughness={0.2}
            emissive="#ccff00"
            emissiveIntensity={0.25}
            clearcoat={0.8}
          />
        </mesh>

        {/* Outer Orbiting Slender Metallic Ring 2 */}
        <mesh ref={ringRef2} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
          <torusGeometry args={[2.1, 0.018, 16, 100]} />
          <meshPhysicalMaterial
            color="#d4dbe8"
            metalness={0.95}
            roughness={0.15}
            clearcoat={0.9}
          />
        </mesh>
      </Float>
    </group>
  );
};
