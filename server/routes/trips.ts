import { Router } from 'express';
import { backendStore } from '../store';

export const tripsRouter = Router();

// In-memory / persisted trips storage
let storedTrips: any[] = [];

// Seed default if empty
const DEFAULT_SEED_TRIP = {
  id: 'trip-ladakh-circuit',
  title: 'Ladakh High Passes & Pangong Circuit',
  destinationSummary: 'Leh · Nubra Valley · Pangong Tso · Chang La',
  startDate: '2026-09-12',
  endDate: '2026-09-19',
  totalDays: 8,
  travelerCount: 2,
  estimatedTotalBudget: 68000,
  budgetPerPerson: 34000,
  coverImage: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1200&auto=format&fit=crop',
  status: 'Upcoming',
  travelStyle: 'Balanced',
  health: {
    score: 88,
    budgetStatus: 'Healthy',
    travelLoad: 'Moderate',
    freeTime: 'Good',
    groupBalance: 'Strong'
  },
  experienceBudget: {
    totalHours: 56,
    usedHours: 44,
    explorationHours: 30,
    transitHours: 10,
    freeTimeHours: 8,
    recoveryHours: 6
  },
  tripDebt: {
    score: 18,
    status: 'Healthy',
    message: 'Acclimatization days on Day 1 and 2 in Leh keep altitude fatigue low.',
    contributors: ['High Altitude Pass crossing (Khardung La)', 'Off-road Nubra to Pangong route'],
    recoverySuggestion: 'Keep 2L water intake and enjoy hot Thukpa at Shanti Stupa viewpoint.'
  },
  itinerary: [
    {
      dayNumber: 1,
      date: '2026-09-12',
      city: 'Leh (11,500 ft)',
      theme: 'Arrival & Mandatory Altitude Acclimatization',
      loadLevel: 'low',
      activities: [
        {
          id: 'act-1',
          title: 'Leh Airport Pick-up & Hotel Check-in',
          category: 'transit',
          time: '10:00 AM',
          durationHours: 1.5,
          cost: 1200,
          location: 'Kushok Bakula Rimpochee Airport',
          priority: 'must-do',
          description: 'Transfer to hotel in Leh. Complete rest recommended for oxygen saturation adjustment.'
        },
        {
          id: 'act-2',
          title: 'Evening Gentle Stroll at Leh Main Bazaar & Tibetan Butter Tea',
          category: 'culture',
          time: '05:30 PM',
          durationHours: 2,
          cost: 450,
          location: 'Leh Main Bazaar',
          priority: 'recommended',
          description: 'Light walking, shopping for handmade Pashmina, and sampling hot Ladakhi Tingmo.'
        }
      ]
    },
    {
      dayNumber: 2,
      date: '2026-09-13',
      city: 'Leh',
      theme: 'Monasteries & Hall of Fame',
      loadLevel: 'moderate',
      activities: [
        {
          id: 'act-3',
          title: 'Thiksey Monastery Morning Chants',
          category: 'culture',
          time: '07:00 AM',
          durationHours: 2.5,
          cost: 600,
          location: 'Thiksey Gompa',
          priority: 'must-do',
          description: 'Experience 12-storey monastery resembling Potala Palace with towering Maitreya Buddha statue.'
        },
        {
          id: 'act-4',
          title: 'Magnetic Hill & Sangam Confluence (Indus & Zanskar)',
          category: 'sightseeing',
          time: '01:30 PM',
          durationHours: 3,
          cost: 1800,
          location: 'Nimmu Confluence',
          priority: 'must-do',
          description: 'Witness the striking dual-color river confluence and zero-gravity optical illusion.'
        }
      ]
    },
    {
      dayNumber: 3,
      date: '2026-09-14',
      city: 'Nubra Valley via Khardung La (17,982 ft)',
      theme: 'Roof of the World & Cold Desert',
      loadLevel: 'dense',
      activities: [
        {
          id: 'act-5',
          title: 'Khardung La Summit Photo Stop',
          category: 'adventure',
          time: '10:30 AM',
          durationHours: 0.5,
          cost: 0,
          location: 'Khardung La Pass',
          priority: 'must-do',
          description: 'Short 20-minute stop at one of the highest motorable roads in the world with snow peak vistas.'
        },
        {
          id: 'act-6',
          title: 'Hunder Sand Dunes Double-Humped Bactrian Camel Safari',
          category: 'adventure',
          time: '04:30 PM',
          durationHours: 2,
          cost: 1000,
          location: 'Hunder Nubra Valley',
          priority: 'must-do',
          description: 'Sunset ride across white sand dunes framed by snow-capped Karakoram peaks.'
        }
      ]
    },
    {
      dayNumber: 4,
      date: '2026-09-15',
      city: 'Pangong Tso (14,270 ft)',
      theme: 'Shyok River Route & The Blue Wonder',
      loadLevel: 'moderate',
      activities: [
        {
          id: 'act-7',
          title: 'Scenic 4x4 Drive along Shyok River',
          category: 'transit',
          time: '08:30 AM',
          durationHours: 4.5,
          cost: 3500,
          location: 'Nubra - Pangong Route',
          priority: 'must-do',
          description: 'Rugged terrain through riverbeds and dramatic gorge walls.'
        },
        {
          id: 'act-8',
          title: 'Sunset at Pangong Lake & Stargazing Camp',
          category: 'relaxation',
          time: '05:00 PM',
          durationHours: 3,
          cost: 2500,
          location: 'Lukung / Spangmik Camps',
          priority: 'must-do',
          description: 'Watch the high-altitude saltwater lake change shades from cobalt to turquoise under Milky Way skies.'
        }
      ]
    }
  ],
  tradeOffs: [
    {
      id: 'tradeoff-hanle-astronomy',
      title: 'Add Hanle Dark Sky Reserve (+2 Days)',
      subtitle: 'Extra ₹12,500 · World-class Stargazing',
      badge: 'Astronomers Choice',
      gains: ['Visit India’s first Dark Sky Reserve', 'Hanle Observatory 2m Telescope view', 'Zero light pollution Milky Way capture'],
      sacrifices: ['+6 hours bumpy dirt roads', 'Basic homestay accommodation with solar power'],
      healthImpact: -6,
      budgetChange: 12500,
      transitTimeChangeHours: 6,
      selected: false
    },
    {
      id: 'tradeoff-standard-circuit',
      title: 'Standard Leh · Nubra · Pangong (Selected)',
      subtitle: 'Optimal Rest & Classic Highlights',
      badge: 'Most Popular',
      gains: ['Balanced pacing with 2 nights in Leh', 'Pristine sights without fatigue spike'],
      sacrifices: ['Skips extreme remote Changthang plateau'],
      healthImpact: 0,
      budgetChange: 0,
      transitTimeChangeHours: 0,
      selected: true
    }
  ],
  regretMap: [
    {
      id: 'reg-1',
      activityTitle: 'Pangong Lake Sunset & Milky Way Stargazing',
      destination: 'Pangong Tso',
      tier: 'dont-miss',
      reason: 'One of the clearest night sky viewing spots on the planet with 14,000 ft elevation.',
      impactScore: 99
    },
    {
      id: 'reg-2',
      activityTitle: 'Thiksey Morning Prayer Chanting with Monks',
      destination: 'Leh',
      tier: 'dont-miss',
      reason: 'Deeply spiritual Tibetan Buddhist ceremony overlooking Indus Valley.',
      impactScore: 94
    }
  ]
};

