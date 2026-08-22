import fs from 'fs';
import path from 'path';

export interface BookingRecord {
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
  roomType: 'Standard' | 'Deluxe Mountain View' | 'Luxury Camp' | 'Homestay';
  guideIncluded: boolean;
  vehicleType: 'None' | '4x4 SUV (Scorpio/Fortuner)' | 'Himalayan 450' | 'Private Tempo Traveler';
  permitAssistance: boolean;
  totalPrice: number;
  status: 'CONFIRMED' | 'PROCESSING' | 'CANCELLED';
  paymentStatus: 'PAID' | 'PARTIAL' | 'PENDING';
  paymentId: string;
  createdAt: string;
  notes?: string;
}

export interface ExpeditionInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  destination: string;
  preferredMonth: string;
  groupSize: number;
  adventureType: string;
  specialRequirements?: string;
  createdAt: string;
  status: 'NEW' | 'CONTACTED' | 'PROPOSAL_SENT';
}

export interface DestinationReview {
  id: string;
  destinationId: string;
  userName: string;
  userCity: string;
  userAvatar?: string;
  rating: number;
  reviewTitle: string;
  comment: string;
  visitedDate: string;
  helpfulCount: number;
  altitudeExperienced?: string;
  tags?: string[];
  createdAt: string;
}

export interface MountainTelemetry {
  destinationId: string;
  name: string;
  currentAltitude: string;
  temperature: string;
  weatherCondition: string;
  windSpeed: string;
  passStatus: {
    passName: string;
    altitude: string;
    status: 'OPEN' | '4X4_ONLY' | 'CHAINS_REQUIRED' | 'CLOSED_SNOW';
    lastUpdated: string;
  }[];
  permitStatus: 'NOT_REQUIRED' | 'INNER_LINE_PERMIT_ACTIVE' | 'SPECIAL_AREA_PERMIT';
  acclimatizationNotice: string;
}

// Initial Seed Data
const SEED_BOOKINGS: BookingRecord[] = [
  {
    id: 'bkg-101',
    pnr: 'YTR-LDK-8941',
    destinationId: 'ladakh',
    destinationName: 'Leh Ladakh High Passes',
    leadName: 'Aarav Sharma',
    email: 'aarav.sharma@example.in',
    phone: '+91 98765 43210',
    emergencyContact: '+91 98111 22334 (Brother)',
    travelerCount: 2,
    startDate: '2026-09-10',
    endDate: '2026-09-17',
    roomType: 'Deluxe Mountain View',
    guideIncluded: true,
    vehicleType: '4x4 SUV (Scorpio/Fortuner)',
    permitAssistance: true,
    totalPrice: 68500,
    status: 'CONFIRMED',
    paymentStatus: 'PAID',
    paymentId: 'PAY-UPI-98214981',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    notes: 'Requires 2-day acclimatization in Leh before Khardung La.'
  },
  {
    id: 'bkg-102',
    pnr: 'YTR-KSM-5219',
    destinationId: 'kashmir',
    destinationName: 'Kashmir Valley & Great Lakes',
    leadName: 'Priya Mukherjee',
    email: 'priya.m@example.in',
    phone: '+91 97654 32109',
    emergencyContact: '+91 98222 33445 (Spouse)',
    travelerCount: 4,
    startDate: '2026-10-02',
    endDate: '2026-10-08',
    roomType: 'Luxury Camp',
    guideIncluded: true,
    vehicleType: 'Private Tempo Traveler',
    permitAssistance: false,
    totalPrice: 94000,
    status: 'CONFIRMED',
    paymentStatus: 'PAID',
    paymentId: 'PAY-HDFC-61782390',
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    notes: 'Vegetarian meals requested during Sonamarg trek.'
  }
];

