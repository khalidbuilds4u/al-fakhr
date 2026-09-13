"use client";

import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import GlassBottle3D from './GlassBottle3D';
import './BrandStory.css';

export default function BrandStory() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <section className="brand-story-section">
      <div className="brand-story-grid">
        <div 
          className="story-image-wrap"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', border: 'none' }}
        >
          {isMobile ? (
            /* Static image on mobile — saves massive GPU resources */
            <img 
              src="/hover_dehn.jpg" 
              alt="AL-FAKHR Heritage Perfume" 
              className="story-img"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            /* Full WebGL 3D on desktop */
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
