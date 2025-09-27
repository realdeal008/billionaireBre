"use client";

import { useEffect, useRef } from "react";
import Lottie from "lottie-react";

const luxuryParticles = { "v": "5.5.7", "fr": 30, "ip": 0, "op": 60, "w": 500, "h": 500, "nm": "Luxury Particles", "ddd": 0, "assets": [], "layers": [ { "ddd": 0, "ind": 1, "ty": 4, "nm": "Shape Layer 1", "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 0, "k": 0, "ix": 10 }, "p": { "a": 1, "k": [ { "i": { "x": 0.833, "y": 0.833 }, "o": { "x": 0.167, "y": 0.167 }, "t": 0, "s": [250, 250, 0], "to": [0, 0, 0], "ti": [0, 0, 0] }, { "t": 60, "s": [250, 250, 0] } ], "ix": 2 }, "a": { "a": 0, "k": [0, 0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100, 100], "ix": 6 } }, "ao": 0, "shapes": [ { "ty": "gr", "it": [ { "d": 1, "ty": "el", "s": { "a": 0, "k": [10, 10], "ix": 2 }, "p": { "a": 0, "k": [0, 0], "ix": 3 } }, { "ty": "fl", "c": { "a": 0, "k": [0.8, 0.8, 0.8, 1], "ix": 4 }, "o": { "a": 0, "k": 100, "ix": 5 }, "r": 1, "bm": 0, "nm": "Fill 1", "mn": "ADBE Vector Graphic - Fill", "hd": false }, { "ty": "tr", "p": { "a": 0, "k": [0, 0], "ix": 2 }, "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 6 }, "o": { "a": 0, "k": 100, "ix": 7 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "nm": "Transform" } ], "nm": "Ellipse 1", "np": 2, "cix": 2, "bm": 0, "ix": 1, "mn": "ADBE Vector Group", "hd": false } ], "ip": 0, "op": 60, "st": 0, "bm": 0 } ] }; 
const luxuryStreaks = { "v": "5.5.7", "fr": 30, "ip": 0, "op": 60, "w": 500, "h": 500, "nm": "Luxury Streaks", "ddd": 0, "assets": [], "layers": [ { "ddd": 0, "ind": 1, "ty": 4, "nm": "Shape Layer 1", "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 0, "k": 0, "ix": 10 }, "p": { "a": 1, "k": [ { "i": { "x": 0.833, "y": 0.833 }, "o": { "x": 0.167, "y": 0.167 }, "t": 0, "s": [250, 250, 0], "to": [0, 0, 0], "ti": [0, 0, 0] }, { "t": 60, "s": [250, 250, 0] } ], "ix": 2 }, "a": { "a": 0, "k": [0, 0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100, 100], "ix": 6 } }, "ao": 0, "shapes": [ { "ty": "gr", "it": [ { "d": 1, "ty": "rc", "s": { "a": 0, "k": [20, 100], "ix": 2 }, "p": { "a": 0, "k": [0, 0], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 4 } }, { "ty": "fl", "c": { "a": 0, "k": [0.9, 0.8, 0.6, 1], "ix": 4 }, "o": { "a": 0, "k": 100, "ix": 5 }, "r": 1, "bm": 0, "nm": "Fill 1", "mn": "ADBE Vector Graphic - Fill", "hd": false }, { "ty": "tr", "p": { "a": 0, "k": [0, 0], "ix": 2 }, "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 6 }, "o": { "a": 0, "k": 100, "ix": 7 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "nm": "Transform" } ], "nm": "Rectangle 1", "np": 2, "cix": 2, "bm": 0, "ix": 1, "mn": "ADBE Vector Group", "hd": false } ], "ip": 0, "op": 60, "st": 0, "bm": 0 } ] };

export default function BackgroundAnimation() {
  const svgRef = useRef<SVGPathElement>(null);

  // SVG morph animation
  useEffect(() => {
    const paths = [
      "M0,300 Q150,200 300,300 T600,300 T900,300 T1200,300 V600 H0 Z",
      "M0,280 Q200,180 400,280 T800,280 T1200,280 V600 H0 Z",
      "M0,320 Q100,220 300,320 T600,320 T900,320 T1200,320 V600 H0 Z",
    ];
    let i = 0;
    const animate = () => {
      if (svgRef.current) {
        svgRef.current.setAttribute("d", paths[i]);
      }
      i = (i + 1) % paths.length;
    };
    const interval = setInterval(animate, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden top-0 left-0 w-full h-[300vh] -z-20">
      {/* Gradient Flow */}
      <div className="absolute inset-0 animate-gradient-flow -z-30" />

      {/* Lottie animations */}
      <div className="absolute inset-0 -z-10 opacity-70">
        <Lottie animationData={luxuryParticles} loop={true} style={{ width: "100%", height: "100%" }} />
      </div>
      <div className="absolute inset-0 -z-10 opacity-40">
        <Lottie animationData={luxuryStreaks} loop={true} style={{ width: "100%", height: "100%" }} />
      </div>

      {/* Morphing SVG wave */}
      <svg
        className="absolute bottom-0 left-0 w-full h-64 -z-10"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
      >
        <path
          ref={svgRef}
          fill="url(#luxuryGradient)"
          d="M0,300 Q150,200 300,300 T600,300 T900,300 T1200,300 V600 H0 Z"
        />
        <defs>
          <linearGradient id="luxuryGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B0000" />
            <stop offset="50%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#c0c0c0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Glass overlay */}
      <div className="absolute inset-0  backdrop-blur-sm -z-5"></div>
    </div>
  );
}
