export interface Product {
  id: number;
  slug: string;
  name: string;
  type: string;
  notes: string;
  desc: string;
  longDesc: string;
  image: string;
  hoverImage?: string; // New: Image to show on hover (lifestyle model)
  price: number;
  olfactoryPyramid: {
    top: string;
    heart: string;
    base: string;
  };
  details: {
    longevity: string;
    sillage: string;
    time: string;
  }
}

export const products: Product[] = [
  {
    id: 1,
    slug: 'dehn-al-oudh',
    name: 'Dehn Al Oudh',
    type: 'Heritage Oil',
    notes: 'Pure Indian Agarwood, Smoky, Woody',
    desc: 'The purest agarwood essence for a dark, commanding presence.',
    longDesc: 'Sourced from the oldest agarwood forests of Assam, our Dehn Al Oudh is a deeply meditative and intensely animalic fragrance. It opens with an unapologetic burst of raw, smoky wood before settling into a warm, resinous leather finish that lasts for days on the skin. This is the crown jewel of traditional Middle Eastern perfumery.',
    image: '/dehn_al_oudh.jpg',
    hoverImage: '/hover_dehn.jpg', // AI generated dark moody perfume
    price: 150,
    olfactoryPyramid: {
      top: 'Aged Indian Agarwood, Earth',
      heart: 'Dark Leather, Smoky Resins',
      base: 'Warm Musk, Animalic Oudh'
    },
    details: {
      longevity: '12+ Hours (Eternal on clothing)',
      sillage: 'Enormous',
      time: 'Winter Evenings, Formal'
    }
  },
  {
    id: 2,
    slug: 'ruh-khus',
    name: 'Ruh Khus',
    type: 'Heritage Oil',
    notes: 'Deep, earthy, cooling green root',
    desc: 'A vibrant emerald aura of grounding vetiver.',
    longDesc: 'Distilled using ancient copper degs, Ruh Khus (Wild Vetiver) captures the essence of cooling monsoon breezes over parched Indian earth. Its intense emerald green color is 100% natural, achieved through the traditional distillation process over a sandalwood base. It provides a grounding, deeply meditative aura.',
    image: '/real_4.jpg',
    hoverImage: '/hover_ruh.jpg', // AI generated green vetiver bottle
    price: 85,
    olfactoryPyramid: {
      top: 'Dewy Grass, Damp Earth',
      heart: 'Wild Vetiver Root, Petrichor',
      base: 'Sandalwood (Mysore)'
    },
    details: {
      longevity: '8-10 Hours',
      sillage: 'Moderate (Intimate)',
      time: 'Summer Days, Office'
    }
  },
  {
    id: 3,
    slug: 'mitti-attar',
    name: 'Mitti Attar',
    type: 'Heritage Oil',
    notes: 'Baked earth, sandalwood, petrichor',
    desc: 'The deeply nostalgic scent of the first rain on parched soil.',
    longDesc: 'The ultimate scent of nostalgia. Mitti Attar captures the exact aroma of the first monsoon rain hitting sun-baked earth. Distilled from actual half-baked clay harvested from the banks of the Ganges, co-distilled into pure sandalwood oil. It is a masterpiece of olfactive storytelling.',
    image: '/real_5.jpg',
    hoverImage: '/real_4.jpg', // Fallback local image
    price: 95,
    olfactoryPyramid: {
      top: 'Ozone, Rainwater',
      heart: 'Baked Clay, Geosmin',
      base: 'Creamy Sandalwood'
    },
    details: {
      longevity: '6-8 Hours',
      sillage: 'Intimate',
      time: 'Rainy Days, Meditative Moments'
    }
  },
  {
    id: 4,
    slug: 'royal-saffron-amber',
    name: 'Royal Saffron & Amber',
    type: 'Luxury Perfume',
    notes: 'Saffron, Jasmine, Ambergris, Cedarwood',
    desc: 'A radiant, luxurious profile that commands a room.',
    longDesc: 'A devastatingly luxurious blend. We source the finest Persian saffron threads, pairing their leathery-sweet warmth with the indolic depth of night-blooming jasmine. The dry down reveals authentic ambergris and virgin cedarwood, creating a radiant halo of scent that announces your arrival.',
    image: '/real_1.jpg',
    hoverImage: '/real_3.jpg', // Fallback local image
    price: 210,
    olfactoryPyramid: {
      top: 'Persian Saffron, Bitter Almond',
      heart: 'Egyptian Jasmine, Cedarwood',
      base: 'Ambergris, White Musk, Fir Resin'
    },
    details: {
      longevity: '14+ Hours',
      sillage: 'Room-filling',
      time: 'Signature Scent, Special Occasions'
    }
  },
  {
    id: 5,
    slug: 'tuscan-leather-rose',
    name: 'Tuscan Leather & Rose',
    type: 'Luxury Perfume',
    notes: 'Rich leather, Raspberry, Thyme, Damask Rose',
    desc: 'Bold, smoky, and irresistibly seductive.',
    longDesc: 'An uncompromising study in contrasts. The harsh, primal scent of raw black leather is wrapped in the velvet embrace of jammy Damask Rose and tart raspberry. It is simultaneously tough and romantic, smoky and sweet—an Extrait de Parfum for the boldly confident.',
    image: '/real_2.jpg',
    hoverImage: '/hover_tuscan.jpg', // AI generated black leather rose bottle
    price: 245,
    olfactoryPyramid: {
      top: 'Raspberry, Saffron, Thyme',
      heart: 'Olibanum, Night-blooming Jasmine, Damask Rose',
      base: 'Black Leather, Suede, Amberwood'
    },
    details: {
      longevity: '12+ Hours',
      sillage: 'Heavy',
      time: 'Date Night, Fall/Winter'
    }
  },
  {
    id: 6,
    slug: 'imperial-bergamot',
    name: 'Imperial Bergamot',
    type: 'Luxury Perfume',
    notes: 'Bergamot, Pineapple, Birch Tar, Oakmoss',
    desc: 'A sharp, fresh, and aggressively confident signature.',
    longDesc: 'A tribute to classical masculine elegance, reimagined at an Extrait concentration. A blindingly bright opening of Calabrian bergamot and crisp apple gives way to a smoky heart of birch tar and patchouli. It dries down to an intoxicating, mossy masculine finish that lasts from dawn until dusk.',
    image: '/real_3.jpg',
    hoverImage: '/real_5.jpg', // Fallback local image
    price: 180,
    olfactoryPyramid: {
      top: 'Calabrian Bergamot, Blackcurrant, Apple, Pineapple',
      heart: 'Juniper Berries, Birch, Patchouli, Jasmine',
      base: 'Musk, Oakmoss, Ambergris, Vanilla'
    },
    details: {
      longevity: '10-12 Hours',
      sillage: 'Strong',
      time: 'Spring/Summer, Signature Daily'
    }
  }
];

export const getProductBySlug = (slug: string) => {
  return products.find(p => p.slug === slug);
};
