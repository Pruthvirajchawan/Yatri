import { Router } from 'express';
import { backendStore } from '../store';

export const destinationsRouter = Router();

// Indian Mountain & Cultural Destinations
const DESTINATIONS_DB = [
  {
    id: 'ladakh',
    name: 'Leh Ladakh',
    region: 'North',
    state: 'Ladakh (UT)',
    category: ['Mountains', 'Adventure', 'Spiritual'],
    heroImage: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop'
    ],
    tagline: 'Land of High Passes, Blue Lakes & Tibetan Monasteries',
    description: 'A rugged mountain kingdom sitting at 11,500+ ft. Traverse Khardung La, stargaze by the cobalt waters of Pangong Tso, and experience centuries-old Buddhist monastic traditions.',
    startingPrice: 28500,
    durationDays: 7,
    durationNights: 6,
    highlights: ['Khardung La Pass (17,982 ft)', 'Pangong Tso Lake Camping', 'Nubra Valley Hunder Sand Dunes', 'Thiksey & Hemis Monasteries'],
    bestSeason: 'May – Sep',
    rating: 4.95,
    reviewCount: 520,
    popularFor: 'High Passes · Dark Skies · Monasteries',
    coordinates: { lat: 34.1526, lng: 77.5771 }
  },
  {
    id: 'kashmir',
    name: 'Kashmir Valley',
    region: 'North',
    state: 'Jammu & Kashmir',
    category: ['Mountains', 'Nature', 'Heritage'],
    heroImage: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1627894483216-2138af692e32?q=80&w=800&auto=format&fit=crop'
    ],
    tagline: 'Paradise on Earth — Snow Peaks & Saffron Valleys',
    description: 'Experience cedar forests of Pahalgam, snow glades of Gulmarg via world-famous Gondola cable cars, and tranquil Dal Lake Shikara cruises.',
    startingPrice: 22000,
    durationDays: 6,
    durationNights: 5,
    highlights: ['Gulmarg Gondola to Apharwat Peak', 'Dal Lake Heritage Houseboat', 'Betaab Valley & Aru Valley', 'Sonamarg Thajiwas Glacier'],
    bestSeason: 'Year Round (Winter for Snow)',
    rating: 4.9,
    reviewCount: 680,
    popularFor: 'Snow Skiing · Houseboats · Alpine Meadows',
    coordinates: { lat: 34.0837, lng: 74.7973 }
  },
  {
    id: 'spiti',
    name: 'Spiti Valley',
    region: 'North',
    state: 'Himachal Pradesh',
    category: ['Mountains', 'Adventure', 'Spiritual'],
    heroImage: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=800&auto=format&fit=crop'
    ],
    tagline: 'The Middle Land — Moonscapes & 1,000-Year Monasteries',
    description: 'An ancient, high-altitude desert plateau connecting India and Tibet. Home to Key Monastery, Chandratal Crescent Lake, and world’s highest post office in Hikkim.',
    startingPrice: 24500,
    durationDays: 7,
    durationNights: 6,
    highlights: ['Key Gompa & Tabo Monastery', 'Chandratal Lake (Moon Lake)', 'Hikkim Highest Post Office (14,567 ft)', 'Kunzum Pass Crossing'],
    bestSeason: 'Jun – Oct',
    rating: 4.88,
    reviewCount: 410,
    popularFor: 'Off-Roading · Fossil Hunting · Stargazing',
    coordinates: { lat: 32.2461, lng: 78.0349 }
  },
  {
    id: 'manali',
    name: 'Manali & Rohtang',
    region: 'North',
    state: 'Himachal Pradesh',
    category: ['Mountains', 'Adventure', 'Nature'],
    heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571863533956-01c88e79957e?q=80&w=800&auto=format&fit=crop'
    ],
    tagline: 'Gateway to the Pir Panjal Snow Peaks & Solang Valley',
    description: 'Lush apple orchards, roaring Beas river waters, Atal Tunnel engineering wonder, and premier paragliding in Solang Valley.',
    startingPrice: 16500,
    durationDays: 5,
    durationNights: 4,
    highlights: ['Rohtang Pass Snow Point', 'Solang Valley Paragliding', 'Old Manali Bohemian Cafes', 'Atal Tunnel Drive to Lahaul'],
    bestSeason: 'Oct – Jun',
    rating: 4.75,
    reviewCount: 890,
    popularFor: 'Adventure Sports · River Rafting · Snow Trails',
    coordinates: { lat: 32.2396, lng: 77.1887 }
  },
  {
    id: 'sikkim',
    name: 'Sikkim & Kanchenjunga',
    region: 'East',
    state: 'Sikkim',
    category: ['Mountains', 'Nature', 'Spiritual'],
    heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop'
    ],
    tagline: 'Under the Gaze of Mt. Kanchenjunga',
    description: 'Pristine organic state with glacial Gurudongmar Lake, Yumthang Valley of Flowers, and sacred monastery paths.',
    startingPrice: 26000,
    durationDays: 6,
    durationNights: 5,
    highlights: ['Gurudongmar Lake (17,800 ft)', 'Yumthang Valley of Flowers', 'Nathula Pass Indo-China Border', 'Rumtek Monastery'],
    bestSeason: 'Mar – May & Oct – Dec',
    rating: 4.92,
    reviewCount: 310,
    popularFor: 'Rhododendron Trails · Glacial Lakes · Organic Living',
    coordinates: { lat: 27.533, lng: 88.5122 }
  },
  {
    id: 'meghalaya',
    name: 'Meghalaya & Living Root Bridges',
    region: 'East',
    state: 'Meghalaya',
    category: ['Nature', 'Adventure', 'Mountains'],
    heroImage: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=800&auto=format&fit=crop'
    ],
    tagline: 'Abode of Clouds & Crystal Umngot River',
    description: 'Lush rainforest plateaus, double-decker living root bridges of Cherrapunji, crystal clear river boating at Dawki, and limestone caving.',
    startingPrice: 19500,
    durationDays: 5,
    durationNights: 4,
    highlights: ['Double Decker Living Root Bridge Trek', 'Dawki Transparent River Boat', 'Nohkalikai Waterfall', 'Mawsmai & Arwah Caves'],
    bestSeason: 'Sep – Apr',
    rating: 4.86,
    reviewCount: 340,
    popularFor: 'Waterfalls · Bio-Engineering · Caving',
    coordinates: { lat: 25.467, lng: 91.3662 }
  },
  {
    id: 'udaipur',
    name: 'Udaipur',
    region: 'Rajasthan',
    state: 'Rajasthan',
    category: ['Heritage', 'Romantic' as any, 'Nature'],
    heroImage: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?q=80&w=800&auto=format&fit=crop'
    ],
    tagline: 'The Venice of the East & City of Lakes',
    description: 'Surrounded by the serene Aravalli Hills and shimmering waters of Lake Pichola with Rajput architectural marvels.',
    startingPrice: 12500,
    durationDays: 3,
    durationNights: 2,
    highlights: ['Lake Pichola Sunset Boat', 'City Palace Complex', 'Jagdish Temple', 'Bagore Ki Haveli'],
    bestSeason: 'Oct – Mar',
    rating: 4.9,
    reviewCount: 342,
    popularFor: 'Heritage · Lakes · Royalty',
    coordinates: { lat: 24.5854, lng: 73.7125 }
  }
];

