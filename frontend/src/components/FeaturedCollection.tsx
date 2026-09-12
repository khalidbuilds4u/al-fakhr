"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import './FeaturedCollection.css';

// The 3D Interactive Card Component
function TiltCard({ product, index, addToCart }: any) {
  const ref = useRef<HTMLDivElement>(null);

  // Motion values to track mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the movement with physics springs
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Map the mouse coordinates to rotation angles (max tilt is 12 degrees)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Calculate mouse position relative to the card's center (from -0.5 to 0.5)
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    // Reset back to center when mouse leaves
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="product-card"
    >
      <motion.div 
        ref={ref}
        className="product-image-wrap"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          perspective: 1000,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <div style={{ transform: "translateZ(30px)", width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}>
            <Image 
              src={product.image} 
              alt={product.name}
              fill
              className="product-img"
            />
            {product.hoverImage && (
              <div className="hover-ad-state">
                <img 
                  src={product.hoverImage}
                  alt={`${product.name} Lifestyle`}
                  className="hover-img-bg"
                />
                <div className="hover-ad-overlay">
                  <span className="hover-ad-type">{product.type}</span>
                  <h4 className="hover-ad-name">{product.name}</h4>
                  <div className="hover-ad-divider"></div>
                  <p className="hover-ad-notes">{product.notes.split(',').join(' | ')}</p>
                </div>
              </div>
            )}
        </div>
      </motion.div>
      <div className="product-info">
          <Link href={`/products/${product.slug}`} style={{textDecoration: 'none', color: 'inherit'}}>
            <h3>{product.name}</h3>
          </Link>
          <p className="product-type">{product.type}</p>
          <p className="product-notes">{product.notes}</p>
          <p className="product-desc-sm">{product.desc}</p>
          <div className="quick-add">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                addToCart({
                  id: product.id,
                  name: product.name,
                  type: product.type,
                  price: product.price,
                  image: product.image
                });
              }}
            >
              ADD TO CART - ${product.price}
            </button>
          </div>
        </div>
      </motion.div>
  );
}

export default function FeaturedCollection() {
  const { addToCart } = useCart();

  return (
    <section className="featured-section">
      <div className="container">
        <div className="section-header">
          <h2>The Heritage Collection</h2>
          <p>Discover the ancient art of perfumery with our purest authentic blends.</p>
        </div>

        <div className="product-grid">
          {products.map((product, index) => (
            <TiltCard 
              key={product.id} 
              product={product} 
              index={index} 
              addToCart={addToCart} 
            />
          ))}
        </div>
        
        <div className="view-all-container">
          <button className="view-all-btn">Discover More</button>
        </div>
      </div>
    </section>
  );
}
