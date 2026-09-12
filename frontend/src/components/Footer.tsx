import Link from 'next/link';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col brand-col">
            <h2>AL-FAKHR</h2>
            <p>The epitome of luxury fragrances and attars. Crafted with passion.</p>
          </div>
          
          <div className="footer-col">
            <h3>Shop</h3>
            <ul>
              <li><Link href="/perfumes">Perfumes</Link></li>
              <li><Link href="/attars">Attars</Link></li>
              <li><Link href="/discovery">Discovery Set</Link></li>
              <li><Link href="/gift-cards">Gift Cards</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h3>About</h3>
            <ul>
              <li><Link href="/story">Our Story</Link></li>
              <li><Link href="/sustainability">Sustainability</Link></li>
              <li><Link href="/stores">Boutiques</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h3>Newsletter</h3>
            <p className="newsletter-text">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        
        <div className="footer-bottom flex justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Al-Fakhr Fragrances. All rights reserved.</p>
          <div className="footer-links">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
