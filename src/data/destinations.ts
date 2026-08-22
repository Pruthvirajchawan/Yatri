import { Destination, DestinationCategory } from '../types';

export const DESTINATION_CATEGORIES: DestinationCategory[] = [
  'All',
  'Heritage',
  'Mountains',
  'Nature',
  'Beaches',
  'Spiritual',
  'Food',
  'Adventure'
];

export const INDIAN_REGIONS = ['All', 'Rajasthan', 'North', 'South', 'West', 'East'];

export const INDIAN_DESTINATIONS: Destination[] = [
  {
    id: 'udaipur',
    name: 'Udaipur',
    region: 'Rajasthan',
    state: 'Rajasthan',
    category: ['Heritage', 'Culture' as any, 'Romantic' as any],
    heroImage: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568849676085-51415703900f?q=80&w=800&auto=format&fit=crop'
    ],
    tagline: 'The Venice of the East & City of Lakes',
    description: 'Surrounded by the serene Aravalli Hills and shimmering waters of Lake Pichola, Udaipur offers palaces, sunset boat rides, and Rajput architectural marvels.',
    startingPrice: 12500,
    durationDays: 3,
    durationNights: 2,
    highlights: ['Lake Pichola Sunset Boat', 'City Palace Complex', 'Jagdish Temple', 'Bagore Ki Haveli Folk Dance'],
    bestSeason: 'Oct – Mar',
    rating: 4.9,
    reviewCount: 342,
    popularFor: 'Heritage · Lakes · Royalty'
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    region: 'Rajasthan',
    state: 'Rajasthan',
    category: ['Heritage', 'Culture' as any, 'Food'],
    heroImage: 'https://images.unsplash.com/photo-1603262110263-fb010d6e75dc?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1603262110263-fb010d6e75dc?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800&auto=format&fit=crop'
    ],
    tagline: 'The Pink City of Forts, Palaces & Bazaars',
    description: 'The vibrant capital of Rajasthan, blending royal grandiosity with bustling spice markets, gem craft, and historic hilltop fortresses.',
    startingPrice: 10800,
    durationDays: 3,
    durationNights: 2,
    highlights: ['Amber Fort Elephant Walk', 'Hawa Mahal Viewpoint', 'City Palace & Jantar Mantar', 'Johari Bazaar Jewellery'],
    bestSeason: 'Oct – Mar',
    rating: 4.8,
    reviewCount: 420,
    popularFor: 'Palaces · Bazaars · Street Food'
  },
  {
    id: 'jodhpur',
    name: 'Jodhpur',
    region: 'Rajasthan',
    state: 'Rajasthan',
    category: ['Heritage', 'Culture' as any],
    heroImage: 'https://images.unsplash.com/photo-1568849676085-51415703900f?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1568849676085-51415703900f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?q=80&w=800&auto=format&fit=crop'
    ],
    tagline: 'The Sun City & The Blue City of Marwar',
    description: 'Guarded by the colossal Mehrangarh Fort towering above an azure sea of houses, Jodhpur is the heart of desert craftsmanship and spicy delicacies.',
    startingPrice: 9500,
    durationDays: 2,
    durationNights: 2,
    highlights: ['Mehrangarh Fort Audio Tour', 'Blue City Heritage Walk', 'Jaswant Thada Cenotaph', 'Mirchi Vada at Clock Tower'],
    bestSeason: 'Oct – Mar',
    rating: 4.9,
    reviewCount: 280,
    popularFor: 'Blue Houses · Forts · Marwari Cuisine'
  },
  {
    id: 'kashmir',
    name: 'Kashmir Valley',
    region: 'North India',
    state: 'Jammu & Kashmir',
    category: ['Mountains', 'Nature'],
    heroImage: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=800&auto=format&fit=crop'
    ],
    tagline: 'Paradise on Earth with Pine Forests & Shikaras',
    description: 'Gliding across Dal Lake on wooden shikaras, snow-draped alpine meadows of Gulmarg, and quiet saffron fields of Pampore.',
    startingPrice: 22000,
    durationDays: 5,
    durationNights: 4,
    highlights: ['Dal Lake Houseboat Stay', 'Gulmarg Gondola Ride', 'Pahalgam Betaab Valley', 'Wazwan Feast Experience'],
    bestSeason: 'Year-round (Snow: Dec-Feb, Greenery: Apr-Sep)',
    rating: 5.0,
    reviewCount: 512,
    popularFor: 'Houseboats · Snow · Valleys'
  },
  {
    id: 'kerala',
    name: 'Kerala Backwaters',
    region: 'South India',
    state: 'Kerala',
    category: ['Nature', 'Slow Escape' as any],
    heroImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=800&auto=format&fit=crop'
    ],
    tagline: "God's Own Country of Coconut Groves & Lagoons",
    description: 'Drift along slow tranquil canals on a traditional kettuvallam, wake up to kingfishers, and savor spiced banana leaf meals.',
    startingPrice: 15400,
    durationDays: 4,
    durationNights: 3,
    highlights: ['Alleppey Private Houseboat Cruise', 'Munnar Tea Estate Walk', 'Kathakali Dance & Kalaripayattu', 'Ayurvedic Wellness Spa'],
    bestSeason: 'Sep – Mar',
    rating: 4.9,
    reviewCount: 388,
    popularFor: 'Houseboats · Tea Hills · Ayurveda'
  },
  {
    id: 'goa',
    name: 'Goa',
    region: 'West India',
    state: 'Goa',
    category: ['Beaches', 'Food', 'Adventure'],
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=800&auto=format&fit=crop'
    ],
    tagline: 'Sun-drenched Coastline, Portuguese Quarters & Susegad',
    description: 'Golden sand beaches, pastel colonial villas in Fontainhas, fresh prawn curry, and vibrant seaside cafe culture.',
    startingPrice: 8500,
    durationDays: 3,
    durationNights: 2,
    highlights: ['South Goa Quiet Beaches (Palolem, Agonda)', 'Fontainhas Latin Quarter Walk', 'Spice Plantation Organic Lunch', 'Sunset Kayaking at Sal River'],
    bestSeason: 'Nov – Feb',
    rating: 4.7,
    reviewCount: 610,
    popularFor: 'Coast · Susegad · Cafes'
  },
  {
    id: 'manali',
    name: 'Manali',
    region: 'North India',
    state: 'Himachal Pradesh',
    category: ['Mountains', 'Adventure'],
    heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop'
    ],
    tagline: 'Apple Orchards & High Mountain Passes',
    description: 'Nestled on the banks of Beas River with views of the Solang Valley and gateway to the rugged Spiti and Ladakh trails.',
    startingPrice: 9800,
    durationDays: 4,
    durationNights: 3,
    highlights: ['Solang Valley Paragliding', 'Old Manali Bohemian Cafes', 'Jogini Waterfall Trek', 'Atal Tunnel Drive'],
    bestSeason: 'Mar – Jun & Oct – Feb',
    rating: 4.8,
    reviewCount: 345,
    popularFor: 'Snow · Treks · Apple Orchards'
  },
  {
    id: 'coorg',
    name: 'Coorg (Kodagu)',
    region: 'South India',
    state: 'Karnataka',
    category: ['Nature', 'Food'],
    heroImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=800&auto=format&fit=crop'
    ],
    tagline: 'The Scotland of India & Coffee Country',
    description: 'Misty hills, aromatic Arabica coffee plantations, waterfalls, and mouthwatering Kodava cuisine including Pandi Curry.',
    startingPrice: 11000,
    durationDays: 3,
    durationNights: 2,
    highlights: ['Coffee Plantation Walking Tour', 'Abbey Falls & Raja’s Seat Sunset', 'Dubare Elephant Camp', 'Authentic Kodava Culinary Tasting'],
    bestSeason: 'Oct – Apr',
    rating: 4.8,
    reviewCount: 230,
    popularFor: 'Coffee · Mist · Waterfalls'
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    region: 'North India',
    state: 'Uttar Pradesh',
    category: ['Spiritual', 'Heritage', 'Culture' as any],
    heroImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=800&auto=format&fit=crop'
    ],
    tagline: 'The Eternal Spiritual City on the Holy Ganga',
    description: 'One of the world’s oldest continuously inhabited cities, alive with evening Ganga Aarti, sunrise boat oars, and timeless alleyways.',
    startingPrice: 7500,
    durationDays: 2,
    durationNights: 2,
    highlights: ['Dashashwamedh Ghat Evening Aarti', 'Dawn Wooden Boat Ride on Ganga', 'Kashi Vishwanath Corridor', 'Banarasi Silk Weaving Trail'],
    bestSeason: 'Oct – Mar',
    rating: 4.9,
    reviewCount: 460,
    popularFor: 'Ghats · Ganga Aarti · Silk'
  },
  {
    id: 'ooty',
    name: 'Ooty & Nilgiris',
    region: 'South India',
    state: 'Tamil Nadu',
    category: ['Mountains', 'Nature'],
    heroImage: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=800&auto=format&fit=crop'
    ],
    tagline: 'Queen of Hill Stations & UNESCO Toy Train',
    description: 'Chilly eucalyptus breeze, sprawling tea gardens, heritage colonial cottages, and the historic Nilgiri Mountain Railway.',
    startingPrice: 9200,
    durationDays: 3,
    durationNights: 2,
    highlights: ['Nilgiri Toy Train Ride', 'Doddabetta Peak View', 'Pykara Lake Boating', 'Homemade Chocolate Tastings'],
    bestSeason: 'Sep – May',
    rating: 4.7,
    reviewCount: 290,
    popularFor: 'Toy Train · Tea · Lakes'
  },
  {
    id: 'ladakh',
    name: 'Leh & Ladakh',
    region: 'North India',
    state: 'Ladakh',
    category: ['Mountains', 'Adventure', 'Spiritual'],
    heroImage: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=800&auto=format&fit=crop'
    ],
    tagline: 'High Altitude Desert, Monasteries & Pangong Tso',
    description: 'Dramatic moonscape mountains, prayer flags fluttering in mountain passes, and the deep turquoise brilliance of Pangong Lake.',
    startingPrice: 28000,
    durationDays: 6,
    durationNights: 5,
    highlights: ['Pangong Tso Stargazing Camp', 'Khardung La High Pass', 'Thiksey & Hemis Monasteries', 'Nubra Valley Sand Dunes & Bactrian Camels'],
    bestSeason: 'May – Sep',
    rating: 5.0,
    reviewCount: 390,
    popularFor: 'High Passes · Monasteries · Lakes'
  },
  {
    id: 'agra',
    name: 'Agra',
    region: 'North India',
    state: 'Uttar Pradesh',
    category: ['Heritage'],
    heroImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800&auto=format&fit=crop'
    ],
    tagline: 'The Monumental City of Mughal Splendor & Taj Mahal',
    description: 'Home to the iconic white marble Taj Mahal, Agra Fort, and rich Mughlai culinary tradition.',
    startingPrice: 6500,
    durationDays: 2,
    durationNights: 1,
    highlights: ['Sunrise at Taj Mahal', 'Agra Fort Guided Walk', 'Mehtab Bagh Sunset View', 'Famous Agra Petha Tasting'],
    bestSeason: 'Oct – Mar',
    rating: 4.8,
    reviewCount: 680,
    popularFor: 'Taj Mahal · Mughal History · Marble Craft'
  }
];
