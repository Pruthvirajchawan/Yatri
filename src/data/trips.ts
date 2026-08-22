import { Trip } from '../types';

export const DEFAULT_RAJASTHAN_TRIP: Trip = {
  id: 'trip-rajasthan-escape',
  title: 'Rajasthan Escape',
  destinationSummary: 'Jaipur · Jodhpur · Udaipur',
  startDate: '2026-10-12',
  endDate: '2026-10-18',
  totalDays: 7,
  travelerCount: 4,
  estimatedTotalBudget: 118000,
  budgetPerPerson: 29500,
  coverImage: 'https://images.unsplash.com/photo-1603262110263-fb010d6e75dc?q=80&w=1200&auto=format&fit=crop',
  status: 'Upcoming',
  travelStyle: 'Balanced',
  health: {
    score: 84,
    budgetStatus: 'Healthy',
    travelLoad: 'Moderate',
    freeTime: 'Good',
    groupBalance: 'Strong'
  },
  experienceBudget: {
    totalHours: 50,
    usedHours: 42,
    explorationHours: 28,
    transitHours: 8,
    freeTimeHours: 6,
    recoveryHours: 4
  },
  tripDebt: {
    score: 24,
    status: 'Healthy',
    message: 'Your itinerary is comfortable, but Day 4 is becoming slightly dense due to consecutive late-afternoon activities.',
    contributors: ['Long transfer (Jaipur → Jodhpur)', 'Consecutive afternoon fort walks', 'Early morning departure on Day 5'],
    recoverySuggestion: 'Schedule an extra 1.5h shaded rooftop tea break in Jodhpur to keep energy sustained.'
  },
  regretMap: [
    {
      id: 'regret-1',
      activityTitle: 'Mehrangarh Fort Audio Tour & Ramparts',
      destination: 'Jodhpur',
      tier: 'dont-miss',
      reason: 'Ranked top historical experience in India; unmatched panoramic views and Rajput palace craftsmanship.',
      impactScore: 98
    },
    {
      id: 'regret-2',
      activityTitle: 'Amber Fort Elephant / Jeep Ascent & Sheesh Mahal',
      destination: 'Jaipur',
      tier: 'dont-miss',
      reason: 'World-famous mirror palace and hilltop defensive architecture.',
      impactScore: 95
    },
    {
      id: 'regret-3',
      activityTitle: 'Johari Bazaar & Bapu Bazaar Jewelry & Spice Walk',
      destination: 'Jaipur',
      tier: 'nice-to-have',
      reason: 'Authentic local shopping, but can be overwhelming during peak afternoon hours.',
      impactScore: 70
    },
    {
      id: 'regret-4',
      activityTitle: 'Clock Tower & Sardar Market Spice Stalls',
      destination: 'Jodhpur',
      tier: 'nice-to-have',
      reason: 'Vibrant local photography and famous Shahi Samosa, high energy atmosphere.',
      impactScore: 68
    },
    {
      id: 'regret-5',
      activityTitle: 'Wax Museum at Nahargarh',
      destination: 'Jaipur',
      tier: 'easy-to-skip',
      reason: 'Generic modern installation with low cultural connection; saves ₹1,200 and 1.5h.',
      impactScore: 25
    },
    {
      id: 'regret-6',
      activityTitle: 'Commercial Camel Ride tourist loop',
      destination: 'Jodhpur Outskirts',
      tier: 'easy-to-skip',
      reason: 'Rushed commercial tourist trap; skip in favor of sunset view at Jaswant Thada.',
      impactScore: 18
    }
  ],
  tradeOffs: [
    {
      id: 'tradeoff-add-udaipur',
      title: 'Option A: Add Udaipur (Lake City)',
      subtitle: 'Extend circuit to include Lake Pichola and City Palace',
      badge: 'High Experience Gain',
      gains: ['Lake Pichola Sunset Boat Cruise', 'Udaipur City Palace Complex', 'Bagore Ki Haveli Folk Show', 'Authentic Mewari Dining'],
      sacrifices: ['+5h 20m Intercity Road Travel', '+₹6,800/person Additional Lodging & Transit', '-4h Total Relaxation Free Time'],
      healthImpact: -12,
      budgetChange: 27200,
      transitTimeChangeHours: 5.3,
      selected: false
    },
    {
      id: 'tradeoff-replace-stop',
      title: 'Option B: Replace Jodhpur with Udaipur',
      subtitle: 'Swap the Blue City for Lake City without increasing trip days',
      badge: 'Balanced Pace',
      gains: ['Romantic Lake Vistas', 'Cooler climate & lakeside dining', 'Smoother luxury stays'],
      sacrifices: ['Skip Mehrangarh Fort', 'Skip Blue City alleys', '+1.5h flight connect time'],
      healthImpact: +2,
      budgetChange: 8400,
      transitTimeChangeHours: 1.5,
      selected: false
    },
    {
      id: 'tradeoff-relaxed-jaipur-jodhpur',
      title: 'Option C: Keep Relaxed 2-City Plan',
      subtitle: 'Preserve deep exploration, slower pace, and low travel debt',
      badge: 'Optimal Health (Current)',
      gains: ['Generous 3 nights per destination', 'Zero rushed travel days', 'Ample cafe downtime', 'Lowest trip debt (24/100)'],
      sacrifices: ['Skip Udaipur lake experiences until next season'],
      healthImpact: 0,
      budgetChange: 0,
      transitTimeChangeHours: 0,
      selected: true
    }
  ],
  groupEquity: {
    equityScore: 78,
    status: 'Underrepresented',
    insight: "Sneha's preference for Relaxation & Sunset downtime is currently underrepresented compared to Aaron's Food and Meera's Fort walks.",
    recommendationTitle: 'Add Lakeside Sunset & Rooftop Dinner on Day 4',
    recommendationDescription: 'Replacing a crowded bazaar stroll with a relaxing sunset at Stepwell Cafe balances Sneha’s relaxation goals while keeping Meera’s culture view intact.',
    recommendedActivity: {
      id: 'act-group-balance',
      title: 'Toorji Ka Jhalra Stepwell Rooftop Sunset & Chai',
      category: 'relaxation',
      time: '17:30 - 19:30',
      durationHours: 2,
      cost: 1600,
      location: 'Toorji Ka Jhalra, Jodhpur',
      priority: 'recommended',
      description: 'Quiet heritage stepwell view with artisanal tea and relaxation for the whole group.',
      tags: ['Relaxation', 'Heritage', 'Views']
    },
    travelers: [
      {
        id: 't-1',
        name: 'Aarav',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
        primaryPreference: 'Food & Culinary Trails',
        secondaryPreference: 'Night Markets',
        preferenceWeight: 92,
        satisfactionScore: 88,
        budgetLimit: 32000
      },
      {
        id: 't-2',
        name: 'Meera',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
        primaryPreference: 'Heritage & Fort Architecture',
        secondaryPreference: 'Photography',
        preferenceWeight: 88,
        satisfactionScore: 90,
        budgetLimit: 30000
      },
      {
        id: 't-3',
        name: 'Rahul',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
        primaryPreference: 'Adventure & Viewpoints',
        secondaryPreference: 'Fort Treks',
        preferenceWeight: 75,
        satisfactionScore: 82,
        budgetLimit: 28000
      },
      {
        id: 't-4',
        name: 'Sneha',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
        primaryPreference: 'Relaxation & Slow Cafes',
        secondaryPreference: 'Sunset Downtime',
        preferenceWeight: 84,
        satisfactionScore: 64,
        budgetLimit: 28000
      }
    ]
  },
  budgetCategories: [
    { name: 'Stay & Havelis', amount: 38000, percentage: 32, color: '#168BFF' },
    { name: 'Transport & Vande Bharat', amount: 32000, percentage: 27, color: '#35A86B' },
    { name: 'Food & Royal Dinners', amount: 18000, percentage: 15, color: '#E7A93B' },
    { name: 'Activities & Fort Audio Guides', amount: 14000, percentage: 12, color: '#9333EA' },
    { name: 'Buffer & Incidentals', amount: 16000, percentage: 14, color: '#64748B' }
  ],
  budgetSuggestions: [
    {
      id: 'save-1',
      title: 'Vande Bharat / Express Train instead of Private Intercity Cab',
      savingsAmount: 3200,
      tradeOffDescription: 'Smooth air-conditioned 4h 15m rail journey with breakfast included instead of highway bumper traffic.',
      applied: false,
      category: 'Transport'
    },
    {
      id: 'save-2',
      title: 'Heritage Boutique Haveli instead of 5-Star Chain in Jodhpur',
      savingsAmount: 2800,
      tradeOffDescription: 'Authentic 18th-century carved courtyard stay with rooftop Mehrangarh view in old town.',
      applied: false,
      category: 'Stay'
    },
    {
      id: 'save-3',
      title: 'Remove Low-Value Wax Museum and tourist bazaar commission stops',
      savingsAmount: 1500,
      tradeOffDescription: 'Saves entry tickets and guide markup while reclaiming 2 hours of free afternoon rest.',
      applied: false,
      category: 'Activities'
    }
  ],
  itinerary: [
    {
      dayNumber: 1,
      date: 'Oct 12, 2026',
      city: 'Jaipur',
      theme: 'Arrival & Royal Pink City Introduction',
      loadLevel: 'low',
      activities: [
        {
          id: 'act-1-1',
          title: 'Arrival & Check-in at Alsisar Haveli',
          category: 'relaxation',
          time: '11:00 - 13:00',
          durationHours: 2,
          cost: 0,
          location: 'Sansar Chandra Rd, Jaipur',
          priority: 'must-do',
          description: 'Settle in, freshen up with welcome saffron tea in the traditional courtyard.',
          completed: false
        },
        {
          id: 'act-1-2',
          title: 'Jaipur City Palace & Chandra Mahal Museum',
          category: 'culture',
          time: '14:30 - 16:30',
          durationHours: 2,
          cost: 2800,
          location: 'City Palace Complex, Old City',
          priority: 'must-do',
          description: 'Guided tour of the royal residence, Peacock Gate, and textile gallery.',
          completed: false
        },
        {
          id: 'act-1-3',
          title: 'Hawa Mahal Exterior & Wind View Cafe Chai',
          category: 'sightseeing',
          time: '17:00 - 18:30',
          durationHours: 1.5,
          cost: 600,
          location: 'Badi Choupad, Jaipur',
          priority: 'must-do',
          description: 'Golden hour photography of the 953 honeycombed jharokhas with masala chai.',
          completed: false
        },
        {
          id: 'act-1-4',
          title: 'Welcome Dinner: Traditional Rajasthani Thali at 1135 AD',
          category: 'food',
          time: '20:00 - 22:00',
          durationHours: 2,
          cost: 3800,
          location: 'Amber Fort Road, Jaipur',
          priority: 'recommended',
          description: 'Dal Baati Churma, Gatte ki Sabzi, and royal live sitar accompaniment.',
          completed: false
        }
      ]
    },
    {
      dayNumber: 2,
      date: 'Oct 13, 2026',
      city: 'Jaipur',
      theme: 'Amber Ramparts & Artisan Bazaars',
      loadLevel: 'moderate',
      activities: [
        {
          id: 'act-2-1',
          title: 'Amber Fort Morning Heritage Walk & Sheesh Mahal',
          category: 'sightseeing',
          time: '08:30 - 11:30',
          durationHours: 3,
          cost: 2200,
          location: 'Devisinghpura, Amer',
          priority: 'must-do',
          description: 'Explore the grand gates, mirror hall (Sheesh Mahal), and Maota Lake views.',
          completed: false
        },
        {
          id: 'act-2-2',
          title: 'Panna Meena Ka Kund Stepwell Photography',
          category: 'culture',
          time: '12:00 - 13:00',
          durationHours: 1,
          cost: 200,
          location: 'Near Amber Fort, Jaipur',
          priority: 'recommended',
          description: 'Geometrical 16th-century criss-cross stairwell; ideal for symmetry photography.',
          completed: false
        },
        {
          id: 'act-2-3',
          title: 'Johari Bazaar & Block Print Artisan Walk',
          category: 'culture',
          time: '16:00 - 18:30',
          durationHours: 2.5,
          cost: 1200,
          location: 'Johari Bazaar, Old City',
          priority: 'recommended',
          description: 'Discover natural indigo woodblock textile workshops and lac bangle makers.',
          completed: false
        },
        {
          id: 'act-2-4',
          title: 'Rooftop Dinner at Baradari with Courtyard View',
          category: 'food',
          time: '19:30 - 21:30',
          durationHours: 2,
          cost: 3200,
          location: 'Jaleb Chowk, Jaipur',
          priority: 'optional',
          description: 'Contemporary Rajasthani dining in illuminated marble arches.',
          completed: false
        }
      ]
    },
    {
      dayNumber: 3,
      date: 'Oct 14, 2026',
      city: 'Jaipur → Jodhpur',
      theme: 'Transit to Sun City & Blue Quarter Sunset',
      loadLevel: 'moderate',
      activities: [
        {
          id: 'act-3-1',
          title: 'Morning Intercity Express / Private Scenic Highway Drive',
          category: 'transit',
          time: '08:00 - 12:45',
          durationHours: 4.75,
          cost: 4800,
          location: 'Jaipur to Jodhpur (330 km)',
          priority: 'must-do',
          description: 'Comfortable highway transit through Sambhar salt flats and Marwar plains.',
          completed: false
        },
        {
          id: 'act-3-2',
          title: 'Check-in at RAAS Jodhpur / Heritage Haveli',
          category: 'relaxation',
          time: '13:30 - 15:00',
          durationHours: 1.5,
          cost: 0,
          location: 'Tunwar ji ka Jhalra, Makrana Mohalla',
          priority: 'must-do',
          description: 'Unpack with direct view of Mehrangarh Fort rising overhead.',
          completed: false
        },
        {
          id: 'act-3-3',
          title: 'Blue City Brahmin Alley Heritage Walk',
          category: 'culture',
          time: '16:30 - 18:30',
          durationHours: 2,
          cost: 1500,
          location: 'Navchokiya, Old Jodhpur',
          priority: 'must-do',
          description: 'Guided trail through indigo blue walls, historic doorways, and spice vendors.',
          completed: false
        },
        {
          id: 'act-3-4',
          title: 'Rooftop Dinner overlooking Lit Mehrangarh Fort',
          category: 'food',
          time: '20:00 - 22:00',
          durationHours: 2,
          cost: 2900,
          location: 'Indique Restaurant, Jodhpur',
          priority: 'must-do',
          description: 'Laal Maas, Ker Sangri, and unobstructed night views of the glowing fortress.',
          completed: false
        }
      ]
    },
    {
      dayNumber: 4,
      date: 'Oct 15, 2026',
      city: 'Jodhpur',
      theme: 'The Grand Mehrangarh Fort & Jaswant Thada',
      loadLevel: 'dense',
      activities: [
        {
          id: 'act-4-1',
          title: 'Mehrangarh Fort In-Depth Guided Audio Tour',
          category: 'sightseeing',
          time: '09:00 - 12:30',
          durationHours: 3.5,
          cost: 2600,
          location: 'Mehrangarh Fort Road',
          priority: 'must-do',
          description: 'The crown jewel of Rajasthan forts; palanquins, weaponry, and cliffside ramparts.',
          completed: false
        },
        {
          id: 'act-4-2',
          title: 'Jaswant Thada White Marble Cenotaph Walk',
          category: 'sightseeing',
          time: '13:30 - 14:45',
          durationHours: 1.25,
          cost: 400,
          location: 'Near Mehrangarh Fort',
          priority: 'recommended',
          description: 'Carved translucent marble memorial surrounded by tiered gardens and lake.',
          completed: false
        },
        {
          id: 'act-4-3',
          title: 'Clock Tower Market, Mirchi Vada & Makhaniya Lassi',
          category: 'food',
          time: '16:00 - 17:30',
          durationHours: 1.5,
          cost: 650,
          location: 'Sardar Market, Jodhpur',
          priority: 'recommended',
          description: 'Tasting Jodhpur’s signature street snacks at historic Shri Mishrilal Hotel.',
          completed: false
        },
        {
          id: 'act-4-4',
          title: 'Sunset Relaxation at Stepwell Cafe',
          category: 'relaxation',
          time: '18:00 - 19:30',
          durationHours: 1.5,
          cost: 1100,
          location: 'Toorji Ka Jhalra',
          priority: 'recommended',
          description: 'Unwind with cool lemongrass iced tea as lamps light up the ancient stepwell.',
          completed: false
        }
      ]
    },
    {
      dayNumber: 5,
      date: 'Oct 16, 2026',
      city: 'Jodhpur → Ranakpur → Udaipur',
      theme: 'Jain Marble Temple & Lake City Arrival',
      loadLevel: 'moderate',
      activities: [
        {
          id: 'act-5-1',
          title: 'Scenic Drive via Ranakpur Marble Jain Temple',
          category: 'transit',
          time: '08:30 - 14:00',
          durationHours: 5.5,
          cost: 5200,
          location: 'Ranakpur, Pali District',
          priority: 'must-do',
          description: 'Visit the 1,444 uniquely carved marble pillars in the deep Aravalli valley.',
          completed: false
        },
        {
          id: 'act-5-2',
          title: 'Lake Pichola Lakeside Check-in at Jagat Niwas Palace',
          category: 'relaxation',
          time: '15:00 - 16:30',
          durationHours: 1.5,
          cost: 0,
          location: 'Lal Ghat, Udaipur',
          priority: 'must-do',
          description: 'Traditional Mewari jharokha overlooking the white palace in the water.',
          completed: false
        },
        {
          id: 'act-5-3',
          title: 'Bagore Ki Haveli Dharohar Evening Folk Dance',
          category: 'culture',
          time: '18:45 - 20:15',
          durationHours: 1.5,
          cost: 900,
          location: 'Gangaur Ghat Marg, Udaipur',
          priority: 'must-do',
          description: 'Puppet theatre, Chari fire dance, and 9-pot balance dance by Rajasthani women.',
          completed: false
        }
      ]
    },
    {
      dayNumber: 6,
      date: 'Oct 17, 2026',
      city: 'Udaipur',
      theme: 'City Palace & Sunset Pichola Boat Cruise',
      loadLevel: 'low',
      activities: [
        {
          id: 'act-6-1',
          title: 'Udaipur City Palace & Mor Chowk Peacock Mosaics',
          category: 'sightseeing',
          time: '09:30 - 12:30',
          durationHours: 3,
          cost: 3200,
          location: 'City Palace Complex, Udaipur',
          priority: 'must-do',
          description: 'Grand palace museum with mirror inlay courts, crystal gallery, and courtyards.',
          completed: false
        },
        {
          id: 'act-6-2',
          title: 'Slow Lunch at Ambrai Restaurant Ghat View',
          category: 'food',
          time: '13:00 - 15:00',
          durationHours: 2,
          cost: 2600,
          location: 'Amet Haveli, Hanuman Ghat',
          priority: 'recommended',
          description: 'Lakeside dining right at water level with views of Lake Palace and Jag Mandir.',
          completed: false
        },
        {
          id: 'act-6-3',
          title: 'Private Sunset Wooden Boat Cruise to Jag Mandir',
          category: 'relaxation',
          time: '17:00 - 18:45',
          durationHours: 1.75,
          cost: 2400,
          location: 'Rameshwar Ghat, Lake Pichola',
          priority: 'must-do',
          description: 'Golden reflection over Lake Pichola with stop at the 17th-century island palace.',
          completed: false
        }
      ]
    },
    {
      dayNumber: 7,
      date: 'Oct 18, 2026',
      city: 'Udaipur',
      theme: 'Saheliyon Ki Bari & Farewell Saffron Souvenirs',
      loadLevel: 'low',
      activities: [
        {
          id: 'act-7-1',
          title: 'Saheliyon Ki Bari Fountains & Marble Elephants',
          category: 'sightseeing',
          time: '09:30 - 11:00',
          durationHours: 1.5,
          cost: 400,
          location: 'Saheli Marg, Udaipur',
          priority: 'recommended',
          description: 'Lush historic royal maiden gardens with gravity-fed rain fountains.',
          completed: false
        },
        {
          id: 'act-7-2',
          title: 'Miniature Rajput Painting Workshop & Souvenirs',
          category: 'culture',
          time: '11:30 - 13:00',
          durationHours: 1.5,
          cost: 1500,
          location: 'Hathi Pol Bazaar, Udaipur',
          priority: 'recommended',
          description: 'Watch master artists create natural stone-powder miniature artworks on silk.',
          completed: false
        },
        {
          id: 'act-7-3',
          title: 'Farewell Lunch & Airport Transfer',
          category: 'transit',
          time: '13:30 - 15:30',
          durationHours: 2,
          cost: 1400,
          location: 'Udaipur Maharana Pratap Airport (UDR)',
          priority: 'must-do',
          description: 'Reflect on a healthy, balanced journey and prepare for flight home.',
          completed: false
        }
      ]
    }
  ]
};

