"use client";

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import GlassBottle3D from './GlassBottle3D';
import './BrandStory.css';

export default function BrandStory() {
  const [isMobile, setIsMobile] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  
  const images = [
    "/hover_dehn.jpg",
    "/hover_tuscan.jpg"
  ];

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const toggleImage = () => {
    setImageIndex((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <section className="brand-story-section">
      <div className="brand-story-grid">
        <div 
          className="story-image-wrap"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', border: 'none' }}
        >
          {isMobile ? (
            /* Animated image presentation on mobile — lightweight but cinematic */
            <motion.div
              className="mobile-heritage-visual"
              initial={{ opacity: 0, scale: 1.15 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1] }}
              style={{ position: 'relative' }}
            >
              {/* Invisible clickable overlay to capture all taps reliably */}
              <div 
                onClick={toggleImage} 
                style={{ position: 'absolute', inset: 0, zIndex: 10, cursor: 'pointer' }}
                aria-label="Toggle Image"
                role="button"
              />
              
              <AnimatePresence mode="wait">
                <motion.img 
                  key={imageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  src={images[imageIndex]} 
                  alt="AL-FAKHR Heritage Perfume" 
                  className="heritage-animated-img"
                  style={{ position: 'absolute', top: 0, left: 0 }}
                />
              </AnimatePresence>
              
              {/* Gold shimmer light sweep */}
              <div className="heritage-shimmer"></div>
              {/* Vignette overlay */}
              <div className="heritage-vignette"></div>
            </motion.div>
          ) : (
            <GlassBottle3D />
          )}
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
