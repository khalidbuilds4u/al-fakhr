"use client";

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import './CategorySplit.css';

export default function CategorySplit() {
  const containerRef = useRef(null);
  
  // Track scroll position relative to this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress (0 to 1) into a vertical translation (-20% to 20%)
  const yPos = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section className="category-split-section" ref={containerRef}>
      <div className="container">
        <div className="category-split-inner">
          <motion.div 
            className="category-box"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div className="parallax-bg him-bg" style={{ y: yPos }} />
            <div className="category-overlay"></div>
            <div className="category-content">
              <h2>For Him</h2>
              <Link href="/collections/oils" className="discover-btn">Discover</Link>
            </div>
          </motion.div>
          <motion.div 
            className="category-box"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div className="parallax-bg her-bg" style={{ y: yPos }} />
            <div className="category-overlay"></div>
            <div className="category-content">
              <h2>For Her</h2>
              <Link href="/collections/perfumes" className="discover-btn">Discover</Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
