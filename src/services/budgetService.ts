import { BudgetSavingSuggestion, Trip } from '../types';
import { tripService } from './tripService';

export const budgetService = {
  applySuggestion: async (trip: Trip, suggestionId: string): Promise<Trip> => {
    const suggestion = trip.budgetSuggestions.find((s) => s.id === suggestionId);
    if (!suggestion || suggestion.applied) return trip;

    const newEstimatedBudget = Math.max(0, trip.estimatedTotalBudget - suggestion.savingsAmount);
    const updatedSuggestions = trip.budgetSuggestions.map((s) =>
      s.id === suggestionId ? { ...s, applied: true } : s
    );

    // Update categories
    const updatedCategories = trip.budgetCategories.map((cat) => {
      if (cat.name.toLowerCase().includes(suggestion.category.toLowerCase())) {
        const newAmt = Math.max(0, cat.amount - suggestion.savingsAmount);
        return {
          ...cat,
          amount: newAmt,
          percentage: Math.round((newAmt / newEstimatedBudget) * 100)
        };
      }
      return {
        ...cat,
        percentage: Math.round((cat.amount / newEstimatedBudget) * 100)
      };
    });

    const updatedTrip: Trip = {
      ...trip,
      estimatedTotalBudget: newEstimatedBudget,
      budgetPerPerson: Math.round(newEstimatedBudget / trip.travelerCount),
      budgetCategories: updatedCategories,
      budgetSuggestions: updatedSuggestions
    };

    await tripService.updateTrip(trip.id, updatedTrip);
    return updatedTrip;
  }
};