// GET /api/destinations
destinationsRouter.get('/', (req, res) => {
  const { region, category, search } = req.query;

  let results = [...DESTINATIONS_DB];

  if (region && region !== 'All') {
    results = results.filter((d) => d.region.toLowerCase() === (region as string).toLowerCase());
  }

  if (category && category !== 'All') {
    results = results.filter((d) =>
      d.category.some((c) => c.toLowerCase() === (category as string).toLowerCase())
    );
  }

  if (search) {
    const q = (search as string).toLowerCase();
    results = results.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.state.toLowerCase().includes(q) ||
        d.tagline.toLowerCase().includes(q) ||
        d.highlights.some((h) => h.toLowerCase().includes(q))
    );
  }

  res.json({
    success: true,
    total: results.length,
    data: results
  });
});

// GET /api/destinations/:id
destinationsRouter.get('/:id', (req, res) => {
  const dest = DESTINATIONS_DB.find(
    (d) => d.id.toLowerCase() === req.params.id.toLowerCase()
  );

  if (!dest) {
    return res.status(404).json({ success: false, error: 'Destination not found' });
  }

  const telemetry = backendStore.getMountainTelemetry(dest.id);
  const reviews = backendStore.getReviewsForDestination(dest.id);

  res.json({
    success: true,
    data: {
      ...dest,
      telemetry,
      reviews
    }
  });
});

// GET /api/destinations/:id/telemetry
destinationsRouter.get('/:id/telemetry', (req, res) => {
  const telemetry = backendStore.getMountainTelemetry(req.params.id);
  res.json({
    success: true,
    data: telemetry
  });
});
