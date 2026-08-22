import { Router } from 'express';

export const calculatorRouter = Router();

// POST /api/calculator/estimate
calculatorRouter.post('/estimate', (req, res) => {
  try {
    const {
      destination = 'jaipur',
      durationDays = 4,
      travelers = 2,
      stayTier = 'comfort', // 'homestay' | 'comfort' | 'luxury'
      transportMode = 'private_ac_cab', // 'private_ac_cab' | 'suv_4x4' | 'bike_rental' | 'tempo_shared' | 'self_drive'
      includeLocalGuide = true,
      includePermits = true,
      includeOxygenSafetyKit = false
    } = req.body;

    const days = Math.max(2, Math.min(30, Number(durationDays) || 4));
    const people = Math.max(1, Math.min(20, Number(travelers) || 2));
    const destStr = String(destination).toLowerCase();

    const isMountain = destStr.includes('ladakh') || destStr.includes('spiti') || destStr.includes('kashmir') || destStr.includes('manali');

    // Stays pricing per room (assuming 2 travelers per room)
    const roomsCount = Math.ceil(people / 2);
    const stayRates: Record<string, number> = {
      homestay: 1500, // Authentic heritage homestay / budget hotel
      comfort: 2800, // 3-4 Star verified hotel / boutique resort / houseboat
      luxury: 5800  // 5-Star Palace / Royal Heritage Haveli / Luxury Villa
    };
    const dailyStayRate = stayRates[stayTier] || 2800;
    const totalStayCost = dailyStayRate * roomsCount * (days - 1);

    // Transport daily costs
    const transportRates: Record<string, number> = {
      private_ac_cab: 2400, // Private AC Sedan / Swift Dzire / Etios
      suv_4x4: 3800, // Toyota Innova Crysta / Mahindra Scorpio
      bike_rental: 900 * Math.ceil(people / 2), // Rental Bike / Scooter
      tempo_shared: 4500, // AC Tempo Traveler for groups
      self_drive: 2000 // Self-drive Hatchback
    };
    const dailyTransportRate = transportRates[transportMode] || (isMountain ? 3800 : 2400);
    const totalTransportCost = dailyTransportRate * days;

    // Food & Dining allowance per person per day
    const foodDailyPerPerson = stayTier === 'luxury' ? 1200 : stayTier === 'comfort' ? 700 : 450;
    const totalFoodCost = foodDailyPerPerson * people * days;

    // Addons
    const permitsCost = includePermits ? (isMountain ? 650 * people : 350 * people) : 0; // Monument entry / eco fees
    const guideCost = includeLocalGuide ? 1500 * Math.min(days, 3) : 0; // Certified regional historian / local guide
    const oxygenKitCost = (includeOxygenSafetyKit && isMountain) ? 1200 * Math.ceil(people / 3) : 0;

    const subtotal = totalStayCost + totalTransportCost + totalFoodCost + permitsCost + guideCost + oxygenKitCost;
    const gstTax = Math.round(subtotal * 0.05); // 5% GST
    const grandTotal = subtotal + gstTax;
    const perPerson = Math.round(grandTotal / people);

    // Contextual recommendations
    const recommendations: string[] = [];
    if (destStr.includes('jaipur') || destStr.includes('rajasthan')) {
      recommendations.push('Visit Amber Fort & Nahargarh during morning golden hour for cooler weather and great photos.');
      recommendations.push('Pre-book composite monument tickets online to skip ticket counter queues.');
      recommendations.push('Enjoy traditional Dal Baati Churma and Ghewar at heritage Johari Bazaar.');
    } else if (destStr.includes('kerala') || destStr.includes('alleppey')) {
      recommendations.push('Opt for sunset backwater canoeing for access to narrow village waterways.');
      recommendations.push('Sample authentic Kerala Sadhya served on fresh plantain leaves.');
      recommendations.push('Carry light cotton clothes and eco-friendly sunscreen.');
    } else if (destStr.includes('varanasi')) {
      recommendations.push('Book an evening boat at Dashashwamedh Ghat for front-row views of the Ganga Maha Aarti.');
      recommendations.push('Explore early morning Subah-e-Banaras classical music recitals at Assi Ghat.');
    } else if (destStr.includes('somnath') || destStr.includes('gujarat')) {
      recommendations.push('Attend the evening Sound & Light laser show at Somnath Temple overlooking the Arabian Sea.');
      recommendations.push('Pair your visit with coastal promenade walks along the Veraval seafront.');
    } else if (isMountain) {
      recommendations.push('Acclimatize in Leh / valley base for 24-48 hours before crossing high altitude passes.');
      recommendations.push('Carry cash in hand (₹3,000-₹5,000) as remote passes have limited digital network.');
      recommendations.push('Keep hydrated with warm lemon-honey-ginger tea.');
    } else {
      recommendations.push('Book domestic flights/trains 3-4 weeks in advance for best seasonal rates.');
      recommendations.push('Carry a reusable water bottle and respect regional monument dress codes.');
    }

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
          permitsAndMonumentEntry: permitsCost,
          localCertifiedGuide: guideCost,
          safetyAddons: oxygenKitCost,
          subtotal,
          taxesAndGST: gstTax
        },
        grandTotal,
        costPerPerson: perPerson,
        recommendations
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});
