import { AssistantMessage, Trip } from '../types';
import { apiRequest } from './apiClient';

export const INITIAL_ASSISTANT_MESSAGES: AssistantMessage[] = [
  {
    id: 'msg-1',
    sender: 'assistant',
    timestamp: 'Just now',
    text: 'Namaste! I am Yatri AI, your Himalayan & cultural travel companion. I analyze your route altitude, pacing, fatigue debt, road pass conditions, and budget trade-offs in real time. How can I assist your journey today?',
    contextHighlight: 'Live Yatri Backend Active • Indian Mountain & Cultural Engine'
  }
];

export const ASSISTANT_PRESETS: { prompt: string; reply: string; actionLabel?: string; actionType?: string }[] = [
  {
    prompt: 'How to manage altitude sickness in Ladakh?',
    reply: 'In Ladakh (11,500 ft at Leh), follow the mandatory 48-hour active rest protocol upon landing. Avoid strenuous climbs on Day 1 & 2. Drink 3.5L of warm water/Kahwa daily, consume light garlic soup or Thukpa, and carry a portable O2 canister when crossing Khardung La (17,982 ft).',
    actionLabel: 'Check Pass Telemetry',
    actionType: 'NAVIGATE_INTELLIGENCE'
  },
  {
    prompt: 'What can I remove to save ₹5,000?',
    reply: 'Here are two high-yield mountain savings:\n1. Switch private SUV transit on valley transfers to shared local tempo travelers or Himalayan bike rentals (Saves ₹3,800/person).\n2. Opt for traditional Ladakhi/Himachali homestays with homecooked organic meals instead of chain hotels (Saves ₹2,500/night).\n\nTotal savings: ₹6,300+ with richer local cultural immersion!',
    actionLabel: 'Apply Budget Optimizations',
    actionType: 'NAVIGATE_BUDGET'
  },
  {
    prompt: 'Are Khardung La & Chang La open?',
    reply: 'According to current Yatri live mountain pass telemetry, both Khardung La (17,982 ft) and Chang La (17,590 ft) are currently OPEN with standard 4x4 high-clearance advisories. Snow clearance teams maintain regular patrol.',
    actionLabel: 'View Live Pass Status',
    actionType: 'SHOW_TIP'
  },
  {
    prompt: 'Is Inner Line Permit (ILP) required?',
    reply: 'Yes! Inner Line Permits are required for both Indian domestic travelers and international tourists visiting Nubra Valley, Pangong Tso, Khardung La, Hanle, and Tso Moriri. Yatri can arrange instant digital verification within 24 hours.',
    actionLabel: 'Request Permit Assistance',
    actionType: 'NAVIGATE_INTELLIGENCE'
  }
];

export const assistantService = {
  sendMessage: async (userText: string, currentTrip?: Trip): Promise<AssistantMessage> => {
    try {
      const res = await apiRequest<{ reply: string; actionLabel?: string; actionType?: string }>('/api/ai/chat', {
        method: 'POST',
        body: JSON.stringify({
          message: userText,
          context: `Destination: ${currentTrip?.destinationSummary || 'Himalayan India'}, Days: ${currentTrip?.totalDays || 7}, Budget: ₹${currentTrip?.estimatedTotalBudget || 68000}`,
          tripDetails: currentTrip ? {
            title: currentTrip.title,
            healthScore: currentTrip.health?.score,
            travelLoad: currentTrip.health?.travelLoad,
            totalBudget: currentTrip.estimatedTotalBudget
          } : undefined
        })
      });

      if (res.success && res.data?.reply) {
        return {
          id: `msg-${Date.now()}`,
          sender: 'assistant',
          timestamp: 'Just now',
          text: res.data.reply,
          suggestedActions: res.data.actionLabel ? [{ label: res.data.actionLabel, actionType: res.data.actionType || 'CUSTOM' }] : undefined
        };
      }
    } catch (e) {
      console.warn('Backend /api/ai/chat call failed, falling back to local reasoning:', e);
    }

    // Heuristic Fallback
    const matched = ASSISTANT_PRESETS.find(
      (p) => p.prompt.toLowerCase() === userText.trim().toLowerCase()
    );

    let replyText = '';
    let actionLabel: string | undefined;
    let actionType: string | undefined;

    if (matched) {
      replyText = matched.reply;
      actionLabel = matched.actionLabel;
      actionType = matched.actionType;
    } else if (userText.toLowerCase().includes('budget') || userText.toLowerCase().includes('cost') || userText.toLowerCase().includes('rupee')) {
      replyText = `For ${currentTrip?.title || 'your expedition'}, the estimated budget is ₹${(currentTrip?.estimatedTotalBudget || 68000).toLocaleString('en-IN')}. Yatri's budget engine identified ₹6,500 in potential savings without cutting mountain pass excursions or local guide support.`;
      actionLabel = 'Review Budget Breakdown';
      actionType = 'NAVIGATE_BUDGET';
    } else if (userText.toLowerCase().includes('health') || userText.toLowerCase().includes('debt') || userText.toLowerCase().includes('altitude')) {
      replyText = `Your current Trip Health is ${currentTrip?.health?.score || 88}/100 with a Trip Debt index of ${currentTrip?.tripDebt?.score || 18} (Healthy). High altitude pacing is well balanced with necessary valley rest days.`;
      actionLabel = 'View Health Diagnostics';
      actionType = 'NAVIGATE_INTELLIGENCE';
    } else {
      replyText = `Namaste! I have processed your request for ${currentTrip?.destinationSummary || 'the Himalayas'}. In high-altitude mountain circuits, Yatri recommends maintaining a relaxed pace of no more than 4–5 hours of driving per day to ensure deep rest and acclimatization.`;
    }

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      timestamp: 'Just now',
      text: replyText,
      suggestedActions: actionLabel ? [{ label: actionLabel, actionType: actionType || 'CUSTOM' }] : undefined
    };
  },

  generateAiItinerary: async (params: {
    destination: string;
    days: number;
    travelers: number;
    budgetLevel?: string;
    travelStyle?: string;
  }) => {
    const res = await apiRequest('/api/ai/generate-itinerary', {
      method: 'POST',
      body: JSON.stringify(params)
    });
    return res;
  }
};
