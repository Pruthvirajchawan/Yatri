export interface IndiaDestination {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  startPrice: number; // in INR (₹)
  durationDays: number;
  durationNights: number;
  tags: string[];
  image: string;
  heroImage: string;
  gallery: string[];
  rating: number;
  reviewsCount: number;
  highlights: string[];
  state: string;
  altitude?: string;
}

export const INDIA_TOP_DESTINATIONS: IndiaDestination[] = [
  {
    id: 'ladakh',
    name: 'Ladakh',
    subtitle: 'High passes, monasteries, Pangong Lake',
    tagline: 'Land of High Mountain Passes & Cerulean Glacial Lakes',
    description: 'Traverse the world’s highest motorable passes like Khardung La, camp beneath starlit galaxies beside the shifting blue hues of Pangong Tso, and experience the ancient Buddhist chanting at Thiksey and Hemis monasteries.',
    startPrice: 24999,
    durationDays: 6,
    durationNights: 5,
    tags: ['High Altitude', 'Glacial Lakes', 'Monasteries'],
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1400&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop'
    ],
    rating: 4.96,
    reviewsCount: 1840,
    highlights: ['Pangong Tso Crystal Shoreline', 'Khardung La Pass (17,982 ft)', 'Nubra Valley Hunder Sand Dunes & Bactrian Camels', 'Thiksey Monastery Sunrise Prayer'],
    state: 'Ladakh',
    altitude: '11,500 - 18,380 ft'
  },
  {
    id: 'kashmir',
    name: 'Kashmir',
    subtitle: 'Snow peaks, Dal Lake, pine valleys',
    tagline: 'Paradise on Earth, Alpine Meadows & Houseboats',
    description: 'Glissade down powder snow slopes on the Gulmarg Gondola, drift across tranquil lotus waters on a traditional wooden Shikara on Dal Lake, and walk through the fragrant pine forests and gushing streams of Pahalgam and Sonamarg.',
    startPrice: 18499,
    durationDays: 5,
    durationNights: 4,
    tags: ['Snow Mountains', 'Shikara Rides', 'Alpine Meadows'],
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1400&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop'
    ],
    rating: 4.93,
    reviewsCount: 2150,
    highlights: ['Gulmarg Gondola Phase 2 Summit', 'Dal Lake Heritage Cedar Houseboat Stay', 'Betaab Valley & Aru Valley Meadows', 'Sonamarg Thajiwas Glacier Sledging'],
    state: 'Jammu & Kashmir',
    altitude: '5,200 - 13,780 ft'
  },
  {
    id: 'spiti',
    name: 'Spiti Valley',
    subtitle: 'Cold desert, Key Monastery, Chandratal',
    tagline: 'The Middle Land, Cliff-Hanging Gompas & Fossils',
    description: 'Journey through rugged Martian-like canyons, post letters from the world’s highest post office in Hikkim, gaze at the crescent moon waters of Chandratal Lake, and stay in ancient thousand-year-old mud monasteries in Key and Tabo.',
    startPrice: 16999,
    durationDays: 6,
    durationNights: 5,
    tags: ['Cold Desert', 'Cliff Monasteries', 'Stargazing'],
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1400&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop'
    ],
    rating: 4.91,
    reviewsCount: 920,
    highlights: ['Key Monastery 1,000-Year-Old Cliff Complex', 'Chandratal Moon Lake Stargazing Camp', 'Hikkim World’s Highest Post Office', 'Chicham Bridge (Highest Suspension Bridge in Asia)'],
    state: 'Himachal Pradesh',
    altitude: '12,500 - 15,000 ft'
  },
  {
    id: 'manali',
    name: 'Manali & Rohtang',
    subtitle: 'Snow valleys, waterfalls, adventure',
    tagline: 'Heart of the Pir Panjal Range & Beas River Valley',
    description: 'Breathe in crisp cedar-scented Himalayan air, cross the dramatic Rohtang and Atal Tunnel into Lahaul, paraglide over Solang Valley, and soak in natural sulfur hot springs amidst snow-capped peaks.',
    startPrice: 12499,
    durationDays: 4,
    durationNights: 3,
    tags: ['Snow Peaks', 'Adventure Sports', 'Cedar Valleys'],
    image: 'https://images.unsplash.com/photo-1579619163273-0570b74103fa?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1579619163273-0570b74103fa?q=80&w=1400&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1579619163273-0570b74103fa?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop'
    ],
    rating: 4.88,
    reviewsCount: 1680,
    highlights: ['Rohtang Pass Snow Point', 'Solang Valley Tandem Paragliding', 'Atal Tunnel into Sissu Waterfall', 'Old Manali Apple Orchards & Cafes'],
    state: 'Himachal Pradesh',
    altitude: '6,725 - 13,058 ft'
  },
  {
    id: 'sikkim',
    name: 'Sikkim & Kanchenjunga',
    subtitle: 'Sacred peaks, glacial lakes, monasteries',
    tagline: 'Guardian of the Sacred Mountain Kanchenjunga',
    description: 'Gaze upon the world’s third highest peak Kanchenjunga from Pelling, visit the frozen sacred waters of Gurudongmar Lake and Tsomgo Lake at the Indo-China border, and explore vibrant rhododendron valleys.',
    startPrice: 19999,
    durationDays: 5,
    durationNights: 4,
    tags: ['Sacred Peaks', 'High Lakes', 'Buddhism'],
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1400&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=800&auto=format&fit=crop'
    ],
    rating: 4.94,
    reviewsCount: 1120,
    highlights: ['Gurudongmar Sacred High Altitude Lake (17,800 ft)', 'Tsomgo Lake & Nathu La Pass', 'Yumthang Valley of Flowers', 'Rumtek & Pemayangtse Monasteries'],
    state: 'Sikkim',
    altitude: '5,500 - 17,800 ft'
  },
  {
    id: 'meghalaya',
    name: 'Meghalaya',
    subtitle: 'Living root bridges, waterfalls, caves',
    tagline: 'Abode of Clouds & Crystal Clear Umngot River',
    description: 'Trek down dense tropical rain canyons to the Double Decker Living Root Bridge in Nongriat, boat on the mirror-transparent glass waters of the Umngot River in Dawki, and stand beneath roaring Nohkalikai Falls.',
    startPrice: 17500,
    durationDays: 5,
    durationNights: 4,
    tags: ['Living Bridges', 'Cloud Hills', 'Crystal Rivers'],
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1400&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596423735880-5f2a689b90b8?q=80&w=800&auto=format&fit=crop'
    ],
    rating: 4.89,
    reviewsCount: 840,
    highlights: ['Nongriat Double Decker Root Bridge Trek', 'Dawki Transparent Glass River Boating', 'Nohkalikai Waterfall (India’s Tallest Plunge)', 'Mawsmai Limestone Caves'],
    state: 'Meghalaya',
    altitude: '4,900 ft'
  }
];

