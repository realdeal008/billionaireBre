"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

// Vertex Shader (handles motion + displacement)
const vertexShader = `
  varying vec2 vUv;
  uniform float uTime;

  vec3 mod289(vec3 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
  vec2 mod289(vec2 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
  vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187,
                        0.366025403784439,
                        -0.577350269189626,
                        0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0,i1.y,1.0)) + i.x + vec3(0.0,i1.x,1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vUv = uv;
    float n = snoise(vec2(position.x * 0.6 + uTime * 0.05, position.y * 0.8 - uTime * 0.04));
    vec3 newPos = position + normal * n * 0.7;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  }
`;

// Fragment Shader (handles colors and light shimmer)
const fragmentShader = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;

  void main() {
    float shimmer = sin((vUv.x + uTime * 0.4) * 4.0) * 0.5 + 0.5;
    vec3 purple = vec3(106.0/255.0, 13.0/255.0, 173.0/255.0);
    vec3 blue   = vec3(15.0/255.0, 28.0/255.0, 77.0/255.0);
    vec3 gold   = vec3(212.0/255.0, 175.0/255.0, 55.0/255.0);

    vec3 gradient = mix(purple, blue, vUv.y);
    vec3 color = mix(gradient, gold, shimmer * 0.25);
    gl_FragColor = vec4(color, 1.0);
  }
`;

// Create custom shader material
const FlowMaterial = shaderMaterial(
  { uTime: 0 },
  vertexShader,
  fragmentShader
);
extend({ FlowMaterial });

function FlowPlane() {
  const ref = useRef<{ uTime: number }>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.uTime = clock.getElapsedTime();
  });

  return (
    <mesh rotation={[-0.25, 0, 0]} position={[0, 0, -3]}>
      <planeGeometry args={[12, 7, 256, 256]} />
      {/* @ts-expect-error FlowMaterial is extended but TypeScript doesn't recognize it */}
      <flowMaterial ref={ref} side={THREE.DoubleSide} />
    </mesh>
  );
}

// Optional subtle golden particles for ambient luxury
function FloatingParticles({ count = 80 }) {
  const group = useRef<THREE.Group>(null);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        pos: [(Math.random() - 0.5) * 8, Math.random() * 5 - 2.5, -Math.random() * 4] as [number, number, number],
        scale: Math.random() * 0.03 + 0.005,
        speed: Math.random() * 0.4 + 0.1,
      });
    }
    return temp;
  }, [count]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.children.forEach((obj, i) => {
        const p = particles[i];
        obj.position.y = p.pos[1] + Math.sin(t * p.speed + i) * 0.2;
        obj.position.x = p.pos[0] + Math.cos(t * p.speed * 0.8 + i) * 0.1;
      });
    }
  });

  return (
    <group ref={group}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.pos}>
          <sphereGeometry args={[p.scale, 12, 12]} />
          <meshStandardMaterial
            emissive={[0.9, 0.75, 0.3]}
            emissiveIntensity={0.8}
            metalness={1}
            roughness={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function FooterBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
        <color attach="background" args={[0.03, 0.02, 0.06]} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 3, 5]} intensity={0.6} color="#D4AF37" />

        <FlowPlane />
        <FloatingParticles />
      </Canvas>
    </div>
  );
}
