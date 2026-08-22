import { Router } from 'express';
import { getGenAI } from '../gemini';

export const aiRouter = Router();

// POST /api/ai/chat
aiRouter.post('/chat', async (req, res) => {
  try {
    const { message, context, tripDetails } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ success: false, error: 'Message is required' });
    }

    const ai = getGenAI();

    if (ai) {
      const systemInstruction = `You are Yatri AI, India's premier mountain and cultural travel companion.
Your expertise spans Himalayan expeditions (Ladakh, Spiti, Kashmir, Himachal, Uttarakhand, Sikkim, Arunachal), high-altitude physiology (AMS acclimatization, Khardung La/Kunzum Pass crossings), budget engineering in Indian Rupees (₹), and sustainable local homestay travel.
Provide concise, vivid, highly actionable travel advice. Always format pricing in INR with the ₹ symbol. Suggest realistic timings, road conditions, and fatigue trade-offs.

Context:
${context || 'General Indian Mountain Travel'}
${tripDetails ? `Current Trip: ${JSON.stringify(tripDetails)}` : ''}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: message,
        config: {
          systemInstruction,
          temperature: 0.7
        }
      });

      const replyText = response.text || 'I have analyzed your journey. Please ensure adequate acclimatization and warm layers for the high passes.';

      return res.json({
        success: true,
        source: 'gemini',
        data: {
          reply: replyText,
          timestamp: new Date().toISOString()
        }
      });
    }

    // Heuristic Fallback if Gemini key is not configured
    const lower = message.toLowerCase();
    let reply = '';
    let actionLabel: string | undefined;

    if (lower.includes('acclimatization') || lower.includes('altitude') || lower.includes('headache') || lower.includes('sick')) {
      reply = 'For high altitudes (10,000+ ft like Leh or Kaza), follow the Golden Rule: Rest completely for the first 48 hours. Drink at least 3.5L of warm water daily, avoid alcohol, and keep Diamox/ORS handy upon doctor recommendation.';
      actionLabel = 'View Altitude Telemetry';
    } else if (lower.includes('budget') || lower.includes('cost') || lower.includes('rupee') || lower.includes('save') || lower.includes('price')) {
      reply = 'In Indian mountain circuits like Ladakh & Spiti, 4x4 fuel and Inner Line permits make up ~50% of logistical costs. You can save ₹4,000–₹8,000 per person by booking shared tempo travelers and opting for warm family-run Ladakhi homestays in Hunder and Turtuk.';
      actionLabel = 'Open Budget Calculator';
    } else if (lower.includes('best time') || lower.includes('season') || lower.includes('weather') || lower.includes('snow')) {
      reply = 'For Leh & Spiti, the optimal window is May to September when mountain passes (Kunzum, Rohtang, Khardung La) are free of heavy snowdrifts. For winter snow, frozen Pangong, or Chadar ice trek, January to February offers surreal -20°C frozen landscapes.';
      actionLabel = 'Check Mountain Passes';
    } else if (lower.includes('permit') || lower.includes('ilp') || lower.includes('border') || lower.includes('pass')) {
      reply = 'Inner Line Permits (ILP) are mandatory for Indian and foreign nationals visiting Pangong Tso, Nubra Valley, Khardung La, Hanle, and Tso Moriri. They are valid for 15 days and cost approx ₹850 (including environment & red cross fees).';
      actionLabel = 'Request Permit Assistance';
    } else {
      reply = `Namaste! Based on your interest in Indian mountain journeys, Yatri recommends keeping a relaxed pacing of no more than 4–5 hours of driving per day in high-altitude zones to preserve energy for scenic hikes and local culture.`;
    }

    return res.json({
      success: true,
      source: 'heuristic',
      data: {
        reply,
        actionLabel,
        timestamp: new Date().toISOString()
      }
    });
  } catch (err: any) {
    console.error('AI chat error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/ai/generate-itinerary
aiRouter.post('/generate-itinerary', async (req, res) => {
  try {
    const { destination, days = 5, travelers = 2, budgetLevel = 'balanced', travelStyle = 'explorer' } = req.body;

    const ai = getGenAI();

    if (ai) {
      const prompt = `Generate a realistic ${days}-day travel itinerary for ${destination || 'Ladakh'}, India for ${travelers} travelers with a ${budgetLevel} budget and ${travelStyle} style.
Return a valid JSON object with the following structure:
{
  "title": "Trip Title",
  "destinationSummary": "Summary of places",
  "totalDays": ${days},
  "estimatedTotalBudget": 45000,
  "healthScore": 88,
  "itinerary": [
    {
      "dayNumber": 1,
      "date": "Day 1",
      "city": "City/Region name with altitude if applicable",
      "theme": "Theme of the day",
      "loadLevel": "low",
      "activities": [
        {
          "title": "Activity Name",
          "category": "sightseeing",
          "time": "09:00 AM",
          "durationHours": 2,
          "cost": 500,
          "location": "Specific location",
          "description": "Short vivid description"
        }
      ]
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const text = response.text;
      if (text) {
        const parsed = JSON.parse(text);
        return res.json({ success: true, source: 'gemini', data: parsed });
      }
    }

    // Fallback template itinerary
    const fallbackItinerary = {
      title: `${destination || 'Himalayan'} ${days}-Day Expedition`,
      destinationSummary: `${destination || 'Ladakh'} · High Passes & Scenic Valleys`,
      totalDays: Number(days),
      estimatedTotalBudget: Number(days) * 7500 * Number(travelers),
      healthScore: 90,
      itinerary: Array.from({ length: Number(days) }).map((_, i) => ({
        dayNumber: i + 1,
        date: `Day ${i + 1}`,
        city: `${destination || 'Himalayan Ridge'} Base`,
        theme: i === 0 ? 'Arrival & Gentle Acclimatization' : i === Number(days) - 1 ? 'Souvenirs & Departure' : 'Scenic Alpine Trail & Culture',
        loadLevel: i === 0 ? 'low' : 'moderate',
        activities: [
          {
            id: `gen-act-${i}-1`,
            title: i === 0 ? 'Check-in & Altitude Rest' : 'Morning Vista Exploration & Photography',
            category: 'sightseeing',
            time: '09:00 AM',
            durationHours: 2.5,
            cost: 800,
            location: 'Scenic Viewpoint',
            description: 'Enjoy crisp mountain air and panoramic valley panoramas.'
          },
          {
            id: `gen-act-${i}-2`,
            title: 'Local Cultural Heritage & Authentic Cuisine',
            category: 'culture',
            time: '02:00 PM',
            durationHours: 2,
            cost: 650,
            location: 'Old Town Heritage Quarter',
            description: 'Sample authentic regional delicacies and interact with local craftspeople.'
          }
        ]
      }))
    };

    res.json({ success: true, source: 'template', data: fallbackItinerary });
  } catch (err: any) {
    console.error('AI generate-itinerary error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});
