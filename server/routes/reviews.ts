import { Router } from 'express';
import { backendStore } from '../store';

export const reviewsRouter = Router();

// GET /api/reviews
reviewsRouter.get('/', (req, res) => {
  const { destinationId } = req.query;
  if (destinationId) {
    const list = backendStore.getReviewsForDestination(destinationId as string);
    return res.json({ success: true, count: list.length, data: list });
  }
  const all = backendStore.getAllReviews();
  res.json({ success: true, count: all.length, data: all });
});

// POST /api/reviews
reviewsRouter.post('/', (req, res) => {
  try {
    const { destinationId, userName, userCity, rating, reviewTitle, comment, altitudeExperienced, tags } = req.body;

    if (!destinationId || !userName || !rating || !comment) {
      return res.status(400).json({
        success: false,
        error: 'Destination, user name, rating, and review text are required.'
      });
    }

    const review = backendStore.addReview({
      destinationId,
      userName,
      userCity: userCity || 'India',
      rating: Number(rating),
      reviewTitle: reviewTitle || 'Incredible experience with Yatri',
      comment,
      visitedDate: 'Recently Verified',
      altitudeExperienced: altitudeExperienced || 'High Himalayan Pass',
      tags: tags || ['Verified Traveler', 'Mountain Insight']
    });

    res.status(201).json({
      success: true,
      message: 'Review published successfully!',
      data: review
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/reviews/:id/helpful
reviewsRouter.post('/:id/helpful', (req, res) => {
  const ok = backendStore.voteHelpfulReview(req.params.id);
  if (!ok) {
    return res.status(404).json({ success: false, error: 'Review not found' });
  }
  res.json({ success: true, message: 'Helpful vote recorded' });
});
