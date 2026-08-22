export type DestinationCategory =
  | 'All'
  | 'Mountains'
  | 'Beaches'
  | 'Heritage'
  | 'Food'
  | 'Adventure'
  | 'Nature'
  | 'Spiritual';

export type TravelStyle = 'Relaxed' | 'Balanced' | 'Explorer';

export type InterestType =
  | 'Food'
  | 'Culture'
  | 'Nature'
  | 'Adventure'
  | 'Photography'
  | 'Shopping'
  | 'Heritage'
  | 'Spiritual'
  | 'Wellness';

export interface Destination {
  id: string;
  name: string;
  region: string;
  state: string;
  category: DestinationCategory[];
  heroImage: string;
  galleryImages: string[];
  tagline: string;
  description: string;
  startingPrice: number;
  durationDays: number;
  durationNights: number;
  highlights: string[];
  bestSeason: string;
  rating: number;
  reviewCount: number;
  popularFor: string;
  coordinates?: { lat: number; lng: number };
}

export interface Activity {
  id: string;
  title: string;
  category: 'sightseeing' | 'food' | 'culture' | 'transit' | 'relaxation' | 'adventure';
  time: string;
  durationHours: number;
  cost: number;
  location: string;
  priority: 'must-do' | 'recommended' | 'optional';
  description: string;
  image?: string;
  tags?: string[];
  completed?: boolean;
}

export interface DayTransitInfo {
  fromCity: string;
  toCity: string;
  mode: string;
  durationHours: number;
  distanceKm: number;
}

export interface DayItinerary {
  dayNumber: number;
  date: string;
  city: string;
  theme: string;
  loadLevel: 'low' | 'moderate' | 'dense';
  activities: Activity[];
  transitInfo?: DayTransitInfo;
}

export interface TripHealth {
  score: number; // 0 - 100
  budgetStatus: 'Healthy' | 'Moderate' | 'Stretched';
  travelLoad: 'Light' | 'Moderate' | 'Heavy';
  freeTime: 'Generous' | 'Good' | 'Tight';
  groupBalance: 'Strong' | 'Moderate' | 'Skewed';
}

export interface ExperienceBudget {
  totalHours: number;
  usedHours: number;
  explorationHours: number;
  transitHours: number;
  freeTimeHours: number;
  recoveryHours: number;
}

export interface TripDebt {
  score: number; // 0 - 100
  status: 'Healthy' | 'Caution' | 'High Debt';
  message: string;
  contributors: string[];
  recoverySuggestion: string;
}

export interface RegretMapItem {
  id: string;
  activityTitle: string;
  destination: string;
  tier: 'dont-miss' | 'nice-to-have' | 'easy-to-skip';
  reason: string;
  impactScore: number;
}

export interface TradeOffOption {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  gains: string[];
  sacrifices: string[];
  healthImpact: number;
  budgetChange: number; // INR difference
  transitTimeChangeHours: number;
  selected?: boolean;
}

export interface TradeOffScenario {
  id: string;
  title: string;
  category: string;
  optionA: {
    title: string;
    pros: string[];
    cons: string[];
    costDelta: number;
    timeDelta: number;
    energyImpact: string;
  };
  optionB: {
    title: string;
    pros: string[];
    cons: string[];
    costDelta: number;
    timeDelta: number;
    energyImpact: string;
  };
  selectedOption: 'A' | 'B';
}

export interface Traveler {
  id: string;
  name: string;
  avatar: string;
  primaryPreference: string;
  secondaryPreference: string;
  preferenceWeight: number; // 0 - 100
  satisfactionScore: number; // 0 - 100
  budgetLimit?: number;
}

export interface GroupEquityData {
  equityScore: number; // 0 - 100
  status: 'Balanced' | 'Underrepresented' | 'Skewed';
  insight: string;
  recommendationTitle: string;
  recommendationDescription: string;
  recommendedActivity: Activity;
  travelers: Traveler[];
}

export interface BudgetCategory {
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface BudgetSavingSuggestion {
  id: string;
  title: string;
  savingsAmount: number;
  tradeOffDescription: string;
  applied: boolean;
  category: 'Transport' | 'Stay' | 'Activities' | 'Food';
}

export interface Trip {
  id: string;
  userId?: string;
  title: string;
  destinationSummary: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  travelerCount: number;
  estimatedTotalBudget: number;
  budgetPerPerson: number;
  coverImage: string;
  status: 'Upcoming' | 'Draft' | 'Completed';
  travelStyle: TravelStyle;
  health: TripHealth;
  itinerary: DayItinerary[];
  days?: DayItinerary[];
  experienceBudget: ExperienceBudget;
  tripDebt: TripDebt;
  regretMap: RegretMapItem[];
  tradeOffs: TradeOffOption[];
  groupEquity: GroupEquityData;
  budgetCategories: BudgetCategory[];
  budgetSuggestions: BudgetSavingSuggestion[];
}

export interface AssistantMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  suggestedActions?: { label: string; actionType: string; payload?: any }[];
  contextHighlight?: string;
}

export interface TravelDNAScore {
  category: string;
  score: number;
  description: string;
  iconName: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  location: string;
  memberSince: string;
  totalTripsCount: number;
  statesExploredCount: number;
  travelDNA: TravelDNAScore[];
  savedDestinations: string[];
  preferredStyle: TravelStyle;
  dietaryPreference: string;
}

export interface ExperienceType {
  id: string;
  title: string;
  tagline: string;
  startingPrice: number;
  image: string;
  destinations: string[];
  highlight: string;
}

export interface CommunityStory {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  duration: string;
  budget: string;
  style: string;
  image: string;
  summary: string;
  likesCount: number;
  route: string[];
}
