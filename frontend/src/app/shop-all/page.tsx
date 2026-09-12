"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import './ShopAll.css';

export default function ShopAll() {
  const { addToCart } = useCart();

  return (
    <div className="shop-page">
      <div className="shop-header">
        <h1>Shop All</h1>
        <p>Explore the complete Al-Fakhr master collection.</p>
      </div>

      <div className="container">
        <div className="shop-grid">
          {products.map((product, index) => (
            <motion.div 
              key={product.id} 
              className="shop-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="shop-image-wrap">
                <Link href={`/products/${product.slug}`}>
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    fill
                    className="shop-img"
                  />
                </Link>
                <div className="shop-quick-add">
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
              <div className="shop-info">
                <Link href={`/products/${product.slug}`} style={{textDecoration: 'none', color: 'inherit'}}>
                  <h3>{product.name}</h3>
                </Link>
                <p className="shop-type">{product.type}</p>
                <p className="shop-notes">{product.notes}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