const SEED_REVIEWS: DestinationReview[] = [
  {
    id: 'rev-1',
    destinationId: 'ladakh',
    userName: 'Rohan Deshmukh',
    userCity: 'Pune, Maharashtra',
    rating: 5,
    reviewTitle: 'Unmatched scale & crystal clear night skies at Pangong',
    comment: 'The drive across Chang La was intense but our local Yatri driver made it effortless. Spend at least 48 hours resting in Leh city before climbing higher.',
    visitedDate: 'September 2025',
    helpfulCount: 42,
    altitudeExperienced: '17,590 ft (Khardung La)',
    tags: ['Acclimatization Tips', 'Stargazing', '4x4 Travel'],
    createdAt: '2025-10-04T12:00:00Z'
  },
  {
    id: 'rev-2',
    destinationId: 'spiti',
    userName: 'Ananya Iyer',
    userCity: 'Bengaluru, Karnataka',
    rating: 5,
    reviewTitle: 'Raw, mystical, and peaceful at Key Monastery',
    comment: 'Spiti tested our endurance on the Kunzum Pass stretch, but the warmth of homestays in Kaza and morning chants at Key Monastery made it life-changing.',
    visitedDate: 'July 2025',
    helpfulCount: 29,
    altitudeExperienced: '14,931 ft (Kunzum Pass)',
    tags: ['Homestays', 'Buddhism', 'Rugged Terrain'],
    createdAt: '2025-08-11T14:30:00Z'
  },
  {
    id: 'rev-3',
    destinationId: 'kashmir',
    userName: 'Vikram Malhotra',
    userCity: 'New Delhi',
    rating: 5,
    reviewTitle: 'Shikara sunset on Dal Lake was sheer poetry',
    comment: 'Pahalgam and Gulmarg Gondola phase 2 were breathtaking with fresh powder snow. Incredible saffron tea (Kahwa) everywhere.',
    visitedDate: 'December 2025',
    helpfulCount: 38,
    altitudeExperienced: '13,780 ft (Apharwat Peak)',
    tags: ['Snow', 'Gondola', 'Houseboat'],
    createdAt: '2026-01-05T09:15:00Z'
  }
];

const MOUNTAIN_TELEMETRY: Record<string, MountainTelemetry> = {
  ladakh: {
    destinationId: 'ladakh',
    name: 'Leh Ladakh',
    currentAltitude: '11,500 ft (Leh) • 17,982 ft (Khardung La)',
    temperature: '12°C Day / -2°C Night',
    weatherCondition: 'Clear Blue Sky, Low Humidity',
    windSpeed: '18 km/h NW',
    passStatus: [
      { passName: 'Khardung La (17,982 ft)', altitude: '17,982 ft', status: 'OPEN', lastUpdated: '1 hour ago' },
      { passName: 'Chang La (17,590 ft)', altitude: '17,590 ft', status: 'OPEN', lastUpdated: '3 hours ago' },
      { passName: 'Zojila Pass (11,575 ft)', altitude: '11,575 ft', status: '4X4_ONLY', lastUpdated: 'Today 06:00 AM' }
    ],
    permitStatus: 'INNER_LINE_PERMIT_ACTIVE',
    acclimatizationNotice: 'Mandatory 48-hour active rest in Leh town required by UT Ladakh Administration before visiting Nubra or Pangong.'
  },
  spiti: {
    destinationId: 'spiti',
    name: 'Spiti Valley',
    currentAltitude: '12,500 ft (Kaza) • 14,931 ft (Kunzum Pass)',
    temperature: '9°C Day / -5°C Night',
    weatherCondition: 'Dry Alpine Sunlight',
    windSpeed: '22 km/h W',
    passStatus: [
      { passName: 'Kunzum Pass (14,931 ft)', altitude: '14,931 ft', status: 'OPEN', lastUpdated: '2 hours ago' },
      { passName: 'Rohtang Pass (13,058 ft)', altitude: '13,058 ft', status: 'OPEN', lastUpdated: '1 hour ago' }
    ],
    permitStatus: 'NOT_REQUIRED',
    acclimatizationNotice: 'Hydrate continuously with ORS / warm water. Keep Diamox handy upon medical advice.'
  },
  kashmir: {
    destinationId: 'kashmir',
    name: 'Kashmir Valley',
    currentAltitude: '5,200 ft (Srinagar) • 13,780 ft (Gulmarg)',
    temperature: '18°C Day / 6°C Night',
    weatherCondition: 'Pleasant & Crisp Breeze',
    windSpeed: '12 km/h S',
    passStatus: [
      { passName: 'Razdan Pass (11,672 ft)', altitude: '11,672 ft', status: 'OPEN', lastUpdated: '4 hours ago' },
      { passName: 'Sinthan Top (12,414 ft)', altitude: '12,414 ft', status: 'OPEN', lastUpdated: 'Today' }
    ],
    permitStatus: 'NOT_REQUIRED',
    acclimatizationNotice: 'No extreme altitude risk in valley; layer up warmly for Gulmarg Phase 2 & Apharwat Peak.'
  }
};

class BackendStore {
  private bookings: BookingRecord[] = [...SEED_BOOKINGS];
  private reviews: DestinationReview[] = [...SEED_REVIEWS];
  private inquiries: ExpeditionInquiry[] = [];
  private trips: any[] = [];
  private persistenceFile = path.join(process.cwd(), '.yatri_store.json');

  constructor() {
    this.loadFromDisk();
  }

