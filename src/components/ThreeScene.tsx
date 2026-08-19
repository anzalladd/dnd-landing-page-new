"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
// @ts-expect-error missing types for maath
import * as random from "maath/random/dist/maath-random.esm";
import { useState, useRef } from "react";
import { Points as ThreePoints } from "three";

function ParticleField() {
  const ref = useRef<ThreePoints>(null!);
  
  const [sphere] = useState(() => {
    // Generate a sphere of points
    const positions = new Float32Array(3000 * 3);
    return random.inSphere(positions, { radius: 1.5 }) as Float32Array;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00302E"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </group>
  );
}

export function ThreeScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleField />
      </Canvas>
    </div>
  );
}
