import { apiRequest } from './apiClient';

export interface BookingPayload {
  destinationId: string;
  destinationName: string;
  leadName: string;
  email: string;
  phone: string;
  emergencyContact?: string;
  travelerCount: number;
  startDate: string;
  endDate: string;
  roomType?: 'Standard' | 'Deluxe Mountain View' | 'Luxury Camp' | 'Homestay';
  guideIncluded?: boolean;
  vehicleType?: 'None' | '4x4 SUV (Scorpio/Fortuner)' | 'Himalayan 450' | 'Private Tempo Traveler';
  permitAssistance?: boolean;
  totalPrice: number;
  notes?: string;
}

export interface BookingResponse {
  id: string;
  pnr: string;
  destinationId: string;
  destinationName: string;
  leadName: string;
  email: string;
  phone: string;
  emergencyContact: string;
  travelerCount: number;
  startDate: string;
  endDate: string;
  roomType: string;
  guideIncluded: boolean;
  vehicleType: string;
  permitAssistance: boolean;
  totalPrice: number;
  status: 'CONFIRMED' | 'PROCESSING' | 'CANCELLED';
  paymentStatus: 'PAID' | 'PARTIAL' | 'PENDING';
  paymentId: string;
  createdAt: string;
  notes?: string;
}

export const bookingService = {
  // Create real booking on backend
  createBooking: async (payload: BookingPayload): Promise<{ success: boolean; data?: BookingResponse; error?: string }> => {
    const res = await apiRequest<BookingResponse>('/api/bookings', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    return res;
  },

  // Get all bookings
  getBookings: async (): Promise<BookingResponse[]> => {
    const res = await apiRequest<BookingResponse[]>('/api/bookings');
    if (res.success && res.data) {
      return res.data;
    }
    return [];
  },

  // Lookup booking by PNR or ID
  getBookingByPnr: async (pnrOrId: string): Promise<BookingResponse | null> => {
    const res = await apiRequest<BookingResponse>(`/api/bookings/${encodeURIComponent(pnrOrId)}`);
    if (res.success && res.data) {
      return res.data;
    }
    return null;
  },

  // Calculate live estimate
  calculateLiveEstimate: async (params: {
    destination: string;
    durationDays: number;
    travelers: number;
    stayTier: string;
    transportMode: string;
    includeSherpaGuide: boolean;
    includePermits: boolean;
    includeOxygenSafetyKit: boolean;
  }) => {
    const res = await apiRequest('/api/calculator/estimate', {
      method: 'POST',
      body: JSON.stringify(params)
    });
    return res;
  }
};
