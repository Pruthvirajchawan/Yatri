import { Destination } from '../types';

export interface IndonesiaDestination {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  startPrice: number;
  durationDays: number;
  durationNights: number;
  tags: string[];
  image: string;
  heroImage: string;
  gallery: string[];
  rating: number;
  reviewsCount: number;
  highlights: string[];
}

export const INDONESIA_TOP_DESTINATIONS: IndonesiaDestination[] = [
  {
    id: 'bali',
    name: 'Bali',
    subtitle: 'Beaches, culture, nightlife',
    tagline: 'Island of the Gods, Emerald Rice Terraces & Sunset Beaches',
    description: 'Experience the mystical temples of Uluwatu and Tanah Lot, world-class surf in Canggu, sacred Monkey Forests in Ubud, and vibrant cultural dance rituals under tropical skies.',
    startPrice: 199,
    durationDays: 3,
    durationNights: 2,
    tags: ['Beaches', 'Culture', 'Nightlife'],
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop'
    ],
    rating: 4.9,
    reviewsCount: 1420,
    highlights: ['Kelingking T-Rex Cliff Nusa Penida', 'Uluwatu Sunset Kecak Fire Dance', 'Tegallalang Sacred Rice Terraces', 'Seminyak Coastal Dining']
  },
  {
    id: 'labuan-bajo',
    name: 'Labuan Bajo',
    subtitle: 'Islands, snorkeling, Komodo dragons',
    tagline: 'Gateway to Komodo National Park & Pink Sand Beaches',
    description: 'Sail across cobalt blue waters on a private phinisi yacht, hike the iconic panoramic ridge of Padar Island, encounter ancient Komodo dragons in the wild, and snorkel alongside manta rays.',
    startPrice: 249,
    durationDays: 4,
    durationNights: 3,
    tags: ['Islands', 'Snorkeling', 'Komodo Dragons'],
    image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596423735880-5f2a689b90b8?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop'
    ],
    rating: 4.95,
    reviewsCount: 980,
    highlights: ['Padar Island 3-Bay Panorama Hike', 'Pink Sand Beach Snorkeling', 'Rinca Island Komodo Ranger Safari', 'Manta Point Marine Sanctuary']
  },
  {
    id: 'bromo',
    name: 'Bromo',
    subtitle: 'Mountains, sunrise, adventure',
    tagline: 'Surreal Volcanic Caldera & Sea of Sand Sunrises',
    description: 'Ride iconic 4x4 retro Jeeps across the dramatic Sea of Sand before dawn to witness a breathtaking sunrise illuminate the smoking crater of Mount Bromo and Mount Semeru.',
    startPrice: 159,
    durationDays: 2,
    durationNights: 1,
    tags: ['Mountains', 'Sunrise', 'Adventure'],
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605649487212-47bdab064df8?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop'
    ],
    rating: 4.88,
    reviewsCount: 760,
    highlights: ['King Kong Hill Sunrise Viewpoint', '4x4 Sea of Sand Expedition', 'Bromo Crater Rim Stairway Hike', 'Madakaripura Canyon Waterfall']
  },
  {
    id: 'lombok',
    name: 'Lombok',
    subtitle: 'Beaches, waterfalls, local life',
    tagline: 'Untouched Tropical Shores & Mighty Mount Rinjani',
    description: 'Discover pristine turquoise bays in Tanjung Aan, the thundering Sendang Gile twin waterfalls, authentic Sasak weaving villages, and tranquil boat excursions to the Gili Islands.',
    startPrice: 189,
    durationDays: 3,
    durationNights: 2,
    tags: ['Beaches', 'Waterfalls', 'Local Life'],
    image: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop'
    ],
    rating: 4.85,
    reviewsCount: 640,
    highlights: ['Tanjung Aan Turquoise Cove', 'Tiu Kelep Jungle Waterfall Trek', 'Sade Traditional Sasak Tribe Village', 'Gili Meno Sea Turtle Sanctuary']
  },
  {
    id: 'raja-ampat',
    name: 'Raja Ampat',
    subtitle: 'Diving, islands, marine life',
    tagline: 'The Global Epicenter of Coral Reef Biodiversity',
    description: 'Sail through labyrinthine limestone karst pinnacles, snorkel over vibrant coral gardens sheltering 75% of all known coral species, and experience crystal clear turquoise lagoons.',
    startPrice: 399,
    durationDays: 5,
    durationNights: 4,
    tags: ['Diving', 'Islands', 'Marine Life'],
    image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop'
    ],
    rating: 4.98,
    reviewsCount: 520,
    highlights: ['Piaynemo Top Karst Viewpoint', 'Arborek Village Snorkeling', 'Misool Blue Lagoon & Jellyfish Lake', 'Cape Kri Record-Breaking Coral Reef']
  },
  {
    id: 'yogyakarta',
    name: 'Yogyakarta',
    subtitle: 'Culture, temples, heritage',
    tagline: 'Heart of Javanese Royalty, Borobudur & Prambanan',
    description: 'Explore the 9th-century Buddhist wonder of Borobudur at sunrise, marvel at the towering Hindu spires of Prambanan, ride traditional becak carts through Sultan Palace alleys, and savor rich gudeg cuisine.',
    startPrice: 179,
    durationDays: 3,
    durationNights: 2,
    tags: ['Culture', 'Temples', 'Heritage'],
    image: 'https://images.unsplash.com/photo-1596423735880-5f2a689b90b8?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1596423735880-5f2a689b90b8?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1596423735880-5f2a689b90b8?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568849676085-51415703900f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop'
    ],
    rating: 4.87,
    reviewsCount: 810,
    highlights: ['Borobudur World Heritage Sunrise Stupas', 'Prambanan Temple Complex', 'Kraton Royal Sultan Palace', 'Malioboro Street & Becak Ride']
  }
];

