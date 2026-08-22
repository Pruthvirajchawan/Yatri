import { Router } from 'express';
import { backendStore } from '../store';

export const inquiriesRouter = Router();

// GET /api/inquiries
inquiriesRouter.get('/', (req, res) => {
  const list = backendStore.getAllInquiries();
  res.json({
    success: true,
    total: list.length,
    data: list
  });
});

// POST /api/inquiries
inquiriesRouter.post('/', (req, res) => {
  try {
    const { name, email, phone, destination, preferredMonth, groupSize, adventureType, specialRequirements } = req.body;

    if (!name || !email || !destination) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and destination are required'
      });
    }

    const inquiry = backendStore.createInquiry({
      name,
      email,
      phone: phone || '',
      destination,
      preferredMonth: preferredMonth || 'Upcoming Season',
      groupSize: Number(groupSize) || 2,
      adventureType: adventureType || 'Mountain Expedition',
      specialRequirements
    });

    res.status(201).json({
      success: true,
      message: 'Inquiry received. A certified Yatri mountain specialist will connect within 4 business hours.',
      data: inquiry
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});
