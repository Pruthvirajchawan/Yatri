import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Trip, Activity, TradeOffOption, Destination } from '../types';
import { DEFAULT_RAJASTHAN_TRIP, ALL_MOCK_TRIPS } from '../data/trips';
import { tripService } from '../services/tripService';
import { budgetService } from '../services/budgetService';
import { groupService } from '../services/groupService';

interface TripContextType {
  currentTrip: Trip;
  allTrips: Trip[];
  trips: Trip[];
  savedDestinationIds: string[];
  isLoading: boolean;
  activeTradeOffId: string;
  // Actions
  setCurrentTrip: (trip: Trip) => void;
  loadTripById: (id: string) => Promise<void>;
  addActivityToDay: (dayNumber: number, activity: Omit<Activity, 'id'>) => Promise<void>;
  addActivity: (dayNumber: number, activity: Omit<Activity, 'id'>) => Promise<void>;
  updateActivity: (dayNumber: number, activityId: string, updates: Partial<Activity>) => Promise<void>;
  deleteActivity: (dayNumber: number, activityId: string) => Promise<void>;
  removeActivity: (dayNumber: number, activityId: string) => Promise<void>;
  moveActivity: (dayNumber: number, activityId: string, direction: 'up' | 'down') => Promise<void>;
  reorderActivities: (dayNumber: number, fromIndex: number, toIndex: number) => Promise<void>;
  toggleActivityCompleted: (dayNumber: number, activityId: string) => Promise<void>;
  selectTradeOffOption: (optionId: string) => Promise<void>;
  applyBudgetSuggestion: (suggestionId: string) => Promise<void>;
  balanceGroupEquity: () => Promise<void>;
  optimizeTrip: () => Promise<{ healthGain: number; message: string }>;
  createNewTrip: (tripData: Partial<Trip>) => Promise<Trip>;
  createTrip: (tripData: Partial<Trip>) => Promise<Trip>;
  toggleSaveDestination: (id: string) => void;
  deleteTrip: (id: string) => Promise<void>;
}