// Initialize
storedTrips = [DEFAULT_SEED_TRIP];

// GET /api/trips
tripsRouter.get('/', (req, res) => {
  res.json({
    success: true,
    count: storedTrips.length,
    data: storedTrips
  });
});

// GET /api/trips/:id
tripsRouter.get('/:id', (req, res) => {
  const trip = storedTrips.find((t) => t.id === req.params.id) || storedTrips[0];
  if (!trip) {
    return res.status(404).json({ success: false, error: 'Trip not found' });
  }
  res.json({ success: true, data: trip });
});

// POST /api/trips
tripsRouter.post('/', (req, res) => {
  try {
    const raw = req.body;
    const newTrip = {
      ...DEFAULT_SEED_TRIP,
      id: `trip-${Date.now()}`,
      title: raw.title || 'New Indian Expedition',
      destinationSummary: raw.destinationSummary || 'Himalayan Explorer',
      startDate: raw.startDate || '2026-10-10',
      endDate: raw.endDate || '2026-10-17',
      totalDays: raw.totalDays || 7,
      travelerCount: raw.travelerCount || 2,
      estimatedTotalBudget: raw.estimatedTotalBudget || 55000,
      budgetPerPerson: Math.round((raw.estimatedTotalBudget || 55000) / (raw.travelerCount || 2)),
      coverImage: raw.coverImage || 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1200&auto=format&fit=crop',
      status: 'Upcoming',
      travelStyle: raw.travelStyle || 'Balanced',
      itinerary: raw.itinerary || DEFAULT_SEED_TRIP.itinerary,
      health: raw.health || DEFAULT_SEED_TRIP.health,
      experienceBudget: raw.experienceBudget || DEFAULT_SEED_TRIP.experienceBudget,
      tripDebt: raw.tripDebt || DEFAULT_SEED_TRIP.tripDebt,
      tradeOffs: raw.tradeOffs || DEFAULT_SEED_TRIP.tradeOffs,
      regretMap: raw.regretMap || DEFAULT_SEED_TRIP.regretMap
    };

    storedTrips.unshift(newTrip);
    res.status(201).json({
      success: true,
      message: 'Trip created successfully',
      data: newTrip
    });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// PUT /api/trips/:id
tripsRouter.put('/:id', (req, res) => {
  const index = storedTrips.findIndex((t) => t.id === req.params.id);
  if (index === -1) {
    const fallbackTrip = { ...DEFAULT_SEED_TRIP, ...req.body, id: req.params.id };
    storedTrips.push(fallbackTrip);
    return res.json({ success: true, data: fallbackTrip });
  }

  const updatedTrip = {
    ...storedTrips[index],
    ...req.body
  };
  storedTrips[index] = updatedTrip;

  res.json({
    success: true,
    message: 'Trip updated successfully',
    data: updatedTrip
  });
});

// DELETE /api/trips/:id
tripsRouter.delete('/:id', (req, res) => {
  storedTrips = storedTrips.filter((t) => t.id !== req.params.id);
  res.json({
    success: true,
    message: `Trip ${req.params.id} deleted successfully`
  });
});

// POST /api/trips/:id/optimize
tripsRouter.post('/:id/optimize', (req, res) => {
  const trip = storedTrips.find((t) => t.id === req.params.id) || storedTrips[0];
  if (!trip) {
    return res.status(404).json({ success: false, error: 'Trip not found' });
  }

  const updatedItinerary = (trip.itinerary || []).map((day: any) => {
    if (day.loadLevel === 'dense') {
      return {
        ...day,
        loadLevel: 'moderate',
        activities: (day.activities || []).map((act: any, i: number) => {
          if (i === 1) {
            return { ...act, durationHours: Math.max(1, act.durationHours - 0.5) };
          }
          return act;
        })
      };
    }
    return day;
  });

  const updatedHealth = {
    ...trip.health,
    score: Math.min(96, (trip.health?.score || 80) + 10),
    travelLoad: 'Moderate',
    freeTime: 'Generous',
    groupBalance: 'Strong'
  };

  const optimizedTrip = {
    ...trip,
    health: updatedHealth,
    itinerary: updatedItinerary,
    tripDebt: {
      ...trip.tripDebt,
      score: Math.max(8, (trip.tripDebt?.score || 25) - 12),
      status: 'Healthy',
      message: 'Itinerary algorithmic optimization applied: high-altitude load relieved with extra tea & photo buffers.'
    }
  };

  const idx = storedTrips.findIndex((t) => t.id === trip.id);
  if (idx !== -1) {
    storedTrips[idx] = optimizedTrip;
  }

  res.json({
    success: true,
    data: {
      trip: optimizedTrip,
      healthGain: 10,
      message: 'Successfully optimized high-altitude transit buffer and resolved pacing bottlenecks.'
    }
  });
});
