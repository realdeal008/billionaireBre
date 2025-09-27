"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lottie from "lottie-react";
import Image from "next/image";
import morphShapeAnimations from "../morphShapeAnimation.json";

const works = [
  {
    id: 1,
    title: "Braids",
    image:
      "/take-1.png",
    description: "This service includes shampoo & conditioning.",
  },
  {
    id: 2,
    title: "Re-twist & Styles",
    image:
      "/work-2.png",
    description: "This service includes shampoo & conditioning",
  },
  {
    id: 3,
    title: "Re-twist & Stand twist",
    image:
      "/work-1.png",
    description: "This service includes shampoo & conditioning",
  },
  {
    id: 4,
    title: "Loc Ext Stating",
    image: "/take-2.png",
    description: "This service includes shampoo & conditioning"
  }
];


const Gallery: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={sectionRef} className="gallery-section">
    
 
    <div className="gallery-container">
      
      {/* Morphing Luxury Background as overlay */}
        <div className="gallery-overlay">
        <Lottie
          animationData={morphShapeAnimations}
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Section Title */}
      <motion.h2
        className="gallery-title"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        Our Works
      </motion.h2>

      {/* Parallax Gallery Cards */}

    </div>


    <div>
            <div className="gallery-grid">
        {works.map(({ id, title, image, description }, index) => {
          const parallaxY = index === 0 ? y1 : index === 1 ? y2 : index === 3 ? y3 : y1;

          return (
            <motion.div
              key={id}
              className="gallery-card"
              style={{ y: parallaxY }}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.9,
                ease: "easeOut",
                delay: index * 0.2,
              }}
              viewport={{ once: true }}
            >
              <div className="image-wrapper">
                <Image src={image} alt={title} className="gallery-image" width={800} height={600} />
                <div className="overlay">
                  <p className="overlay-text">{description}</p>
                </div>
              </div>
              <h3 className="card-title">{title}</h3>
            </motion.div>
          );
        })}
      </div>
    </div>
    </section>
  );
};

export default Gallery;
