import { UserProfile } from '../types';

export const CURRENT_USER_PROFILE: UserProfile = {
  name: 'Pruthviraj Chawan',
  email: 'pruthvirajchawan65@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
  location: 'Bengaluru, India',
  memberSince: 'March 2025',
  totalTripsCount: 6,
  statesExploredCount: 9,
  preferredStyle: 'Balanced',
  dietaryPreference: 'Authentic Local & Vegetarian Friendly',
  savedDestinations: ['udaipur', 'kashmir', 'coorg', 'varanasi', 'ladakh'],
  travelDNA: [
    {
      category: 'Food & Culinary',
      score: 92,
      description: 'Prioritizes hyper-local culinary flavors, heritage thalis, and food walks over generic hotel dining.',
      iconName: 'Utensils'
    },
    {
      category: 'Culture & Architecture',
      score: 86,
      description: 'Deep appreciation for historic fortresses, artisan crafts, stepwells, and living traditions.',
      iconName: 'Landmark'
    },
    {
      category: 'Nature & Serenity',
      score: 78,
      description: 'Prefers lake sunsets, pine valleys, and quiet morning nature views over noisy commercial zones.',
      iconName: 'Trees'
    },
    {
      category: 'Spontaneity & Flexibility',
      score: 81,
      description: 'Loves having dedicated 2–3 hour open-ended buffers for serendipitous discoveries.',
      iconName: 'Sparkles'
    },
    {
      category: 'Adventure Pacing',
      score: 64,
      description: 'Enjoys moderate treks and scenic walks, but prioritizes comfort over extreme endurance.',
      iconName: 'Compass'
    },
    {
      category: 'Crowd Tolerance',
      score: 31,
      description: 'Low tolerance for high-density crowds; strongly benefits from off-peak morning and golden hour timings.',
      iconName: 'Users'
    },
    {
      category: 'Early Mornings',
      score: 28,
      description: 'Prefers slow leisurely breakfasts before 09:30 AM rather than rushed dawn excursions.',
      iconName: 'Sunrise'
    }
  ]
};

export const USER_PROFILE = CURRENT_USER_PROFILE;
