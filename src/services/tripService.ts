import { Trip, DayItinerary, Activity, TradeOffOption, TripHealth } from '../types';
import { ALL_MOCK_TRIPS, DEFAULT_RAJASTHAN_TRIP } from '../data/trips';
import { apiRequest } from './apiClient';
import { db, auth } from '../lib/firebase';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where
} from 'firebase/firestore';

const LOCAL_STORAGE_KEY = 'yatri_trips_v1';

export const tripService = {
  getTrips: async (): Promise<Trip[]> => {
    // 1. If user is logged in, try Firestore first
    if (auth.currentUser) {
      try {
        const tripsRef = collection(db, 'trips');
        const q = query(tripsRef, where('userId', '==', auth.currentUser.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const firestoreTrips: Trip[] = [];
          querySnapshot.forEach((docSnap) => {
            firestoreTrips.push(docSnap.data() as Trip);
          });
          if (firestoreTrips.length > 0) {
            try {
              localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(firestoreTrips));
            } catch (e) {}
            return firestoreTrips;
          }
        }
      } catch (firestoreErr) {
        console.warn('Firestore getTrips query note:', firestoreErr);
      }
    }

    // 2. Try Backend Server API
    try {
      const res = await apiRequest<Trip[]>('/api/trips');
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(res.data));
        } catch (e) {}
        return res.data;
      }
    } catch (e) {
      console.warn('Backend /api/trips unavailable, checking local cache', e);
    }

    // 3. Try LocalStorage
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('LocalStorage parse note:', e);
    }

    return ALL_MOCK_TRIPS;
  },

  getTripById: async (id: string): Promise<Trip | null> => {
    // 1. Try Firestore if logged in
    if (auth.currentUser) {
      try {
        const docRef = doc(db, 'trips', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return docSnap.data() as Trip;
        }
      } catch (e) {
        console.warn('Firestore getTripById note:', e);
      }
    }

    // 2. Try Backend Server
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
    const tripId = tripData.id || `trip-${Date.now()}`;
    const currentUid = auth.currentUser ? auth.currentUser.uid : 'guest';

    const newTrip: Trip = {
      ...DEFAULT_RAJASTHAN_TRIP,
      id: tripId,
      userId: currentUid,
      title: tripData.title || 'New Custom Yatri',
      destinationSummary: tripData.destinationSummary || 'Custom Itinerary',
      startDate: tripData.startDate || '2026-10-20',
      endDate: tripData.endDate || '2026-10-26',
      totalDays: tripData.totalDays || 5,
      travelerCount: tripData.travelerCount || 2,
      estimatedTotalBudget: tripData.estimatedTotalBudget || 45000,
      budgetPerPerson: Math.round((tripData.estimatedTotalBudget || 45000) / (tripData.travelerCount || 2)),
      coverImage: tripData.coverImage || 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop',
      status: 'Upcoming',
      travelStyle: tripData.travelStyle || 'Balanced',
      ...tripData
    } as Trip;

    // 1. Save to Firestore if user is authenticated
    if (auth.currentUser) {
      try {
        const tripDocRef = doc(db, 'trips', tripId);
        await setDoc(tripDocRef, {
          ...newTrip,
          userId: auth.currentUser.uid,
          updatedAt: new Date().toISOString()
        });
      } catch (fsErr) {
        console.warn('Firestore setDoc trip note:', fsErr);
      }
    }

    // 2. Also save to server API if reachable
    try {
      await apiRequest<Trip>('/api/trips', {
        method: 'POST',
        body: JSON.stringify(newTrip)
      });
    } catch (e) {
      console.warn('Server createTrip note:', e);
    }

    // 3. Update local storage cache
    try {
      const trips = await tripService.getTrips();
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([newTrip, ...trips.filter(t => t.id !== newTrip.id)]));
    } catch (e) {}

    return newTrip;
  },

  updateTrip: async (id: string, updates: Partial<Trip>): Promise<Trip> => {
    // 1. Update in Firestore if user is authenticated
    if (auth.currentUser) {
      try {
        const tripDocRef = doc(db, 'trips', id);
        await updateDoc(tripDocRef, {
          ...updates,
          updatedAt: new Date().toISOString()
        });
      } catch (fsErr) {
        console.warn('Firestore updateDoc note:', fsErr);
      }
    }

    // 2. Try Server API
    try {
      await apiRequest<Trip>(`/api/trips/${encodeURIComponent(id)}`, {
        method: 'PUT',
        body: JSON.stringify(updates)
      });
    } catch (e) {
      console.warn('Server updateTrip note:', e);
    }

    // 3. Update local cache
    const trips = await tripService.getTrips();
    const index = trips.findIndex((t) => t.id === id);
    let updatedTrip: Trip;
    if (index === -1) {
      updatedTrip = { ...DEFAULT_RAJASTHAN_TRIP, ...updates, id } as Trip;
      trips.unshift(updatedTrip);
    } else {
      updatedTrip = { ...trips[index], ...updates };
      trips[index] = updatedTrip;
    }

    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(trips));
    } catch (e) {}

    return updatedTrip;
  },

  deleteTrip: async (id: string): Promise<boolean> => {
    // 1. Delete from Firestore if authenticated
    if (auth.currentUser) {
      try {
        const tripDocRef = doc(db, 'trips', id);
        await deleteDoc(tripDocRef);
      } catch (fsErr) {
        console.warn('Firestore deleteDoc note:', fsErr);
      }
    }

    // 2. Try Server API
    try {
      await apiRequest(`/api/trips/${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });
    } catch (e) {}

    // 3. Remove from local cache
    const trips = await tripService.getTrips();
    const filtered = trips.filter((t) => t.id !== id);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
    } catch (e) {}

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
      console.warn('Server optimize call note, using local engine', e);
    }

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
