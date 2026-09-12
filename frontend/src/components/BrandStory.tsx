"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';
import React from 'react';
import './BrandStory.css';

export default function BrandStory() {
  const ref = useRef(null);
  
  // Parallax scrolling
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const yImage = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="brand-story-section" ref={ref}>
      <div className="brand-story-grid">
        <div 
          className="story-image-wrap"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: 1500 }}
        >
          <motion.div 
            style={{ 
              y: yImage, 
              width: '100%', 
              height: '115%', 
              position: 'absolute', 
              top: '-7.5%',
              rotateX,
              rotateY,
              transformStyle: "preserve-3d"
            }}
          >
            <img
              src="/hover_dehn.jpg"
              alt="Oud and incense"
              className="story-img"
              style={{ transform: "translateZ(40px)", transition: "transform 0.1s" }}
            />
          </motion.div>
          <div className="story-image-overlay"></div>
        </div>
        
        <div className="story-content">
          <motion.div
            className="story-content-inner"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          >
            <span className="story-subtitle">Our Heritage</span>
            <h2 className="story-title">A Legacy of <br/><span className="italic-serif">Craftsmanship</span></h2>
            
            <div className="story-divider"></div>

            <p className="story-desc">
              For generations, our master perfumers have traveled the world sourcing the finest, rarest ingredients. From the deep, resinous oud of the East to the delicate rose petals of Grasse, every bottle of Al-Fakhr holds a journey.
            </p>
            <p className="story-desc">
              We believe in the slow art of perfumery. We utilize ancient copper degs and traditional sandalwood distillation—no shortcuts, just pure dedication to creating scents that resonate with the soul.
            </p>
            
            <button className="story-btn">Discover The Process</button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