const normalizeTrip = (trip: Trip): Trip => {
  const itinerary = trip.itinerary || trip.days || [];
  return {
    ...trip,
    itinerary,
    days: itinerary
  };
};

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTrip, setCurrentTripState] = useState<Trip>(normalizeTrip(DEFAULT_RAJASTHAN_TRIP));
  const [allTrips, setAllTrips] = useState<Trip[]>(ALL_MOCK_TRIPS.map(normalizeTrip));
  const [savedDestinationIds, setSavedDestinationIds] = useState<string[]>(['udaipur', 'kashmir', 'coorg']);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTradeOffId, setActiveTradeOffId] = useState<string>('tradeoff-relaxed-jaipur-jodhpur');

  useEffect(() => {
    const init = async () => {
      try {
        const loaded = await tripService.getTrips();
        if (loaded && loaded.length > 0) {
          const normalized = loaded.map(normalizeTrip);
          setAllTrips(normalized);
          setCurrentTripState(normalized[0]);
        }
      } catch (err) {
        console.error('Failed initializing trips:', err);
      }
    };
    init();
  }, []);

  const setCurrentTrip = (trip: Trip) => {
    setCurrentTripState(normalizeTrip(trip));
  };

  const loadTripById = async (id: string) => {
    setIsLoading(true);
    try {
      const trip = await tripService.getTripById(id);
      if (trip) {
        setCurrentTripState(normalizeTrip(trip));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const addActivityToDay = async (dayNumber: number, newAct: Omit<Activity, 'id'>) => {
    const fullActivity: Activity = {
      ...newAct,
      id: `act-${Date.now()}`
    };

    const itineraryList = currentTrip.itinerary || currentTrip.days || [];
    const updatedItinerary = itineraryList.map((day) => {
      if (day.dayNumber === dayNumber) {
        return {
          ...day,
          activities: [...day.activities, fullActivity]
        };
      }
      return day;
    });

    const updatedTrip: Trip = normalizeTrip({
      ...currentTrip,
      itinerary: updatedItinerary,
      days: updatedItinerary,
      estimatedTotalBudget: currentTrip.estimatedTotalBudget + fullActivity.cost,
      experienceBudget: {
        ...currentTrip.experienceBudget,
        usedHours: currentTrip.experienceBudget.usedHours + fullActivity.durationHours,
        explorationHours: currentTrip.experienceBudget.explorationHours + fullActivity.durationHours
      }
    });

    setCurrentTripState(updatedTrip);
    setAllTrips((prev) => prev.map((t) => (t.id === updatedTrip.id ? updatedTrip : t)));
    await tripService.updateTrip(currentTrip.id, updatedTrip);
  };

  const updateActivity = async (dayNumber: number, activityId: string, updates: Partial<Activity>) => {
    const itineraryList = currentTrip.itinerary || currentTrip.days || [];
    const updatedItinerary = itineraryList.map((day) => {
      if (day.dayNumber === dayNumber) {
        return {
          ...day,
          activities: day.activities.map((a) => (a.id === activityId ? { ...a, ...updates } : a))
        };
      }
      return day;
    });

    const updatedTrip: Trip = normalizeTrip({
      ...currentTrip,
      itinerary: updatedItinerary,
      days: updatedItinerary
    });
    setCurrentTripState(updatedTrip);
    setAllTrips((prev) => prev.map((t) => (t.id === updatedTrip.id ? updatedTrip : t)));
    await tripService.updateTrip(currentTrip.id, updatedTrip);
  };

  const deleteActivity = async (dayNumber: number, activityId: string) => {
    let removedCost = 0;
    let removedDuration = 0;

    const itineraryList = currentTrip.itinerary || currentTrip.days || [];
    const updatedItinerary = itineraryList.map((day) => {
      if (day.dayNumber === dayNumber) {
        const found = day.activities.find((a) => a.id === activityId);
        if (found) {
          removedCost = found.cost;
          removedDuration = found.durationHours;
        }
        return {
          ...day,
          activities: day.activities.filter((a) => a.id !== activityId)
        };
      }
      return day;
    });

    const updatedTrip: Trip = normalizeTrip({
      ...currentTrip,
      itinerary: updatedItinerary,
      days: updatedItinerary,
      estimatedTotalBudget: Math.max(0, currentTrip.estimatedTotalBudget - removedCost),
      experienceBudget: {
        ...currentTrip.experienceBudget,
        usedHours: Math.max(0, currentTrip.experienceBudget.usedHours - removedDuration),
        freeTimeHours: currentTrip.experienceBudget.freeTimeHours + removedDuration
      }
    });

    setCurrentTripState(updatedTrip);
    setAllTrips((prev) => prev.map((t) => (t.id === updatedTrip.id ? updatedTrip : t)));
    await tripService.updateTrip(currentTrip.id, updatedTrip);
  };

  const reorderActivities = async (dayNumber: number, fromIndex: number, toIndex: number) => {
    const itineraryList = currentTrip.itinerary || currentTrip.days || [];
    const updatedItinerary = itineraryList.map((day) => {
      if (day.dayNumber === dayNumber) {
        const list = [...day.activities];
        const [moved] = list.splice(fromIndex, 1);
        list.splice(toIndex, 0, moved);
        return { ...day, activities: list };
      }
      return day;
    });

    const updatedTrip: Trip = normalizeTrip({
      ...currentTrip,
      itinerary: updatedItinerary,
      days: updatedItinerary
    });
    setCurrentTripState(updatedTrip);
    setAllTrips((prev) => prev.map((t) => (t.id === updatedTrip.id ? updatedTrip : t)));
    await tripService.updateTrip(currentTrip.id, updatedTrip);
  };

  const moveActivity = async (dayNumber: number, activityId: string, direction: 'up' | 'down') => {
    const itineraryList = currentTrip.itinerary || currentTrip.days || [];
    const day = itineraryList.find((d) => d.dayNumber === dayNumber);
    if (!day) return;
    const idx = day.activities.findIndex((a) => a.id === activityId);
    if (idx === -1) return;
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= day.activities.length) return;
    await reorderActivities(dayNumber, idx, targetIdx);
  };

  const toggleActivityCompleted = async (dayNumber: number, activityId: string) => {
    const itineraryList = currentTrip.itinerary || currentTrip.days || [];
    const day = itineraryList.find((d) => d.dayNumber === dayNumber);
    if (!day) return;
    const act = day.activities.find((a) => a.id === activityId);
    if (!act) return;
    await updateActivity(dayNumber, activityId, { completed: !act.completed });
  };

  const selectTradeOffOption = async (optionId: string) => {
    setActiveTradeOffId(optionId);
    const option = currentTrip.tradeOffs.find((t) => t.id === optionId);
    if (!option) return;

    const updatedTradeOffs = currentTrip.tradeOffs.map((t) => ({
      ...t,
      selected: t.id === optionId
    }));

    let newHealthScore = 84;
    let newBudget = 118000;
    let destinationSummary = currentTrip.destinationSummary;

    if (optionId === 'tradeoff-add-udaipur') {
      newHealthScore = 72;
      newBudget = 118000 + 27200;
      destinationSummary = 'Jaipur · Jodhpur · Udaipur (Circuit)';
    } else if (optionId === 'tradeoff-replace-stop') {
      newHealthScore = 86;
      newBudget = 118000 + 8400;
      destinationSummary = 'Jaipur · Udaipur (Lake Focused)';
    } else {
      newHealthScore = 84;
      newBudget = 118000;
      destinationSummary = 'Jaipur · Jodhpur';
    }

    const updatedTrip: Trip = normalizeTrip({
      ...currentTrip,
      destinationSummary,
      estimatedTotalBudget: newBudget,
      budgetPerPerson: Math.round(newBudget / currentTrip.travelerCount),
      health: {
        ...currentTrip.health,
        score: newHealthScore,
        travelLoad: optionId === 'tradeoff-add-udaipur' ? 'Heavy' : 'Moderate'
      },
      tradeOffs: updatedTradeOffs
    });

    setCurrentTripState(updatedTrip);
    setAllTrips((prev) => prev.map((t) => (t.id === updatedTrip.id ? updatedTrip : t)));
    await tripService.updateTrip(currentTrip.id, updatedTrip);
  };

  const applyBudgetSuggestion = async (suggestionId: string) => {
    const updated = await budgetService.applySuggestion(currentTrip, suggestionId);
    const normalized = normalizeTrip(updated);
    setCurrentTripState(normalized);
    setAllTrips((prev) => prev.map((t) => (t.id === normalized.id ? normalized : t)));
  };

  const balanceGroupEquity = async () => {
    const res = await groupService.balanceGroupTrip(currentTrip);
    const normalized = normalizeTrip(res.trip);
    setCurrentTripState(normalized);
    setAllTrips((prev) => prev.map((t) => (t.id === normalized.id ? normalized : t)));
  };

  const optimizeTrip = async () => {
    const res = await tripService.optimizeItineraryHealth(currentTrip);
    const normalized = normalizeTrip(res.trip);
    setCurrentTripState(normalized);
    setAllTrips((prev) => prev.map((t) => (t.id === normalized.id ? normalized : t)));
    return { healthGain: res.healthGain, message: res.message };
  };

  const createNewTrip = async (tripData: Partial<Trip>): Promise<Trip> => {
    const rawTrip = await tripService.createTrip(tripData);
    const newTrip = normalizeTrip(rawTrip);
    setAllTrips((prev) => [newTrip, ...prev]);
    setCurrentTripState(newTrip);
    return newTrip;
  };

  const toggleSaveDestination = (id: string) => {
    setSavedDestinationIds((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const deleteTrip = async (id: string) => {
    await tripService.deleteTrip(id);
    setAllTrips((prev) => prev.filter((t) => t.id !== id));
    if (currentTrip.id === id && allTrips.length > 1) {
      setCurrentTripState(allTrips.find((t) => t.id !== id) || normalizeTrip(DEFAULT_RAJASTHAN_TRIP));
    }
  };

  return (
    <TripContext.Provider
      value={{
        currentTrip,
        allTrips,
        trips: allTrips,
        savedDestinationIds,
        isLoading,
        activeTradeOffId,
        setCurrentTrip,
        loadTripById,
        addActivityToDay,
        addActivity: addActivityToDay,
        updateActivity,
        deleteActivity,
        removeActivity: deleteActivity,
        moveActivity,
        reorderActivities,
        toggleActivityCompleted,
        selectTradeOffOption,
        applyBudgetSuggestion,
        balanceGroupEquity,
        optimizeTrip,
        createNewTrip,
        createTrip: createNewTrip,
        toggleSaveDestination,
        deleteTrip
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};
