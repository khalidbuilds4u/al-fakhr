"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import './BrandStory.css';

export default function BrandStory() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Parallax effect on the image
  const yImage = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section className="brand-story-section" ref={ref}>
      <div className="brand-story-grid">
        <div className="story-image-wrap">
          <motion.div 
            style={{ y: yImage, width: '100%', height: '115%', position: 'absolute', top: '-7.5%' }}
          >
            <img
              src="/dehn_al_oudh.jpg"
              alt="Oud and incense"
              className="story-img"
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
