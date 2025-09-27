"use client";

import React from "react";
import Lottie from "lottie-react";
import luxuryStreaks from "../luxury-streaks.json";

export default function HeroBackground() {
  return (
    <div className="hero-background">
      <Lottie
        animationData={luxuryStreaks}
        loop
        autoplay
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
