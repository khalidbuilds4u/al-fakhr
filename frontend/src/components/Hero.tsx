"use client";

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import './Hero.css';

const slides = [
  {
    id: 0,
    subtitle: "The Masterpiece",
    title: "Dehn Al Oudh",
    desc: "The purest, most commanding agarwood essence ever crafted. A timeless expression of Arabian heritage, meticulously aged and distilled for the modern connoisseur.",
    link: "/collections/oils",
    isVideo: true,
    mediaSrc: "/cleaned_Golden_attar_oil_falling_from_20260912200842.mp4",
    align: "left",
    bgPosition: "center", // The video is naturally right-heavy on desktop
    bgPositionMobile: "85% center" // Force the right side to be visible on mobile
  },
  {
    id: 1,
    subtitle: "The Signature",
    title: "Oud Royal",
    desc: "A breathtaking fusion of French elegance and Arabian mystique. A lingering spray of dark woods and rich amber that commands any room.",
    link: "/collections/perfumes",
    isVideo: true,
    mediaSrc: "/cleaned_Perfume_bottle_spraying_mist_1080p_20260912204130.mp4",
    align: "right",
    bgPosition: "20% center", // Shifts the bottle to the left side of the screen on desktop
    bgPositionMobile: "15% center" // Keep it tight on the left for mobile
  }
];

// Custom Framer Motion Particle System
const ScentParticles = () => {
  const [particles, setParticles] = useState<{ id: number; left: string; delay: number; duration: number; size: number }[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
      size: Math.random() * 4 + 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="scent-particles">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="custom-particle"
          style={{ left: p.left, width: p.size, height: p.size }}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{ 
            y: "-10vh", 
            opacity: [0, 0.8, 0.8, 0],
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50]
          }}
          transition={{ 
            y: { duration: p.duration, repeat: Infinity, ease: "linear", delay: p.delay },
            opacity: { duration: p.duration, repeat: Infinity, ease: "linear", delay: p.delay },
            x: { duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: p.delay }
          }}
        />
      ))}
    </div>
  );
};

// Animation Variants for Luxury Staggered Reveal
const containerVariants: any = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.4 }
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.1, staggerDirection: -1 }
  }
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } }
};

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-cycle slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 8000); // 8 seconds per slide
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-background">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            className="hero-media-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            {slides[activeSlide].isVideo ? (
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="hero-media"
                style={{ 
                  '--bg-pos-desktop': slides[activeSlide].bgPosition,
                  '--bg-pos-mobile': slides[activeSlide].bgPositionMobile
                } as React.CSSProperties}
              >
                <source src={slides[activeSlide].mediaSrc} type="video/mp4" />
              </video>
            ) : (
              <img 
                src={slides[activeSlide].mediaSrc}
                alt={slides[activeSlide].title}
                className="hero-media"
                style={{ 
                  '--bg-pos-desktop': slides[activeSlide].bgPosition,
                  '--bg-pos-mobile': slides[activeSlide].bgPositionMobile
                } as React.CSSProperties}
              />
            )}
          </motion.div>
        </AnimatePresence>
        
        <div className={`hero-overlay align-${slides[activeSlide].align}`}></div>
        <ScentParticles />
      </div>
      
      <div className="container hero-content">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeSlide}
            className={`hero-text-box align-${slides[activeSlide].align}`}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <motion.span variants={itemVariants} className="hero-subtitle">{slides[activeSlide].subtitle}</motion.span>
            <motion.h1 variants={itemVariants} className="hero-title">{slides[activeSlide].title}</motion.h1>
            <motion.p variants={itemVariants} className="hero-desc">{slides[activeSlide].desc}</motion.p>
            <motion.div variants={itemVariants}>
              <Link href={slides[activeSlide].link}>
                <button className="hero-cta">Discover The Scent</button>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      <div className="hero-pagination">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`pagination-dot ${index === activeSlide ? 'active' : ''}`}
            onClick={() => setActiveSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
