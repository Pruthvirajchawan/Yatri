export interface IndiaPriceBreakdown {
  stays: number;
  transport: number;
  activitiesAndGuide: number;
  mealsAndTaxes: number;
}

export interface IndiaDestination {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  startPrice: number; // in INR (₹) - genuine market rates
  durationDays: number;
  durationNights: number;
  category: 'Heritage' | 'Beaches' | 'Spiritual' | 'Wildlife' | 'Backwaters' | 'Mountains';
  tags: string[];
  image: string;
  heroImage: string;
  gallery: string[];
  rating: number;
  reviewsCount: number;
  highlights: string[];
  state: string;
  bestSeason: string;
  priceBreakdown: IndiaPriceBreakdown;
  altitude?: string;
}

export const INDIA_TOP_DESTINATIONS: IndiaDestination[] = [
  {
    id: 'jaipur',
    name: 'Jaipur',
    subtitle: 'Amber Fort, Hawa Mahal & Royal Heritage',
    tagline: 'The Pink City of Rajput Grandeur, Forts & Bazaars',
    description: 'Walk through the grand courtyards of Amber Palace, capture the honeycombed façade of Hawa Mahal at sunrise, explore the royal astronomy instruments at Jantar Mantar, and taste authentic Rajasthani Dal Baati Churma in traditional havelis.',
    startPrice: 6999,
    durationDays: 3,
    durationNights: 2,
    category: 'Heritage',
    tags: ['Royal Palaces', 'Hill Forts', 'Bazaar Walks'],
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1400&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1603262110263-fb010d6e75dc?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1200&auto=format&fit=crop'
    ],
    rating: 4.92,
    reviewsCount: 3840,
    highlights: ['Amber Fort Elephant Pathway & Sheesh Mahal', 'Hawa Mahal Sunrise View & Cafe Rooftop', 'City Palace Royal Museum & Peacock Gate', 'Nahargarh Fort Golden Hour Sunset'],
    state: 'Rajasthan',
    bestSeason: 'Oct – Mar',
    priceBreakdown: {
      stays: 3100,
      transport: 2200,
      activitiesAndGuide: 1000,
      mealsAndTaxes: 699
    }
  },
  {
    id: 'gujarat',
    name: 'Gujarat',
    subtitle: 'Somnath Temple, Dwarka & Sacred Coast',
    tagline: 'Sacred Shores, Golden Jyotirlinga & Maritime Splendor',
    description: 'Experience the divine spiritual aura of the majestic Somnath Temple standing resilient on the Arabian Sea shore, explore Lord Krishna’s legendary coastal kingdom in Dwarka, and immerse in the rich maritime, architectural, and cultural heritage of Saurashtra.',
    startPrice: 9499,
    durationDays: 4,
    durationNights: 3,
    category: 'Spiritual',
    tags: ['Somnath Temple', 'Sacred Coast', 'Heritage & Architecture'],
    image: '/images/gujarat_somnath_card.jpg',
    heroImage: '/images/gujarat_somnath_bg.jpg',
    gallery: [
      '/images/gujarat_somnath_card.jpg',
      '/images/gujarat_somnath_bg.jpg',
      '/images/gujarat_statue_of_unity.jpg'
    ],
    rating: 4.96,
    reviewsCount: 2640,
    highlights: ['First Jyotirlinga of Lord Shiva (Somnath Jyotirlinga)', 'Arabian Sea Shoreline Evening Aarti & Light Show', 'Ancient Chalukya/Nagara Golden Sandstone Architecture', 'Dwarkadhish Temple & Beyt Dwarka Island Excursion'],
    state: 'Gujarat',
    bestSeason: 'Nov – Mar',
    priceBreakdown: {
      stays: 4200,
      transport: 2900,
      activitiesAndGuide: 1400,
      mealsAndTaxes: 999
    }
  },
  {
    id: 'kerala',
    name: 'Kerala',
    subtitle: 'Alleppey Backwaters, Munnar & God’s Own Country',
    tagline: 'Emerald Lagoons, Misty Tea Gardens & Spice Forests',
    description: 'Cruise tranquil palm-fringed backwaters on a traditional luxury Kettuvallam houseboat in Alleppey, roam misty emerald tea estates in Munnar, encounter gentle wild elephants in Periyar, and witness golden Arabian Sea sunsets along Marari and Kovalam beaches.',
    startPrice: 11999,
    durationDays: 5,
    durationNights: 4,
    category: 'Backwaters',
    tags: ['Alleppey Backwaters', 'Munnar Tea Gardens', 'Luxury Houseboat'],
    image: '/images/kerala_houseboat.jpg',
    heroImage: '/images/kerala_bg.jpg',
    gallery: [
      '/images/kerala_houseboat.jpg',
      '/images/kerala_munnar.jpg',
      '/images/kerala_bg.jpg'
    ],
    rating: 4.95,
    reviewsCount: 3120,
    highlights: ['Luxury Traditional Kettuvallam Houseboat Cruise', 'Munnar Rolling Emerald Tea Plantations & Eravikulam', 'Periyar Wildlife Sanctuary & Spice Plantation Walk', 'Authentic Kerala Ayurvedic Spa & Kathakali Performance'],
    state: 'Kerala',
    bestSeason: 'Sep – Mar',
    priceBreakdown: {
      stays: 5500,
      transport: 3600,
      activitiesAndGuide: 1800,
      mealsAndTaxes: 1099
    }
  },
  {
    id: 'goa',
    name: 'Goa',
    subtitle: 'Sun-Kissed Beaches, Portuguese Forts & Shacks',
    tagline: 'Golden Shorelines, Ocean Sunsets & Colonial Charm',
    description: 'Bask on the golden sands of Palolem and Vagator, explore 16th-century Portuguese churches in Old Goa, cruise the Mandovi river at twilight, and savor freshly caught butter-garlic seafood at beachside shacks.',
    startPrice: 7499,
    durationDays: 4,
    durationNights: 3,
    category: 'Beaches',
    tags: ['Golden Beaches', 'Water Sports', 'Portuguese Heritage'],
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1400&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop'
    ],
    rating: 4.88,
    reviewsCount: 4210,
    highlights: ['Palolem & Ashwem Pristine White Sand Beaches', 'Aguada & Chapora 17th Century Coastal Forts', 'Basilica of Bom Jesus UNESCO World Heritage Site', 'Mandovi River Sunset Cruise & Live Goan Music'],
    state: 'Goa',
    bestSeason: 'Oct – Apr',
    priceBreakdown: {
      stays: 3400,
      transport: 2100,
      activitiesAndGuide: 1200,
      mealsAndTaxes: 799
    }
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    subtitle: 'Sacred Ganges Ghats, Kashi & Grand Evening Aarti',
    tagline: 'The World’s Oldest Living City of Light and Devotion',
    description: 'Drift along the holy Ganges in a wooden rowing boat as the morning sun illuminates ancient stone steps, witness the mesmerizing synchronized flame ritual of the Dashashwamedh Maha Aarti, and stroll mystical centuries-old silk alleys.',
    startPrice: 5499,
    durationDays: 3,
    durationNights: 2,
    category: 'Spiritual',
    tags: ['Ganga Aarti', 'Ancient Ghats', 'Spiritual Awakening'],
    image: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?q=80&w=1200&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?q=80&w=1400&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1571536802807-30451e3955d8?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1561359313-0639aad49ca6?q=80&w=1200&auto=format&fit=crop'
    ],
    rating: 4.97,
    reviewsCount: 2950,
    highlights: ['Sunrise Private Wooden Rowing Boat on Sacred Ganges', 'Front-Row Dashashwamedh Ghat Evening Maha Aarti', 'Kashi Vishwanath Corridor & Ancient Silk Weavers Walk', 'Sarnath Buddhist Deer Park & Ashoka Pillar'],
    state: 'Uttar Pradesh',
    bestSeason: 'Oct – Mar',
    priceBreakdown: {
      stays: 2400,
      transport: 1600,
      activitiesAndGuide: 900,
      mealsAndTaxes: 599
    }
  },
  {
    id: 'taj-mahal',
    name: 'Agra & Taj Mahal',
    subtitle: 'Mughal Wonder, Red Fort & Fatehpur Sikri',
    tagline: 'Monument of Eternal Love & Mughal Architectural Mastery',
    description: 'Gaze in awe at the pearlescent ivory marble Taj Mahal glowing in dawn light, walk through the formidable red sandstone ramparts of Agra Fort, and visit the deserted imperial red stone city of Fatehpur Sikri.',
    startPrice: 4499,
    durationDays: 2,
    durationNights: 1,
    category: 'Heritage',
    tags: ['World Wonder', 'Mughal Architecture', 'UNESCO Heritage'],
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1400&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200&auto=format&fit=crop'
    ],
    rating: 4.94,
    reviewsCount: 5120,
    highlights: ['Taj Mahal Sunrise Priority Gate Tour & Gardens', 'Agra Fort Diwan-i-Khas & Jahangiri Palace', 'Mehtab Bagh Moonlight River Reflection View', 'Fatehpur Sikri Buland Darwaza & Sufi Dargah'],
    state: 'Uttar Pradesh',
    bestSeason: 'Oct – Mar',
    priceBreakdown: {
      stays: 1900,
      transport: 1400,
      activitiesAndGuide: 700,
      mealsAndTaxes: 499
    }
  },
  {
    id: 'udaipur',
    name: 'Udaipur',
    subtitle: 'City of Lakes, Jag Mandir & Sunset Boats',
    tagline: 'The Venice of the East & Crown Jewel of Mewar',
    description: 'Glide across the mirror waters of Lake Pichola at golden hour, wander through the royal courtyards of City Palace, attend vibrant Rajasthani folk dances at Bagore Ki Haveli, and dine under candlelit royal rooftop pavilions.',
    startPrice: 8499,
    durationDays: 3,
    durationNights: 2,
    category: 'Heritage',
    tags: ['Lake Pichola', 'Royal Palaces', 'Romantic Haveli'],
    image: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?q=80&w=1200&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?q=80&w=1400&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1200&auto=format&fit=crop'
    ],
    rating: 4.93,
    reviewsCount: 2780,
    highlights: ['Lake Pichola Sunset Private Boat to Jag Mandir', 'City Palace Mewar Royal Museum & Crystal Gallery', 'Bagore Ki Haveli Evening Dharohar Cultural Show', 'Monsoon Palace (Sajjangarh) Hilltop Panorama'],
    state: 'Rajasthan',
    bestSeason: 'Sep – Mar',
    priceBreakdown: {
      stays: 3800,
      transport: 2600,
      activitiesAndGuide: 1200,
      mealsAndTaxes: 899
    }
  },
  {
    id: 'hampi',
    name: 'Hampi',
    subtitle: 'UNESCO Stone Temples & Tungabhadra Boulders',
    tagline: 'Lost Imperial Capital of the Vijayanagara Empire',
    description: 'Cycle among surreal golden boulder landscapes, admire the architectural genius of the Stone Chariot at Vijaya Vittala, cross the Tungabhadra river on a traditional circular coracle boat, and climb Matanga Hill for breathtaking sunsets.',
    startPrice: 6299,
    durationDays: 3,
    durationNights: 2,
    category: 'Heritage',
    tags: ['Stone Temples', 'Boulder Ruins', 'Coracle Boats'],
    image: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=80&w=1200&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=80&w=1400&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596423735880-5f2a689b90b8?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=1200&auto=format&fit=crop'
    ],
    rating: 4.91,
    reviewsCount: 1890,
    highlights: ['Vijaya Vittala Temple Musical Pillars & Stone Chariot', 'Virupaksha Active Temple Complex & Elephant Blessings', 'Tungabhadra River Coracle Boat Safari', 'Matanga Hill 360-Degree Boulder Valley Sunset'],
    state: 'Karnataka',
    bestSeason: 'Oct – Mar',
    priceBreakdown: {
      stays: 2800,
      transport: 1900,
      activitiesAndGuide: 900,
      mealsAndTaxes: 699
    }
  },
  {
    id: 'ladakh',
    name: 'Ladakh',
    subtitle: 'Pangong Lake, Khardung La & Monasteries',
    tagline: 'Land of High Mountain Passes & Cerulean Glacial Lakes',
    description: 'Traverse the world’s highest motorable passes like Khardung La, camp beneath starlit galaxies beside the shifting blue hues of Pangong Tso, and experience the ancient Buddhist chanting at Thiksey and Hemis monasteries.',
    startPrice: 16999,
    durationDays: 6,
    durationNights: 5,
    category: 'Mountains',
    tags: ['High Altitude', 'Glacial Lakes', 'Monasteries'],
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1200&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1400&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1200&auto=format&fit=crop'
    ],
    rating: 4.96,
    reviewsCount: 1840,
    highlights: ['Pangong Tso Crystal Shoreline & Stargazing Camp', 'Khardung La Pass (17,982 ft)', 'Nubra Valley Hunder Sand Dunes & Bactrian Camels', 'Thiksey Monastery Sunrise Prayer'],
    state: 'Ladakh',
    bestSeason: 'May – Sep',
    altitude: '11,500 - 18,380 ft',
    priceBreakdown: {
      stays: 7500,
      transport: 5400,
      activitiesAndGuide: 2400,
      mealsAndTaxes: 1699
    }
  },
  {
    id: 'andaman',
    name: 'Andaman & Nicobar',
    subtitle: 'Radhanagar Beach, Havelock & Coral Reefs',
    tagline: 'Tropical Archipelago of Turquoise Lagoons & White Sands',
    description: 'Swim in the crystal-clear azure waters of Radhanagar Beach (voted Asia’s best), snorkel among vibrant coral gardens at Elephant Beach, kayak through bioluminescent night waters, and discover historic Cellular Jail.',
    startPrice: 14999,
    durationDays: 5,
    durationNights: 4,
    category: 'Beaches',
    tags: ['Turquoise Lagoons', 'Scuba & Snorkel', 'Tropical Islands'],
    image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=1200&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=1400&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop'
    ],
    rating: 4.95,
    reviewsCount: 2210,
    highlights: ['Radhanagar Beach White Sand & Sunset Lagoon', 'Elephant Beach Coral Snorkeling & Sea Walking', 'Inter-Island Catamaran Cruise to Havelock & Neil', 'Cellular Jail National Memorial Sound & Light Show'],
    state: 'Andaman & Nicobar Islands',
    bestSeason: 'Oct – May',
    priceBreakdown: {
      stays: 6800,
      transport: 4600,
      activitiesAndGuide: 2200,
      mealsAndTaxes: 1399
    }
  },
  {
    id: 'ranthambore',
    name: 'Ranthambore',
    subtitle: 'Royal Bengal Tiger Safaris & Ancient Fort',
    tagline: 'Wild Tiger Territory Amidst 10th-Century Ruins',
    description: 'Embark on thrilling open-top 4x4 Gypsy jungle safaris to track majestic Royal Bengal Tigers in their natural habitat, visit the towering 10th-century UNESCO Ranthambore Fort, and spot marsh crocodiles and sambar deer at Padam Talao.',
    startPrice: 8999,
    durationDays: 3,
    durationNights: 2,
    category: 'Wildlife',
    tags: ['Tiger Safari', 'Jungle Fort', 'Wildlife Photography'],
    image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=80&w=1200&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=80&w=1400&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?q=80&w=1200&auto=format&fit=crop'
    ],
    rating: 4.89,
    reviewsCount: 1640,
    highlights: ['2x Guaranteed Core Zone 4x4 Gypsy Tiger Safaris', '10th-Century Ranthambore Fort & Trinetra Ganesha Temple', 'Padam Talao & Rajbagh Lake Wildlife Viewpoints', 'Luxury Jungle Wilderness Camp Stay'],
    state: 'Rajasthan',
    bestSeason: 'Oct – Jun',
    priceBreakdown: {
      stays: 3900,
      transport: 2400,
      activitiesAndGuide: 1800,
      mealsAndTaxes: 899
    }
  },
  {
    id: 'amritsar',
    name: 'Amritsar',
    subtitle: 'Golden Temple, Wagah Border & Punjabi Food',
    tagline: 'Spiritual Radiance, Historic Bravery & Culinary Heart',
    description: 'Immerse yourself in the supreme peace of Sri Harmandir Sahib (Golden Temple) shimmering on the sacred Amrit Sarovar, partake in the world’s largest free community kitchen (Langar), witness the high-voltage Wagah Border ceremony, and savor crispy Amritsari Kulchas.',
    startPrice: 4999,
    durationDays: 2,
    durationNights: 1,
    category: 'Spiritual',
    tags: ['Golden Temple', 'Wagah Border', 'Punjabi Cuisine'],
    image: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=1200&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=1400&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1597040663342-45b6af2b21ca?q=80&w=1200&auto=format&fit=crop'
    ],
    rating: 4.98,
    reviewsCount: 4620,
    highlights: ['Golden Temple Night Palki Sahib Ceremony & Sacred Sarovar', 'Langar Seva Experience & 24/7 Community Kitchen', 'Wagah Border Patriotic Sunset Retreat Ceremony', 'Legendary Heritage Street Food Trail & Amritsari Kulcha'],
    state: 'Punjab',
    bestSeason: 'Oct – Mar',
    priceBreakdown: {
      stays: 2100,
      transport: 1500,
      activitiesAndGuide: 800,
      mealsAndTaxes: 599
    }
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
  location: string;
}

