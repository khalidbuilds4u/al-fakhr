"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import './FeaturedCollection.css';

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
            <motion.div 
              key={product.id} 
              className="product-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="product-image-wrap">
                <Link href={`/products/${product.slug}`}>
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
                </Link>
                <div className="quick-add">
                  <button 
                    onClick={() => addToCart({
                      id: product.id,
                      name: product.name,
                      type: product.type,
                      price: product.price,
                      image: product.image
                    })}
                  >
                    ADD TO CART - ${product.price}
                  </button>
                </div>
              </div>
              <div className="product-info">
                <Link href={`/products/${product.slug}`} style={{textDecoration: 'none', color: 'inherit'}}>
                  <h3>{product.name}</h3>
                </Link>
                <p className="product-type">{product.type}</p>
                <p className="product-notes">{product.notes}</p>
                <p className="product-desc-sm">{product.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="view-all-container">
          <button className="view-all-btn">Discover More</button>
        </div>
      </div>
    </section>
  );
}
