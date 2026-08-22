"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";

function Dots() {
  const { size, gl } = useThree();
  const geomRef = useRef<THREE.BufferGeometry>(null!);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      // Calculate mouse position relative to the center of the canvas in pixels
      // Three.js Y axis is up, so we invert the Y calculation
      mouse.current.x = e.clientX - rect.left - rect.width / 2;
      mouse.current.y = -(e.clientY - rect.top - rect.height / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [gl]);

  const spacing = 20; // Spacing between dots
  const cols = Math.ceil(size.width / spacing) + 2;
  const rows = Math.ceil(size.height / spacing) + 2;
  const numDots = cols * rows;

  const { originalPositions } = useMemo(() => {
    const orig = new Float32Array(numDots * 3);
    let i = 0;
    // Center the grid
    const startX = -(cols * spacing) / 2;
    const startY = -(rows * spacing) / 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        orig[i * 3] = startX + c * spacing;
        orig[i * 3 + 1] = startY + r * spacing;
        orig[i * 3 + 2] = 0;
        i++;
      }
    }
    return { originalPositions: orig };
  }, [size.width, size.height, cols, rows, numDots, spacing]);

  // Current positions buffer
  const positions = useMemo(() => new Float32Array(originalPositions), [originalPositions]);

  const shader = useMemo(() => ({
    uniforms: {
      uColor: { value: new THREE.Color("#00302E") },
      uOpacity: { value: 0.2 },
    },
    vertexShader: `
      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = 2.5;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uOpacity;
      void main() {
        float d = distance(gl_PointCoord, vec2(0.5, 0.5));
        if (d > 0.5) discard;
        gl_FragColor = vec4(uColor, uOpacity);
      }
    `,
  }), []);

  useFrame(() => {
    if (!geomRef.current) return;

    const mouseX = mouse.current.x;
    const mouseY = mouse.current.y;
    const maxDistance = 120; // Hover radius

    for (let i = 0; i < numDots; i++) {
      const idx = i * 3;
      const ox = originalPositions[idx];
      const oy = originalPositions[idx + 1];

      let curX = positions[idx];
      let curY = positions[idx + 1];

      const dx = ox - mouseX;
      const dy = oy - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let targetX = ox;
      let targetY = oy;

      if (dist < maxDistance) {
        // Push away smoothly
        const pushFactor = Math.pow((maxDistance - dist) / maxDistance, 2);
        const angle = Math.atan2(dy, dx);
        targetX = ox + Math.cos(angle) * pushFactor * 60; // 60px max push
        targetY = oy + Math.sin(angle) * pushFactor * 60;
      }

      // Spring back to target
      curX += (targetX - curX) * 0.15;
      curY += (targetY - curY) * 0.15;

      positions[idx] = curX;
      positions[idx + 1] = curY;
    }
    
    geomRef.current.attributes.position.needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry ref={geomRef} key={positions.length}>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <shaderMaterial
        args={[shader]}
        transparent={true}
        depthWrite={false}
      />
    </points>
  );
}

export function InteractiveGrid() {
  return (
    <div className="z-0 absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        orthographic
        camera={{ position: [0, 0, 100], zoom: 1 }}
      >
        <Dots />
      </Canvas>
    </div>
  );
}