export interface IndonesiaExperienceItem {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
  duration: string;
}

export const INDONESIA_EXPERIENCES: IndonesiaExperienceItem[] = [
  {
    id: 'island-hopping',
    title: 'Island Hopping',
    price: 130.0,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop',
    category: 'Ocean & Beaches',
    description: 'Cruise between secluded tropical atolls, turquoise lagoons, and white powdery beaches.',
    duration: 'Full Day'
  },
  {
    id: 'cultural-journey',
    title: 'Cultural Journey',
    price: 95.0,
    image: 'https://images.unsplash.com/photo-1596423735880-5f2a689b90b8?q=80&w=1000&auto=format&fit=crop',
    category: 'Heritage & Temples',
    description: 'Immerse yourself in thousand-year-old temple architecture, batik crafts, and royal traditions.',
    duration: 'Full Day'
  },
  {
    id: 'mountain-adventure',
    title: 'Mountain Adventure',
    price: 120.0,
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1000&auto=format&fit=crop',
    category: 'Volcanoes & Trekking',
    description: 'Climb active volcanic ridges, witness dramatic sulfur vents, and gaze at emerald crater lakes.',
    duration: '2 Days / 1 Night'
  },
  {
    id: 'coral-reef-diving',
    title: 'World-Class Coral Diving',
    price: 210.0,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1000&auto=format&fit=crop',
    category: 'Marine Life',
    description: 'Drift along world-famous reef walls with manta rays, sea turtles, and kaleidoscopic corals.',
    duration: 'Single / Multi Dive'
  }
];

export interface TravelerTestimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  review: string;
  stars: number;
  photos: string[];
  destination: string;
}

export const TRAVELER_TESTIMONIALS: TravelerTestimonial[] = [
  {
    id: 't-1',
    name: 'Esther Howard',
    location: 'Purbalingga',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    review: 'Booking a trip to Bromo was super easy. The itinerary was clear, everything went smoothly, and the sunrise view was breathtaking. Worth every penny!',
    stars: 5,
    destination: 'Bromo',
    photos: [
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605649487212-47bdab064df8?q=80&w=200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=200&auto=format&fit=crop'
    ]
  },
  {
    id: 't-2',
    name: 'Dianne Russell',
    location: 'Jakarta',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    review: 'Booking a trip to Bali was effortless. The tour guide was super friendly, the activities were well-planned, and the beaches were unforgettable. Definitely will come back again!',
    stars: 5,
    destination: 'Bali',
    photos: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=200&auto=format&fit=crop'
    ]
  },
  {
    id: 't-3',
    name: 'Savannah Nguyen',
    location: 'Wangon',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    review: 'Our Komodo Island tour exceeded expectations. Everything was organized perfectly, from the boat to the food. Seeing the Komodo dragons in real life was once in a lifetime!',
    stars: 5,
    destination: 'Labuan Bajo',
    photos: [
      'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596423735880-5f2a689b90b8?q=80&w=200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=200&auto=format&fit=crop'
    ]
  }
];
