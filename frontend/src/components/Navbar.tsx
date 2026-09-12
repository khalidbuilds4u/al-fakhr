"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, User, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import './Navbar.css';

export default function Navbar() {
  const { toggleCart, cartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <div className="announcement-bar">
        RISK-FREE PURCHASE (NO-QUESTIONS-ASKED RETURNS ON 50 ML & 100 ML)
      </div>
      <header className="navbar">
        <div className="container flex justify-between items-center navbar-inner">
          <div className="nav-brand">
            <Link href="/">
              <h1>AL-FAKHR</h1>
            </Link>
          </div>
          
          <nav className="nav-links">
            <Link href="/shop-all">Shop All</Link>
            <Link href="/collections">Shop by Collection</Link>
            <Link href="/trial-sets">Trial Sets</Link>
            <Link href="/gifts">Gift Sets</Link>
          </nav>
          
          <div className="nav-right flex items-center">
            <button className="icon-btn"><Search size={20} /></button>
            <button className="icon-btn"><User size={20} /></button>
            <button className="icon-btn cart-icon-wrapper" onClick={toggleCart}>
              <ShoppingCart size={20} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
            <button className="icon-btn mobile-menu-btn" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <Link href="/shop-all" onClick={toggleMobileMenu}>Shop All</Link>
          <Link href="/collections" onClick={toggleMobileMenu}>Shop by Collection</Link>
          <Link href="/trial-sets" onClick={toggleMobileMenu}>Trial Sets</Link>
          <Link href="/gifts" onClick={toggleMobileMenu}>Gift Sets</Link>
        </div>
      </header>
    </>
  );
}
