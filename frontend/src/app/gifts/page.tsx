"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Gifts() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="italic-serif" style={{ fontSize: '4rem', color: 'var(--accent-gold)', marginBottom: '1rem' }}>The Gift of Al-Fakhr</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 3rem', lineHeight: '1.6' }}>
          Bespoke gifting experiences featuring hand-engraved crystal flacons and velvet presentation boxes.
        </p>
        <div style={{ padding: '2rem', border: '1px solid var(--accent-gold)', display: 'inline-block' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Available Winter 2026</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Pre-orders open soon for the holiday season.</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input type="email" placeholder="Enter your email" style={{ padding: '1rem', background: 'transparent', border: '1px solid var(--border)', color: '#fff', width: '250px' }} />
            <button style={{ padding: '1rem 2rem', background: 'var(--accent-gold)', border: 'none', color: '#000', textTransform: 'uppercase', fontWeight: 'bold', cursor: 'pointer' }}>Notify Me</button>
          </div>
        </div>
        <div style={{ marginTop: '4rem' }}>
          <Link href="/shop-all" style={{ color: 'var(--foreground)', textDecoration: 'underline', textUnderlineOffset: '4px' }}>Explore the Collection</Link>
        </div>
      </motion.div>
    </div>
  );
}
