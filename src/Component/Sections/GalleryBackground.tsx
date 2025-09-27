"use client";

import React from "react";
import Lottie from "lottie-react";
import morphShapeAnimation from "../morphShapeAnimation.json";

export default function GalleryBackground() {
  return (
    <div className="gallery-background">
      <Lottie
        animationData={morphShapeAnimation}
        loop
        autoplay
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
