import { GroupEquityData, Trip } from '../types';
import { tripService } from './tripService';

export const groupService = {
  balanceGroupTrip: async (trip: Trip): Promise<{ trip: Trip; newScore: number }> => {
    const recommendedActivity = trip.groupEquity.recommendedActivity;
    
    // Add recommended relaxation activity into Day 4 of itinerary
    const updatedItinerary = trip.itinerary.map((day) => {
      if (day.dayNumber === 4) {
        return {
          ...day,
          loadLevel: 'moderate' as const,
          activities: [...day.activities, { ...recommendedActivity, id: `act-group-${Date.now()}` }]
        };
      }
      return day;
    });

    // Update group equity
    const updatedTravelers = trip.groupEquity.travelers.map((t) => {
      if (t.name === 'Sneha') {
        return { ...t, satisfactionScore: 92 };
      }
      return t;
    });

    const updatedGroupEquity: GroupEquityData = {
      ...trip.groupEquity,
      equityScore: 94,
      status: 'Balanced',
      insight: 'All group members have well-balanced activities. Sneha’s relaxation goals are now happily fulfilled with the stepwell sunset session.',
      recommendationTitle: 'Group in Equilibrium',
      recommendationDescription: 'Preferences are evenly distributed across culture, cuisine, adventure, and sunset downtime.',
      travelers: updatedTravelers
    };

    const updatedTrip: Trip = {
      ...trip,
      itinerary: updatedItinerary,
      groupEquity: updatedGroupEquity,
      health: {
        ...trip.health,
        groupBalance: 'Strong',
        score: Math.min(98, trip.health.score + 6)
      }
    };

    await tripService.updateTrip(trip.id, updatedTrip);
    return { trip: updatedTrip, newScore: 94 };
  }
};
