import { apiRequest } from './apiClient';

export interface InquiryPayload {
  name: string;
  email: string;
  phone?: string;
  destination: string;
  preferredMonth?: string;
  groupSize: number;
  adventureType?: string;
  specialRequirements?: string;
}

export const inquiryService = {
  submitInquiry: async (payload: InquiryPayload) => {
    const res = await apiRequest('/api/inquiries', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    return res;
  },

  getInquiries: async () => {
    const res = await apiRequest('/api/inquiries');
    return res;
  }
};
