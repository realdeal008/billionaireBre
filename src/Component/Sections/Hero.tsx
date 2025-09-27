"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    
    <section className="hero">
      {/* Overlay for contrast */}

      {/* Content container */}
      <div className="hero-container">
        {/* Text content */}
        <div className="hero-text">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Billionaire Bre
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
          >
            Luxury Hairstyling for the Bold & Timeless
          </motion.p>

          <motion.button
            className="hero-button"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
          >
            Book Appointment
          </motion.button>
        </div>

        {/* Image content */}
        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
        >
          <Image
            src="/bree.png"
            alt="Luxury Hairstyling"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
}
