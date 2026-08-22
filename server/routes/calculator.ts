import { Router } from 'express';

export const calculatorRouter = Router();

// POST /api/calculator/estimate
calculatorRouter.post('/estimate', (req, res) => {
  try {
    const {
      destination = 'ladakh',
      durationDays = 7,
      travelers = 2,
      stayTier = 'comfort', // 'homestay' | 'comfort' | 'luxury'
      transportMode = 'suv_4x4', // 'suv_4x4' | 'bike_himalayan' | 'tempo_shared' | 'self_drive'
      includeSherpaGuide = true,
      includePermits = true,
      includeOxygenSafetyKit = true
    } = req.body;

    const days = Math.max(2, Math.min(30, Number(durationDays) || 7));
    const people = Math.max(1, Math.min(20, Number(travelers) || 2));

    // Stays pricing per room (assuming 2 per room)
    const roomsCount = Math.ceil(people / 2);
    const stayRates: Record<string, number> = {
      homestay: 1800,
      comfort: 3800,
      luxury: 7500
    };
    const dailyStayRate = stayRates[stayTier] || 3800;
    const totalStayCost = dailyStayRate * roomsCount * (days - 1);

    // Transport daily costs
    const transportRates: Record<string, number> = {
      suv_4x4: 5500, // Scorpio 4x4 / Innova Crysta
      bike_himalayan: 2200 * people, // Royal Enfield Himalayan 450 per bike
      tempo_shared: 7000, // Tempo traveler for larger group
      self_drive: 3200 // Hatchback/Sedan
    };
    const dailyTransportRate = transportRates[transportMode] || 5500;
    const totalTransportCost = dailyTransportRate * days;

    // Food & Chai allowance per person per day
    const foodDailyPerPerson = stayTier === 'luxury' ? 1500 : stayTier === 'comfort' ? 900 : 600;
    const totalFoodCost = foodDailyPerPerson * people * days;

    // Addons
    const permitsCost = includePermits ? 850 * people : 0; // Inner Line Permit & Wildlife fees
    const guideCost = includeSherpaGuide ? 2500 * days : 0; // Certified local mountain guide
    const oxygenKitCost = includeOxygenSafetyKit ? 1800 * Math.ceil(people / 3) : 0; // Medical grade O2 cylinder + pulse oximeter

    const subtotal = totalStayCost + totalTransportCost + totalFoodCost + permitsCost + guideCost + oxygenKitCost;
    const gstTax = Math.round(subtotal * 0.05); // 5% standard travel GST
    const grandTotal = subtotal + gstTax;
    const perPerson = Math.round(grandTotal / people);

    res.json({
      success: true,
      data: {
        currency: 'INR',
        symbol: '₹',
        destination,
        durationDays: days,
        travelers: people,
        breakdown: {
          stays: totalStayCost,
          transport: totalTransportCost,
          foodAndRefreshments: totalFoodCost,
          permitsAndGreenFees: permitsCost,
          localCertifiedGuide: guideCost,
          altitudeSafetyOxygenKit: oxygenKitCost,
          subtotal,
          taxesAndGST: gstTax
        },
        grandTotal,
        costPerPerson: perPerson,
        recommendations: [
          'Book Khardung La & Pangong permits at least 72 hours in advance.',
          'Keep minimum ₹5,000 cash in hand as high-altitude passes have zero digital network.',
          'Hydrate with warm ginger-lemon-honey tea to combat mountain sickness.'
        ]
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});