  private loadFromDisk() {
    try {
      if (fs.existsSync(this.persistenceFile)) {
        const raw = fs.readFileSync(this.persistenceFile, 'utf-8');
        const data = JSON.parse(raw);
        if (data.bookings) this.bookings = data.bookings;
        if (data.reviews) this.reviews = data.reviews;
        if (data.inquiries) this.inquiries = data.inquiries;
        if (data.trips) this.trips = data.trips;
      }
    } catch (e) {
      console.warn('Could not load persistence file, using memory seed:', e);
    }
  }

  private saveToDisk() {
    try {
      const data = {
        bookings: this.bookings,
        reviews: this.reviews,
        inquiries: this.inquiries,
        trips: this.trips,
        lastSaved: new Date().toISOString()
      };
      fs.writeFileSync(this.persistenceFile, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
      console.warn('Could not write persistence file:', e);
    }
  }

  // Bookings
  getAllBookings(): BookingRecord[] {
    return [...this.bookings];
  }

  getBookingById(id: string): BookingRecord | undefined {
    return this.bookings.find((b) => b.id === id || b.pnr.toUpperCase() === id.toUpperCase());
  }

  createBooking(data: Omit<BookingRecord, 'id' | 'pnr' | 'createdAt' | 'status'>): BookingRecord {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const prefix = (data.destinationName.slice(0, 3) || 'IND').toUpperCase();
    const newBooking: BookingRecord = {
      ...data,
      id: `bkg-${Date.now()}`,
      pnr: `YTR-${prefix}-${randomDigits}`,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString()
    };
    this.bookings.unshift(newBooking);
    this.saveToDisk();
    return newBooking;
  }

  updateBookingStatus(id: string, status: 'CONFIRMED' | 'PROCESSING' | 'CANCELLED'): BookingRecord | null {
    const booking = this.bookings.find((b) => b.id === id || b.pnr === id);
    if (!booking) return null;
    booking.status = status;
    this.saveToDisk();
    return booking;
  }

  // Reviews
  getReviewsForDestination(destinationId: string): DestinationReview[] {
    return this.reviews.filter(
      (r) => r.destinationId.toLowerCase() === destinationId.toLowerCase()
    );
  }

  getAllReviews(): DestinationReview[] {
    return [...this.reviews];
  }

  addReview(data: Omit<DestinationReview, 'id' | 'createdAt' | 'helpfulCount'>): DestinationReview {
    const newReview: DestinationReview = {
      ...data,
      id: `rev-${Date.now()}`,
      helpfulCount: 0,
      createdAt: new Date().toISOString()
    };
    this.reviews.unshift(newReview);
    this.saveToDisk();
    return newReview;
  }

  voteHelpfulReview(id: string): boolean {
    const rev = this.reviews.find((r) => r.id === id);
    if (!rev) return false;
    rev.helpfulCount += 1;
    this.saveToDisk();
    return true;
  }

  // Inquiries
  createInquiry(data: Omit<ExpeditionInquiry, 'id' | 'createdAt' | 'status'>): ExpeditionInquiry {
    const newInquiry: ExpeditionInquiry = {
      ...data,
      id: `inq-${Date.now()}`,
      status: 'NEW',
      createdAt: new Date().toISOString()
    };
    this.inquiries.unshift(newInquiry);
    this.saveToDisk();
    return newInquiry;
  }

  getAllInquiries(): ExpeditionInquiry[] {
    return [...this.inquiries];
  }

  // Telemetry
  getMountainTelemetry(destinationId: string): MountainTelemetry | null {
    const key = destinationId.toLowerCase();
    if (MOUNTAIN_TELEMETRY[key]) {
      return MOUNTAIN_TELEMETRY[key];
    }
    // Generic fallback for other Indian destinations
    return {
      destinationId,
      name: destinationId.charAt(0).toUpperCase() + destinationId.slice(1),
      currentAltitude: '6,200 ft - 11,000 ft',
      temperature: '16°C Day / 8°C Night',
      weatherCondition: 'Clear & Sunny',
      windSpeed: '10 km/h',
      passStatus: [
        { passName: 'Regional Mountain Pass', altitude: '9,800 ft', status: 'OPEN', lastUpdated: 'Today' }
      ],
      permitStatus: 'NOT_REQUIRED',
      acclimatizationNotice: 'Standard mountain hydration and sun protection recommended.'
    };
  }

  // Trips Cache
  getTrips(): any[] {
    return [...this.trips];
  }

  saveTrips(trips: any[]) {
    this.trips = trips;
    this.saveToDisk();
  }
}

export const backendStore = new BackendStore();