export const INDIA_EXPERIENCES: IndiaExperienceItem[] = [
  {
    id: 'kerala-houseboat-cruise',
    title: 'Luxury Alleppey Backwater Houseboat Cruise',
    price: 4999,
    image: '/images/kerala_card.jpg',
    category: 'Backwaters & Lagoons',
    description: 'Drift along calm palm-lined emerald waterways on an authentic wooden Kettuvallam with freshly prepared traditional Kerala fish curry and coastal meals.',
    duration: 'Full Day & Overnight',
    location: 'Alleppey, Kerala'
  },
  {
    id: 'varanasi-ganga-aarti',
    title: 'Sunrise Ganges Boat & Front-Row Maha Aarti',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?q=80&w=1000&auto=format&fit=crop',
    category: 'Sacred Rituals',
    description: 'Experience holy dawn prayers along the stone ghats and reserve private front-row boat seating for the mesmerizing Dashashwamedh evening fire ceremony.',
    duration: 'Morning & Evening',
    location: 'Varanasi, UP'
  },
  {
    id: 'rajasthan-royal-desert-safari',
    title: 'Thar Desert Camel Safari & Royal Folk Night',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1000&auto=format&fit=crop',
    category: 'Royal Desert Safari',
    description: 'Ride across golden dunes at sunset, enjoy Kalbelia fire dancers and live folk sarangi music beside a starlit camp bonfire in traditional tents.',
    duration: '1 Night / 2 Days',
    location: 'Jaisalmer & Jaipur, Rajasthan'
  },
  {
    id: 'ranthambore-tiger-safari',
    title: '4x4 Open-Top Jungle Tiger Tracking Safari',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=80&w=1000&auto=format&fit=crop',
    category: 'Wildlife Adventure',
    description: 'Track Royal Bengal Tigers with certified forest naturalists through dense teak woods, ancient stone ruins, and marsh lakes.',
    duration: 'Half Day (3.5 Hours)',
    location: 'Ranthambore, Rajasthan'
  },
  {
    id: 'andaman-scuba-coral-safari',
    title: 'Havelock Coral Reef Scuba & Snorkel Dive',
    price: 3999,
    image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=1000&auto=format&fit=crop',
    category: 'Ocean & Reef Diving',
    description: 'Explore radiant turquoise coral reefs, clownfish colonies, and marine turtles with certified PADI dive instructors in warm tropical seas.',
    duration: 'Full Day Experience',
    location: 'Havelock, Andamans'
  },
  {
    id: 'himalayan-trekking-stargazing',
    title: 'Himalayan Ridge Trek & Stargazing Camp',
    price: 5999,
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1000&auto=format&fit=crop',
    category: 'Mountain Passes',
    description: 'Hike through pine forests and high glacial valleys, camp under pristine Bortle-1 dark skies, and cross mountain streams with certified Sherpa guides.',
    duration: '3 Days / 2 Nights',
    location: 'Ladakh & Manali'
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
    review: 'Booking our Rajasthan & Jaipur trip through Yatri was effortless. The Amber Fort private guide was incredible, and staying in an authentic heritage haveli for under ₹7,000 made the value unbeatable. Transparent pricing in ₹ was refreshing!',
    stars: 5,
    destination: 'Jaipur & Amer',
    photos: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?q=80&w=200&auto=format&fit=crop'
    ]
  },
  {
    id: 't-2',
    name: 'Priya Patel',
    location: 'Mumbai',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    review: 'Our family tour to Kerala Backwaters and Munnar tea gardens was pure bliss. Cruising Alleppey on a private traditional houseboat with fresh Karimeen fish prepared on-board was magical. The itinerary pacing was relaxed and seamless!',
    stars: 5,
    destination: 'Kerala Backwaters',
    photos: [
      '/images/kerala_houseboat.jpg',
      '/images/kerala_munnar.jpg',
      '/images/kerala_bg.jpg'
    ]
  },
  {
    id: 't-3',
    name: 'Rohan Sengupta',
    location: 'Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    review: 'Varanasi at sunrise in a wooden rowing boat followed by evening Dashashwamedh Aarti was deeply moving. Yatri took care of local guides, temple fast-track darshan, and airport transfers without any hidden surge costs.',
    stars: 5,
    destination: 'Varanasi Sacred Ghats',
    photos: [
      'https://images.unsplash.com/photo-1571536802807-30451e3955d8?q=80&w=200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1597040663342-45b6af2b21ca?q=80&w=200&auto=format&fit=crop'
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

export interface QuickPlanActivity {
  id: string;
  name: string;
  price: number;
}

export interface QuickPlanDestination {
  id: string;
  name: string;
  state: string;
  image: string;
  durationDays: number;
  durationNights: number;
  basePrice: number;
  badge: string;
  activities: QuickPlanActivity[];
}

export const QUICK_PLAN_DESTINATIONS: QuickPlanDestination[] = [
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=400&auto=format&fit=crop',
    durationDays: 3,
    durationNights: 2,
    basePrice: 5499,
    badge: 'Royal Palaces',
    activities: [
      { id: 'j-1', name: 'Amber Fort Guided Walk & Palace', price: 850 },
      { id: 'j-2', name: 'Hawa Mahal Rooftop Sunrise Cafe & Chai', price: 450 },
      { id: 'j-3', name: 'Traditional Rajasthani Thali Dinner', price: 650 },
      { id: 'j-4', name: 'Nahargarh Sunset Fort Panoramic View', price: 500 }
    ]
  },
  {
    id: 'kerala',
    name: 'Kerala',
    state: 'South India',
    image: '/images/kerala_houseboat.jpg',
    durationDays: 4,
    durationNights: 3,
    basePrice: 7499,
    badge: 'Backwaters & Tea',
    activities: [
      { id: 'k-1', name: 'Alleppey Houseboat Cruise & Lunch', price: 1600 },
      { id: 'k-2', name: 'Munnar Tea Estate Plantation Walk', price: 550 },
      { id: 'k-3', name: 'Traditional Kathakali Art Show', price: 450 },
      { id: 'k-4', name: 'Sunset Canoe Paddle in Lagoons', price: 600 }
    ]
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    image: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?q=80&w=400&auto=format&fit=crop',
    durationDays: 3,
    durationNights: 2,
    basePrice: 4299,
    badge: 'Ganga Aarti',
    activities: [
      { id: 'v-1', name: 'Dashashwamedh Front-Row Aarti Boat', price: 650 },
      { id: 'v-2', name: 'Sunrise Ganges Wooden Rowing Ride', price: 550 },
      { id: 'v-3', name: 'Kashi Vishwanath Corridor Walk', price: 400 },
      { id: 'v-4', name: 'Banarasi Silk Weaving Heritage Trail', price: 450 }
    ]
  },
  {
    id: 'somnath',
    name: 'Somnath & Gir',
    state: 'Gujarat',
    image: '/images/gujarat_somnath_card.jpg',
    durationDays: 3,
    durationNights: 2,
    basePrice: 5299,
    badge: 'Sacred Coast',
    activities: [
      { id: 's-1', name: 'Somnath Shore Temple Evening Aarti', price: 350 },
      { id: 's-2', name: 'Sound & Light Ocean Laser Spectacle', price: 350 },
      { id: 's-3', name: 'Gir National Park Asiatic Lion Safari', price: 1600 },
      { id: 's-4', name: 'Triveni Sangam Holy Dip Trail', price: 300 }
    ]
  },
  {
    id: 'ladakh',
    name: 'Ladakh',
    state: 'Himalayas',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=400&auto=format&fit=crop',
    durationDays: 5,
    durationNights: 4,
    basePrice: 12999,
    badge: 'Mountain Passes',
    activities: [
      { id: 'l-1', name: 'Pangong Tso High-Altitude Lake Stargaze', price: 2100 },
      { id: 'l-2', name: 'Khardung La 18,380ft Pass Crossing', price: 1200 },
      { id: 'l-3', name: 'Nubra Valley Sand Dunes & Bactrian Camel', price: 950 },
      { id: 'l-4', name: 'Thiksey Monastery Dawn Chanting', price: 400 }
    ]
  },
  {
    id: 'amritsar',
    name: 'Amritsar',
    state: 'Punjab',
    image: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=400&auto=format&fit=crop',
    durationDays: 2,
    durationNights: 1,
    basePrice: 3899,
    badge: 'Golden Temple',
    activities: [
      { id: 'a-1', name: 'Golden Temple Amrit Sarovar Darshan', price: 300 },
      { id: 'a-2', name: 'Wagah Border Sunset Flag Ceremony', price: 650 },
      { id: 'a-3', name: 'Crispy Amritsari Kulcha & Food Trail', price: 450 },
      { id: 'a-4', name: 'Community Langar Kitchen Seva', price: 200 }
    ]
  },
  {
    id: 'hampi',
    name: 'Hampi',
    state: 'Karnataka',
    image: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=80&w=400&auto=format&fit=crop',
    durationDays: 3,
    durationNights: 2,
    basePrice: 4999,
    badge: 'UNESCO Ruins',
    activities: [
      { id: 'h-1', name: 'Vijaya Vittala Stone Chariot Guide', price: 600 },
      { id: 'h-2', name: 'Tungabhadra Coracle Boat Safari', price: 450 },
      { id: 'h-3', name: 'Matanga Hill Sunrise Panorama Trek', price: 350 },
      { id: 'h-4', name: 'Lotus Mahal & Royal Enclosures', price: 400 }
    ]
  }
];


