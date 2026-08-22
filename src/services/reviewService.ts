import { apiRequest } from './apiClient';

export interface ReviewItem {
  id: string;
  destinationId: string;
  userName: string;
  userCity: string;
  userAvatar?: string;
  rating: number;
  reviewTitle: string;
  comment: string;
  visitedDate: string;
  helpfulCount: number;
  altitudeExperienced?: string;
  tags?: string[];
  createdAt: string;
}

export const reviewService = {
  getReviews: async (destinationId?: string): Promise<ReviewItem[]> => {
    const url = destinationId ? `/api/reviews?destinationId=${encodeURIComponent(destinationId)}` : '/api/reviews';
    const res = await apiRequest<ReviewItem[]>(url);
    if (res.success && res.data) {
      return res.data;
    }
    return [];
  },

  submitReview: async (review: Omit<ReviewItem, 'id' | 'createdAt' | 'helpfulCount'>) => {
    const res = await apiRequest('/api/reviews', {
      method: 'POST',
      body: JSON.stringify(review)
    });
    return res;
  },

  markHelpful: async (id: string) => {
    const res = await apiRequest(`/api/reviews/${id}/helpful`, {
      method: 'POST'
    });
    return res;
  }
};
