"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import './LoginModal.css';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="login-overlay" onClick={onClose}>
          <motion.div 
            className="login-modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={onClose}>
              <X size={24} />
            </button>
            
            <div className="login-header">
              <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
              <p>Experience the epitome of luxury fragrances.</p>
            </div>

            <form className="login-form" onSubmit={(e) => {
              e.preventDefault();
              alert(isLogin ? "Demo: Sign in submitted" : "Demo: Account creation submitted");
              onClose();
            }}>
              {!isLogin && (
                <div className="input-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" placeholder="John Doe" />
                </div>
              )}
              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" placeholder="john@example.com" />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="••••••••" />
              </div>
              
              {isLogin && (
                <div className="forgot-password">
                  <a href="#" onClick={(e) => e.preventDefault()}>Forgot password?</a>
                </div>
              )}
              
              <button type="submit" className="login-submit">
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className="login-footer">
              <p>
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button 
                  className="switch-mode-btn"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
