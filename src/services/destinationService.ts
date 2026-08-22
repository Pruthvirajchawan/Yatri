import { Destination, DestinationCategory, ExperienceType } from '../types';
import { INDIAN_DESTINATIONS } from '../data/destinations';
import { INDIAN_EXPERIENCES } from '../data/experiences';
import { apiRequest } from './apiClient';

export const destinationService = {
  getDestinations: async (category?: DestinationCategory, query?: string): Promise<Destination[]> => {
    try {
      const params = new URLSearchParams();
      if (category && category !== 'All') params.append('category', category);
      if (query && query.trim()) params.append('search', query.trim());

      const url = `/api/destinations${params.toString() ? `?${params.toString()}` : ''}`;
      const res = await apiRequest<Destination[]>(url);
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        return res.data;
      }
    } catch (e) {
      console.warn('Backend /api/destinations call failed, using local dataset', e);
    }

    let list = [...INDIAN_DESTINATIONS];
    if (category && category !== 'All') {
      list = list.filter((d) => d.category.includes(category));
    }
    if (query && query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.state.toLowerCase().includes(q) ||
          d.region.toLowerCase().includes(q) ||
          d.popularFor.toLowerCase().includes(q) ||
          d.highlights.some((h) => h.toLowerCase().includes(q))
      );
    }
    return list;
  },

  getDestinationById: async (id: string): Promise<Destination | null> => {
    try {
      const res = await apiRequest<Destination>(`/api/destinations/${encodeURIComponent(id)}`);
      if (res.success && res.data) {
        return res.data;
      }
    } catch (e) {
      console.warn(`Backend /api/destinations/${id} call failed, using local dataset`, e);
    }
    return INDIAN_DESTINATIONS.find((d) => d.id.toLowerCase() === id.toLowerCase()) || null;
  },

  getExperiences: async (): Promise<ExperienceType[]> => {
    return INDIAN_EXPERIENCES;
  }
};
