"use client";

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import './Testimonials.css';

const testimonials = [
  {
    name: 'Waleed K.',
    quote: "Good perfumes, good quality ingredients used, doesn't feel any harsh synthetic compounds, overall a good experience."
  },
  {
    name: 'Azeem',
    quote: "Just ultra amazing. I am a big fan of Tobacco and oud fragrance. Brilliant perfume. Thank you."
  },
  {
    name: 'Parul J.',
    quote: "I love to wear this fragrance, it's very fresh, fruity and long lasting."
  },
  {
    name: 'Saleem M.',
    quote: "Premium packing and high quality perfumes, really a great brand. Had an amazing experience."
  }
];

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="testimonials-header">
          <h2>Appreciated By</h2>
        </div>
        
        <div className="testimonials-grid">
          {testimonials.map((t, index) => (
            <motion.div 
              key={index} 
              className="testimonial-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--accent-gold)" color="var(--accent-gold)" />
                ))}
              </div>
              <p className="quote">"{t.quote}"</p>
              <p className="author">— {t.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
