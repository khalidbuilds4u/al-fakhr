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
          style={{ 
            display: 'flex', 
            alignItems: 'stretch', 
            justifyContent: 'center', 
            backgroundColor: 'transparent', 
            border: 'none',
            minHeight: isMobile ? '400px' : 'auto'
          }}
        >
          {isMobile ? (
            /* ULTIMATE FOOLPROOF CLICK CONTAINER */
            <div
              onClick={toggleImage}
              style={{ 
                position: 'relative', 
                width: '100%', 
                minHeight: '400px',
                cursor: 'pointer',
                overflow: 'hidden'
              }}
              role="button"
              aria-label="Toggle perfume image"
            >
              {/* Image 1 (Dehn Al Oudh) */}
              <img 
                src={images[0]} 
                alt="AL-FAKHR Heritage Perfume" 
                style={{ 
                  position: 'absolute', 
                  top: 0, left: 0, 
                  width: '100%', height: '100%', 
                  objectFit: 'cover',
                  opacity: imageIndex === 0 ? 1 : 0, 
                  transition: 'opacity 0.6s ease-in-out',
                  pointerEvents: 'none' /* Images CANNOT steal the click */
                }}
              />

              {/* Image 2 (Tuscan Leather) */}
              <img 
                src={images[1]} 
                alt="AL-FAKHR Heritage Perfume" 
                style={{ 
                  position: 'absolute', 
                  top: 0, left: 0, 
                  width: '100%', height: '100%', 
                  objectFit: 'cover',
                  opacity: imageIndex === 1 ? 1 : 0, 
                  transition: 'opacity 0.6s ease-in-out',
                  pointerEvents: 'none' /* Images CANNOT steal the click */
                }}
              />
              
              {/* Gold shimmer light sweep */}
              <div className="heritage-shimmer" style={{ pointerEvents: 'none' }}></div>
              {/* Vignette overlay */}
              <div className="heritage-vignette" style={{ pointerEvents: 'none' }}></div>
            </div>
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
