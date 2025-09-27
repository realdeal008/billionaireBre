"use client";

import React from "react";
import Lottie from "lottie-react";
import morphShapeAnimation from "../Component/morphShapeAnimation.json";
import styles from "./BackgroundAnimation.module.scss";

export default function BackgroundAnimation() {
  return (
    <div className={styles.backgroundAnimation}>
      <Lottie
        animationData={morphShapeAnimation}
        loop
        autoplay
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
