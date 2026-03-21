import apiClient from '../../../services/apiClient';

// ─── Package ────────────────────────────────────────────────────────────────

export const fetchPackageById = async (packageId) => {
  const response = await apiClient.get(`/api/packages/${packageId}`);
  // API returns an array [ {...} ] — extract the first element
  const data = Array.isArray(response.data) ? response.data[0] : response.data;
  if (!data) throw new Error('Package not found');
  return data;
};

export const calculatePackagePrice = async (packageId, activityIds = []) => {
  const response = await apiClient.post(`/api/packages/${packageId}/calculate`, {
    activityIds,
  });
  return response.data;
};

// ─── Stays (Hotels) ─────────────────────────────────────────────────────────

export const fetchStaysByRegion = async (region) => {
  const response = await apiClient.get('/api/stays', { params: { region } });
  return response.data;
};

export const fetchStayById = async (stayId) => {
  const response = await apiClient.get(`/api/stays/${stayId}`);
  return response.data;
};

// ─── Activities (faked — no backend endpoint yet) ────────────────────────────

export const fetchActivitiesByDay = async (packageId, day) => {
  // TODO: replace with real endpoint when backend is ready
  return FAKE_ACTIVITIES;
};

export const fetchActivityById = async (activityId) => {
  // TODO: replace with real endpoint
  return FAKE_ACTIVITIES.find((a) => a.id === activityId) || null;
};

// ─── Booking ─────────────────────────────────────────────────────────────────

export const createBooking = async ({ packageId, totalAmount, travellers }) => {
  const response = await apiClient.post('/api/bookings', {
    packageId,
    totalAmount,
    travellers,
  });
  return response.data;
};

// ─── Fake data (until backend endpoints are ready) ───────────────────────────

export const FAKE_ACTIVITIES = [
  {
    id: 'act-1',
    type: 'Activity',
    title: 'North Goa Sightseeing (Private Transfers from Ex North Goa)',
    description:
      'Spend the day visiting happening markets and beaches in North Goa. Visit Fort Aguada, Sinquerim Beach, Calangute Beach, Baga Beach, Anjuna, Vagator Beach and Chapora Fort. Note: Private transfers included. Chapora Fort closes at 5:00 PM.',
    duration: '9 Hours',
    timing: 'Morning',
    price: 1077,
    imageUrl: null,
    inclusions: ['Fort Aguada', 'Candolim Beach', 'Calangute Beach', 'Baga Beach', 'Anjuna & Vagator'],
    exclusions: ['Entry fee and parking charges', 'Rates not valid between 6:00 PM – 8:00 AM'],
    suitable: 'Child, Infant, Youth, Senior, Adult',
    pickupIncluded: true,
  },
  {
    id: 'act-2',
    type: 'Transport',
    title: 'One-Way Private Transfers from Goa Airport to Hotel',
    description:
      'Travel comfortably in a private vehicle from either Goa Airports to your hotel in Goa. Pick-up timing is subject to flight/train arrival and shall be communicated by the local vendor. No stop-over allowed during this transfer.',
    duration: '9 Hours',
    timing: 'Morning',
    price: 978,
    imageUrl: null,
    inclusions: ['Private vehicle', 'Airport pickup'],
    exclusions: ['No stop-overs allowed'],
    suitable: 'All',
    pickupIncluded: true,
  },
];

export const FAKE_HOTELS = [
  {
    id: 'hotel-1',
    name: 'Sharanam Greens Resort',
    location: 'Calangute',
    sublocation: '7 minutes walk to Calangute Beach',
    includes: 'Breakfast',
    roomType: 'Deluxe Room With Balcony',
    rating: 3.6,
    maxRating: 5,
    checkIn: 'Sun, 1 Feb 2026',
    checkOut: 'Thu, 5 Feb 2026',
    imageUrl: null,
    isSelected: true,
  },
  {
    id: 'hotel-2',
    name: 'Sharanam Greens Resort',
    location: 'Calangute',
    sublocation: '7 minutes walk to Calangute Beach',
    includes: 'Breakfast',
    roomType: 'Deluxe Room With Balcony',
    rating: 3.6,
    maxRating: 5,
    checkIn: 'Sun, 1 Feb 2026',
    checkOut: 'Thu, 5 Feb 2026',
    imageUrl: null,
    isSelected: false,
  },
  {
    id: 'hotel-3',
    name: 'Sharanam Greens Resort',
    location: 'Calangute',
    sublocation: '7 minutes walk to Calangute Beach',
    includes: 'Breakfast',
    roomType: 'Deluxe Room With Balcony',
    rating: 3.6,
    maxRating: 5,
    checkIn: 'Sun, 1 Feb 2026',
    checkOut: 'Thu, 5 Feb 2026',
    imageUrl: null,
    isSelected: false,
  },
];