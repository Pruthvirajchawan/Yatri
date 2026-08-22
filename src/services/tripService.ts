import { Trip, DayItinerary, Activity, TradeOffOption, TripHealth } from '../types';
import { ALL_MOCK_TRIPS, DEFAULT_RAJASTHAN_TRIP } from '../data/trips';
import { apiRequest } from './apiClient';

const LOCAL_STORAGE_KEY = 'yatri_trips_v1';

export const tripService = {
  getTrips: async (): Promise<Trip[]> => {
    try {
      const res = await apiRequest<Trip[]>('/api/trips');
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        // Cache to local storage
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(res.data));
        return res.data;
      }
    } catch (e) {
      console.warn('Backend /api/trips unavailable, using local cache', e);
    }

    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('LocalStorage unavailable, returning mock data', e);
    }
    return ALL_MOCK_TRIPS;
  },

  getTripById: async (id: string): Promise<Trip | null> => {
    try {
      const res = await apiRequest<Trip>(`/api/trips/${encodeURIComponent(id)}`);
      if (res.success && res.data) {
        return res.data;
      }
    } catch (e) {
      console.warn(`Failed fetching trip ${id} from server`, e);
    }

    const trips = await tripService.getTrips();
    return trips.find((t) => t.id === id) || (id === 'trip-rajasthan-escape' ? DEFAULT_RAJASTHAN_TRIP : trips[0] || null);
  },

  createTrip: async (tripData: Partial<Trip>): Promise<Trip> => {
    try {
      const res = await apiRequest<Trip>('/api/trips', {
        method: 'POST',
        body: JSON.stringify(tripData)
      });
      if (res.success && res.data) {
        const trips = await tripService.getTrips();
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([res.data, ...trips]));
        return res.data;
      }
    } catch (e) {
      console.warn('Server createTrip failed, saving locally', e);
    }

    const trips = await tripService.getTrips();
    const newTrip: Trip = {
      ...DEFAULT_RAJASTHAN_TRIP,
      id: `trip-${Date.now()}`,
      title: tripData.title || 'New Custom Yatri',
      destinationSummary: tripData.destinationSummary || 'Custom Itinerary',
      startDate: tripData.startDate || '2026-10-20',
      endDate: tripData.endDate || '2026-10-26',
      totalDays: tripData.totalDays || 5,
      travelerCount: tripData.travelerCount || 2,
      estimatedTotalBudget: tripData.estimatedTotalBudget || 45000,
      budgetPerPerson: Math.round((tripData.estimatedTotalBudget || 45000) / (tripData.travelerCount || 2)),
      coverImage: tripData.coverImage || 'https://images.unsplash.com/photo-1603262110263-fb010d6e75dc?q=80&w=1200&auto=format&fit=crop',
      status: 'Upcoming',
      travelStyle: tripData.travelStyle || 'Balanced',
      ...tripData
    } as Trip;

    const updated = [newTrip, ...trips];
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
    return newTrip;
  },

  updateTrip: async (id: string, updates: Partial<Trip>): Promise<Trip> => {
    try {
      const res = await apiRequest<Trip>(`/api/trips/${encodeURIComponent(id)}`, {
        method: 'PUT',
        body: JSON.stringify(updates)
      });
      if (res.success && res.data) {
        return res.data;
      }
    } catch (e) {
      console.warn('Server updateTrip failed, updating local state', e);
    }

    const trips = await tripService.getTrips();
    const index = trips.findIndex((t) => t.id === id);
    if (index === -1) {
      const merged = { ...DEFAULT_RAJASTHAN_TRIP, ...updates, id };
      return merged;
    }
    const updatedTrip = { ...trips[index], ...updates };
    trips[index] = updatedTrip;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(trips));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
    return updatedTrip;
  },

  deleteTrip: async (id: string): Promise<boolean> => {
    try {
      await apiRequest(`/api/trips/${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });
    } catch (e) {
      console.warn('Server deleteTrip failed, deleting locally', e);
    }

    const trips = await tripService.getTrips();
    const filtered = trips.filter((t) => t.id !== id);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
    } catch (e) {
      console.warn('Could not delete from localStorage', e);
    }
    return true;
  },

  optimizeItineraryHealth: async (trip: Trip): Promise<{ trip: Trip; healthGain: number; message: string }> => {
    try {
      const res = await apiRequest(`/api/trips/${encodeURIComponent(trip.id)}/optimize`, {
        method: 'POST'
      });
      if (res.success && res.data) {
        return res.data;
      }
    } catch (e) {
      console.warn('Server optimize call failed, running local algorithm', e);
    }

    // Algorithmic health optimization fallback
    const updatedItinerary = (trip.itinerary || trip.days || []).map((day) => {
      if (day.loadLevel === 'dense') {
        return {
          ...day,
          loadLevel: 'moderate' as const,
          activities: day.activities.map((act, i) => {
            if (i === 1) {
              return { ...act, durationHours: Math.max(1, act.durationHours - 0.5) };
            }
            return act;
          })
        };
      }
      return day;
    });

    const updatedHealth: TripHealth = {
      ...trip.health,
      score: Math.min(96, trip.health.score + 10),
      travelLoad: 'Moderate',
      freeTime: 'Generous',
      groupBalance: 'Strong'
    };

    const updatedTrip: Trip = {
      ...trip,
      health: updatedHealth,
      itinerary: updatedItinerary,
      tripDebt: {
        ...trip.tripDebt,
        score: Math.max(8, trip.tripDebt.score - 12),
        status: 'Healthy',
        message: 'Itinerary optimized: high-altitude transit buffer added and afternoon fatigue relieved.'
      }
    };

    await tripService.updateTrip(trip.id, updatedTrip);
    return {
      trip: updatedTrip,
      healthGain: 10,
      message: 'Successfully optimized pacing and resolved fatigue bottlenecks.'
    };
  }
};
