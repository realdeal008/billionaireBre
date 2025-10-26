"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { shaderMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// GLSL noise by iq / improved for small shader
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPos;
  uniform float uTime;

  // Simplex noise function (classic) — small footprint
  // Source: adapted from Ashima / iq implementations
  vec3 mod289(vec3 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
  vec2 mod289(vec2 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
  vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}  
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187,
                        0.366025403784439,
                        -0.577350269189626,
                        0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vUv = uv;
    vPos = position;

    // noise-driven displacement
    float n = snoise(vec2(position.x * 0.5 + uTime * 0.08, position.y * 0.7 - uTime * 0.06));
    float wave = n * 0.6;

    // combine with a second slower noise layer for depth
    float n2 = snoise(vec2(position.x * 0.12 - uTime * 0.02, position.y * 0.18 + uTime * 0.01));
    float depth = n2 * 0.9;

    // final displacement
    vec3 newPos = position + normal * (wave + depth) * 0.9;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  varying vec2 vUv;
  varying vec3 vPos;
  uniform float uTime;

  // palette helper
  vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
    return a + b * cos(6.28318 * (c * t + d));
  }

  float rand(vec2 co){ return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453); }

  void main(){
    // base coordinate for color blending
    float y = vUv.y;
    float x = vUv.x;

    // layered noise to control tint
    float n = sin((x + uTime * 0.04) * 6.0) * 0.5 + 0.5;
    float shimmer = pow(max(0.0, 1.0 - distance(vec2(0.5, 0.35), vUv) * 1.4), 2.0);

    // pick base hues (purple -> blue)
    vec3 purple = vec3(106.0/255.0, 13.0/255.0, 173.0/255.0);
    vec3 blue   = vec3(15.0/255.0, 28.0/255.0, 77.0/255.0);
    vec3 lilac  = vec3(182.0/255.0, 127.0/255.0, 255.0/255.0);
    vec3 gold   = vec3(212.0/255.0, 175.0/255.0, 55.0/255.0);

    // gradient mix
    vec3 base = mix(purple, blue, vUv.y + 0.15 * sin(uTime * 0.12 + vUv.x * 2.0));

    // moving streaks
    float streak = smoothstep(0.0, 0.6, fract(vUv.x * 4.0 - uTime * 0.02));
    streak *= pow(max(0.0, 1.0 - abs(vUv.y - 0.35) * 2.2), 1.4);

    // gold highlight mask: thin veins that shimmer
    float vein = smoothstep(0.65, 0.9, sin((vUv.x * 12.0 + vUv.y * 6.0) + uTime * 1.6));
    float goldMask = smoothstep(0.2, 0.95, vein * shimmer);

    // final color: base + lilac soft glow
    vec3 color = base;
    color = mix(color, lilac, 0.18 * pow(n, 1.4));

    // add gold highlights
    color = mix(color, gold * 1.05, goldMask * 0.85);

    // subtle vignette
    float vig = smoothstep(0.9, 0.2, distance(vUv, vec2(0.5,0.5)));
    color *= mix(0.92, 1.02, vig);

    // final output with a touch of gloss
    gl_FragColor = vec4(color, 1.0);
  }
`;

// Create a shader material via drei helper
const FlowMaterial = shaderMaterial(
  { uTime: 0 },
  vertexShader,
  fragmentShader
);

extend({ FlowMaterial });

function FlowPlane({ speed = 1.0 }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) ref.current.uTime = clock.getElapsedTime() * speed;
  });

  // create a high-subdivisions plane for smoother displacement
  return (
    <mesh rotation={[-0.2, 0, 0]} position={[0, -0.4, -2.3]}>
      <planeGeometry args={[12, 7, 256, 256]} />
      {/* @ts-expect-error */}
      <flowMaterial ref={ref} side={THREE.DoubleSide} />
    </mesh>
  );
}

function FloatingParticles({ count = 120 }) {
  const meshRef = useRef();
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        pos: [ (Math.random() - 0.5) * 10, Math.random() * 6 - 1, -1 - Math.random() * 3 ],
        scale: Math.random() * 0.04 + 0.01,
        speed: Math.random() * 0.5 + 0.1
      });
    }
    return temp;
  }, [count]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) {
      const id = i;
      const obj = meshRef.current.children[id];
      const p = particles[i];
      obj.position.x = p.pos[0] + Math.sin(t * p.speed + i) * 0.12;
      obj.position.y = p.pos[1] + Math.cos(t * p.speed * 0.6 + i) * 0.12 + (t * 0.02 % 6);
      obj.position.z = p.pos[2] + Math.sin(t * p.speed * 0.7 + i) * 0.02;
    }
  });

  return (
    <group ref={meshRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.pos}>
          <sphereBufferGeometry args={[p.scale, 10, 10]} />
          <meshStandardMaterial emissive={[0.85,0.7,0.35]} emissiveIntensity={0.9} metalness={0.9} roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

export default function Luxury3DBackground({ className = "", overlayChildren = null }) {
  return (
    <div className={`relative w-full h-screen overflow-hidden ${className}`}>
      {/* Canvas covers full area. Pointer events none to allow interaction on top UI */}
      <Canvas
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        camera={{ position: [0, 0, 5], fov: 40 }}
      >
        <color attach="background" args={[0.03, 0.02, 0.06]} />

        {/* subtle ambient and gold-tinted rim light */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <pointLight position={[-3, 2, 2]} intensity={0.4} color={[0.6,0.5,0.2]} />

        <FlowPlane speed={1.2} />
        <FloatingParticles count={100} />

        {/* optional controls for preview; remove in production */}
        <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
      </Canvas>

      {/* HTML overlay for content: ensures hero copy and CTA stay readable */}
      <div className="relative z-10 pointer-events-auto flex items-center justify-center h-full px-6">
        <div className="max-w-3xl text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#B67FFF] via-[#6A0DAD] to-[#0F1C4D] drop-shadow-[0_8px_30px_rgba(22,11,50,0.45)]">ONYX Salon</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200/85">Where craft meets elegance — precision cuts, luxurious treatments, and an experience bathed in purple, blue, and gold.</p>

          <div className="mt-8 flex gap-4 justify-center">
            <a className="inline-flex items-center px-6 py-3 rounded-2xl border-2 border-gold bg-gradient-to-r from-[#6A0DAD]/30 to-[#0F1C4D]/30 backdrop-blur-md" href="#book">
              <span className="mr-3 text-sm font-semibold text-[#D4AF37]">Book an Appointment</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12h14M13 5l7 7-7 7" stroke="#D4AF37" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>

            <a className="inline-flex items-center px-6 py-3 rounded-2xl border border-transparent bg-[#D4AF37] text-black font-medium shadow-lg" href="#services">Our Services</a>
          </div>
        </div>
      </div>

      {/* subtle gold gloss at top-right */}
      <div className="pointer-events-none absolute top-6 right-6 opacity-60 mix-blend-screen">
        <svg width="140" height="80" viewBox="0 0 140 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.12" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="140" height="80" rx="18" fill="url(#g1)" />
        </svg>
      </div>
    </div>
  );
}
