"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import './Collections.css';

export default function Collections() {
  return (
    <div className="collections-page">
      <div className="collections-header">
        <h1>Our Collections</h1>
        <p>Two distinct expressions of olfactory perfection.</p>
      </div>

      <div className="collections-split">
        <motion.div 
          className="collection-panel attar-panel"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="panel-content">
            <h2 className="italic-serif">Heritage Oils</h2>
            <p>Ancient, alcohol-free pure perfume oils distilled in traditional copper degs over sandalwood.</p>
            <Link href="/collections/oils" className="collection-btn">Explore Oils</Link>
          </div>
          <div className="panel-overlay"></div>
          <Image src="/attar_generic.jpg" alt="Attar Collection" fill className="panel-img" />
        </motion.div>

        <motion.div 
          className="collection-panel extrait-panel"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="panel-content">
            <h2 className="italic-serif">Luxury Perfumes</h2>
            <p>High-concentration, room-filling alcohol-based sprays designed for absolute modern luxury.</p>
            <Link href="/collections/perfumes" className="collection-btn">Explore Perfumes</Link>
          </div>
          <div className="panel-overlay"></div>
          <Image src="/perfume_generic.jpg" alt="Extrait Collection" fill className="panel-img" />
        </motion.div>
      </div>
    </div>
  );
}
