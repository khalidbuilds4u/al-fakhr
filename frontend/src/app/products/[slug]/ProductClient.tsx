"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { Product } from '@/data/products';
import { Minus, Plus } from 'lucide-react';

export default function ProductClient({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    setIsAdding(true);
    // Add multiple quantities
    for(let i=0; i<quantity; i++) {
        addToCart({
            id: product.id,
            name: product.name,
            type: product.type,
            price: product.price,
            image: product.image
        });
    }
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div className="pdp-actions">
      <div className="pdp-quantity-selector">
        <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={16} /></button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity(quantity + 1)}><Plus size={16} /></button>
      </div>

      <motion.button 
        className="pdp-add-btn"
        whileTap={{ scale: 0.98 }}
        onClick={handleAdd}
      >
        {isAdding ? 'ADDING...' : `ADD TO CART - $${product.price * quantity}`}
      </motion.button>
    </div>
  );
}
