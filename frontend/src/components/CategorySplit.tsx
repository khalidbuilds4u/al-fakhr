"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import './CategorySplit.css';

export default function CategorySplit() {
  return (
    <section className="category-split-section">
      <div className="container">
        <div className="category-split-inner">
          <motion.div 
            className="category-box him-box"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="category-overlay"></div>
            <div className="category-content">
              <h2>For Him</h2>
              <Link href="/collections/oils" className="discover-btn">Discover</Link>
            </div>
          </motion.div>
          <motion.div 
            className="category-box her-box"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
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
