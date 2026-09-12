import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProductBySlug } from '@/data/products';
import ProductClient from './ProductClient';
import './ProductDetails.css';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="pdp-container">
      <div className="pdp-grid">
        <div className="pdp-image-section">
          <div className="pdp-image-sticky">
            <Image 
              src={product.image} 
              alt={product.name}
              fill
              className="pdp-main-image"
              priority
            />
          </div>
        </div>

        <div className="pdp-details-section">
          <div className="pdp-header">
            <p className="pdp-type">{product.type}</p>
            <h1 className="pdp-title">{product.name}</h1>
            <p className="pdp-price">${product.price}</p>
          </div>

          <div className="pdp-description">
            <p>{product.longDesc}</p>
          </div>

          <ProductClient product={product} />

          <div className="pdp-accordion">
            <div className="accordion-item">
              <h3>Olfactory Pyramid</h3>
              <div className="pyramid-content">
                <div className="pyramid-tier">
                  <span className="tier-label">Top Notes</span>
                  <span className="tier-value">{product.olfactoryPyramid.top}</span>
                </div>
                <div className="pyramid-tier">
                  <span className="tier-label">Heart Notes</span>
                  <span className="tier-value">{product.olfactoryPyramid.heart}</span>
                </div>
                <div className="pyramid-tier">
                  <span className="tier-label">Base Notes</span>
                  <span className="tier-value">{product.olfactoryPyramid.base}</span>
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h3>Performance Details</h3>
              <div className="pyramid-content">
                <div className="pyramid-tier">
                  <span className="tier-label">Longevity</span>
                  <span className="tier-value">{product.details.longevity}</span>
                </div>
                <div className="pyramid-tier">
                  <span className="tier-label">Sillage</span>
                  <span className="tier-value">{product.details.sillage}</span>
                </div>
                <div className="pyramid-tier">
                  <span className="tier-label">Best Worn</span>
                  <span className="tier-value">{product.details.time}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
