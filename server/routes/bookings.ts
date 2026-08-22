import { Router } from 'express';
import { backendStore } from '../store';

export const bookingsRouter = Router();

// GET /api/bookings
bookingsRouter.get('/', (req, res) => {
  const bookings = backendStore.getAllBookings();
  res.json({
    success: true,
    total: bookings.length,
    data: bookings
  });
});

// GET /api/bookings/:id (by ID or PNR)
bookingsRouter.get('/:id', (req, res) => {
  const booking = backendStore.getBookingById(req.params.id);
  if (!booking) {
    return res.status(404).json({ success: false, error: 'Booking or PNR not found' });
  }
  res.json({
    success: true,
    data: booking
  });
});

// POST /api/bookings
bookingsRouter.post('/', (req, res) => {
  try {
    const {
      destinationId,
      destinationName,
      leadName,
      email,
      phone,
      emergencyContact,
      travelerCount,
      startDate,
      endDate,
      roomType = 'Standard',
      guideIncluded = true,
      vehicleType = '4x4 SUV (Scorpio/Fortuner)',
      permitAssistance = true,
      totalPrice = 45000,
      paymentId = `PAY-UPI-${Math.floor(10000000 + Math.random() * 90000000)}`,
      notes
    } = req.body;

    if (!leadName || !email || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Lead traveler name, email, and phone number are required.'
      });
    }

    const newBooking = backendStore.createBooking({
      destinationId: destinationId || 'ladakh',
      destinationName: destinationName || 'Himalayan Expedition',
      leadName,
      email,
      phone,
      emergencyContact: emergencyContact || 'Family Member',
      travelerCount: Number(travelerCount) || 2,
      startDate: startDate || new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0],
      endDate: endDate || new Date(Date.now() + 86400000 * 21).toISOString().split('T')[0],
      roomType,
      guideIncluded: Boolean(guideIncluded),
      vehicleType,
      permitAssistance: Boolean(permitAssistance),
      totalPrice: Number(totalPrice) || 45000,
      paymentStatus: 'PAID',
      paymentId,
      notes
    });

    res.status(201).json({
      success: true,
      message: `Booking confirmed! PNR: ${newBooking.pnr}`,
      data: newBooking
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH /api/bookings/:id/status
bookingsRouter.patch('/:id/status', (req, res) => {
  const { status } = req.body;
  if (!['CONFIRMED', 'PROCESSING', 'CANCELLED'].includes(status)) {
    return res.status(400).json({ success: false, error: 'Invalid status' });
  }
  const updated = backendStore.updateBookingStatus(req.params.id, status);
  if (!updated) {
    return res.status(404).json({ success: false, error: 'Booking not found' });
  }
  res.json({
    success: true,
    message: `Booking status updated to ${status}`,
    data: updated
  });
});
