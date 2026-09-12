"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import './MasterPerfumers.css';

const perfumers = [
  {
    name: 'Tariq Saeed',
    description: 'Global celebrity perfumer. The nose behind signature fragrances for the most exclusive Middle Eastern houses.',
    image: '/perfumer_1.jpg'
  },
  {
    name: 'Abdul Samad',
    description: 'A third-generation perfumer born into the region\'s most storied fragrance dynasty.',
    image: '/perfumer_2.jpg'
  },
  {
    name: 'Hassan Al-Amri',
    description: 'A Master Perfumer with over fifty years of expertise shaping the world\'s most revered attars.',
    image: '/perfumer_3.jpg'
  }
];

export default function MasterPerfumers() {
  return (
    <section className="perfumers-section">
      <div className="container">
        <div className="perfumers-header">
          <h2>The Noses Behind <span className="italic-serif">Al-Fakhr</span></h2>
          <p>Crafted by the world's most renowned master perfumers.</p>
        </div>
        
        <div className="perfumers-grid">
          {perfumers.map((perfumer, index) => (
            <motion.div 
              key={index} 
              className="perfumer-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="perfumer-avatar-placeholder">
                <Image 
                  src={perfumer.image} 
                  alt={perfumer.name} 
                  fill 
                  className="perfumer-img"
                />
              </div>
              <h3>{perfumer.name}</h3>
              <p>{perfumer.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