export const ALL_MOCK_TRIPS: Trip[] = [
  DEFAULT_RAJASTHAN_TRIP,
  {
    id: 'trip-kerala-backwaters',
    title: 'Kerala Backwaters & Tea Hills',
    destinationSummary: 'Alleppey · Munnar · Fort Kochi',
    startDate: '2026-11-05',
    endDate: '2026-11-10',
    totalDays: 5,
    travelerCount: 2,
    estimatedTotalBudget: 42000,
    budgetPerPerson: 21000,
    coverImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop',
    status: 'Draft',
    travelStyle: 'Relaxed',
    health: {
      score: 92,
      budgetStatus: 'Healthy',
      travelLoad: 'Light',
      freeTime: 'Generous',
      groupBalance: 'Strong'
    },
    experienceBudget: {
      totalHours: 36,
      usedHours: 26,
      explorationHours: 16,
      transitHours: 5,
      freeTimeHours: 11,
      recoveryHours: 4
    },
    tripDebt: {
      score: 12,
      status: 'Healthy',
      message: 'Extremely peaceful and regenerative pacing throughout.',
      contributors: ['Spacious houseboat day', 'Minimal highway transit'],
      recoverySuggestion: 'Perfect balance maintained.'
    },
    regretMap: [
      {
        id: 'regret-k-1',
        activityTitle: 'Overnight Private Kettuvallam Cruise',
        destination: 'Alleppey',
        tier: 'dont-miss',
        reason: 'Unmatched Kerala experience with sunset canal drift.',
        impactScore: 99
      }
    ],
    tradeOffs: [],
    groupEquity: {
      equityScore: 94,
      status: 'Balanced',
      insight: 'Both travelers have aligned preferences for wellness, slow boats, and tea hills.',
      recommendationTitle: 'Trip already optimal',
      recommendationDescription: 'No major conflicts identified.',
      recommendedActivity: {} as any,
      travelers: [
        {
          id: 'tk-1',
          name: 'Arjun',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
          primaryPreference: 'Nature & Tea Plantations',
          secondaryPreference: 'Ayurveda',
          preferenceWeight: 90,
          satisfactionScore: 94
        },
        {
          id: 'tk-2',
          name: 'Pooja',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
          primaryPreference: 'Slow Boating & Seafood',
          secondaryPreference: 'Photography',
          preferenceWeight: 92,
          satisfactionScore: 95
        }
      ]
    },
    budgetCategories: [
      { name: 'Houseboat & Stays', amount: 22000, percentage: 52, color: '#168BFF' },
      { name: 'Private Cab Transit', amount: 9500, percentage: 23, color: '#35A86B' },
      { name: 'Coastal Dining', amount: 6500, percentage: 15, color: '#E7A93B' },
      { name: 'Activities & Ayurveda', amount: 4000, percentage: 10, color: '#9333EA' }
    ],
    budgetSuggestions: [],
    itinerary: []
  },
  {
    id: 'trip-goa-susegad',
    title: 'Goa Coastal & Heritage Susegad',
    destinationSummary: 'South Goa · Fontainhas · Sal River',
    startDate: '2026-12-02',
    endDate: '2026-12-05',
    totalDays: 3,
    travelerCount: 3,
    estimatedTotalBudget: 24000,
    budgetPerPerson: 8000,
    coverImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop',
    status: 'Completed',
    travelStyle: 'Relaxed',
    health: {
      score: 89,
      budgetStatus: 'Healthy',
      travelLoad: 'Light',
      freeTime: 'Generous',
      groupBalance: 'Strong'
    },
    experienceBudget: {
      totalHours: 24,
      usedHours: 17,
      explorationHours: 10,
      transitHours: 3,
      freeTimeHours: 9,
      recoveryHours: 2
    },
    tripDebt: {
      score: 18,
      status: 'Healthy',
      message: 'Relaxed coastal escape with zero stress.',
      contributors: [],
      recoverySuggestion: ''
    },
    regretMap: [],
    tradeOffs: [],
    groupEquity: {
      equityScore: 90,
      status: 'Balanced',
      insight: 'Group enjoyed high alignment on beach and cafe time.',
      recommendationTitle: 'Trip complete',
      recommendationDescription: '',
      recommendedActivity: {} as any,
      travelers: []
    },
    budgetCategories: [
      { name: 'Boutique Villa', amount: 11000, percentage: 46, color: '#168BFF' },
      { name: 'Scooter & Airport Cab', amount: 3500, percentage: 15, color: '#35A86B' },
      { name: 'Seaside Dining & Cafes', amount: 7500, percentage: 31, color: '#E7A93B' },
      { name: 'Kayaking & Sundowners', amount: 2000, percentage: 8, color: '#9333EA' }
    ],
    budgetSuggestions: [],
    itinerary: []
  }
];
