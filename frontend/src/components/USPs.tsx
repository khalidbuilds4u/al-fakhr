import { RefreshCw, Truck, Clock } from 'lucide-react';
import './USPs.css';

const usps = [
  {
    icon: <RefreshCw size={32} strokeWidth={1.5} />,
    title: 'No Questions Asked Returns',
    description: 'Applicable on first order of 100ml and 50ml perfume bottles only.'
  },
  {
    icon: <Truck size={32} strokeWidth={1.5} />,
    title: 'Free & Fast Delivery',
    description: 'On your doorsteps in 3-5 days, with a complimentary surprise.'
  },
  {
    icon: <Clock size={32} strokeWidth={1.5} />,
    title: 'The Lingering Effect',
    description: 'Our perfumes are blended with proven ingredients to last 10+ hours.'
  }
];

export default function USPs() {
  return (
    <section className="usps-section">
      <div className="container usps-inner">
        {usps.map((usp, index) => (
          <div key={index} className="usp-item">
            <div className="usp-icon">{usp.icon}</div>
            <h3 className="usp-title">{usp.title}</h3>
            <p className="usp-desc">{usp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