export interface IndiaExperienceItem {
  id: string;
  title: string;
  price: number; // in INR
  image: string;
  category: string;
  description: string;
  duration: string;
}

export const INDIA_EXPERIENCES: IndiaExperienceItem[] = [
  {
    id: 'himalayan-trekking',
    title: 'Himalayan Mountain Trek',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1000&auto=format&fit=crop',
    category: 'High Peaks & Alpine',
    description: 'Summit high passes, camp under the Milky Way, and cross crystalline glacial ridges with certified Sherpa guides.',
    duration: '4 Days / 3 Nights'
  },
  {
    id: 'river-rafting-camping',
    title: 'Ganges White Water Rafting & Camping',
    price: 4999,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop',
    category: 'River Adventure',
    description: 'Conquer Grade IV rapids on the turquoise Ganges river and spend starlit nights in riverside alpine beach tents.',
    duration: '2 Days / 1 Night'
  },
  {
    id: 'monastery-spiritual-retreat',
    title: 'Tibetan Monastery Heritage Retreat',
    price: 6800,
    image: 'https://images.unsplash.com/photo-1596423735880-5f2a689b90b8?q=80&w=1000&auto=format&fit=crop',
    category: 'Spiritual & Heritage',
    description: 'Experience dawn chanting rituals, Butter Lamp ceremonies, and centuries-old thangka art in cliff-side gompas.',
    duration: 'Full Day'
  },
  {
    id: 'high-pass-safari',
    title: '4x4 High-Altitude Pass Expedition',
    price: 14200,
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1000&auto=format&fit=crop',
    category: 'Expedition Safari',
    description: 'Drive rugged mountain jeeps across Khardung La and Chang La, navigating river crossings and raw lunar landscapes.',
    duration: '3 Days / 2 Nights'
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
    name: 'Aarav Sharma',
    location: 'New Delhi',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    review: 'Booking our Spiti Valley expedition through Yatri was seamless. From the 4x4 vehicle to the high-altitude homestays in Kaza, everything was meticulously organized. The night sky in Chandratal was unforgettable!',
    stars: 5,
    destination: 'Spiti Valley',
    photos: [
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=200&auto=format&fit=crop'
    ]
  },
  {
    id: 't-2',
    name: 'Priya Patel',
    location: 'Mumbai',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    review: 'Our family trip to Kashmir was pure magic. The Dal Lake cedar houseboat and our local driver made us feel like family. Gulmarg Phase 2 gondola in fresh snow is a must-do. Yatri made planning in INR so transparent!',
    stars: 5,
    destination: 'Kashmir',
    photos: [
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1579619163273-0570b74103fa?q=80&w=200&auto=format&fit=crop'
    ]
  },
  {
    id: 't-3',
    name: 'Rohan Sengupta',
    location: 'Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    review: 'Ladakh on a bike and 4x4 organized by Yatri was the best adventure of my life. Transparent pricing in ₹, 24/7 oxygen assistance support, and curated stops at Khardung La and Pangong. 10/10 recommend!',
    stars: 5,
    destination: 'Ladakh',
    photos: [
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=200&auto=format&fit=crop'
    ]
  }
];

export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};
