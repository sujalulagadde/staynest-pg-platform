export type VerificationStatus = 'verified' | 'pending' | 'rejected';

export type GenderType = 'boys' | 'girls' | 'unisex';

export type SharingType = 'single' | 'double' | 'triple' | 'four_sharing';

export type AvailabilityStatus = 'available' | 'almost_full' | 'full';

export interface College {
  id: string;
  name: string;
  code: string;
  city: string;
  state: string;
  area: string;
  image: string;
  lat: number;
  lng: number;
  totalPGs?: number;
}

export interface CollegeDistance {
  collegeId: string;
  collegeName: string;
  distanceKm: number;
  travelTimeMins?: number;
}

export interface PG {
  id: string;
  name: string;
  tagline?: string;
  genderType: GenderType;
  rentPerMonth: number;
  securityDeposit: number;
  extraChargesDescription?: string;
  totalBeds: number;
  availableBeds: number;
  availabilityStatus: AvailabilityStatus;
  sharingTypes: SharingType[];
  address: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  lat: number;
  lng: number;
  nearbyColleges: CollegeDistance[];
  facilities: string[];
  photos: string[];
  ownerName: string;
  ownerPhone: string;
  ownerEmail?: string;
  verifiedStatus: VerificationStatus;
  rating: number;
  totalReviews: number;
  foodAvailable: boolean;
  foodDetails?: string;
  rules: string[];
  nearbyTransit?: string[];
  nearbyAmenities?: string[];
  isDemoData: boolean;
  createdAt: string;
}

export interface Review {
  id: string;
  pgId: string;
  authorName: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
  isVerifiedStudent: boolean;
  collegeName?: string;
  status: 'approved' | 'flagged';
}

export interface PGReport {
  id: string;
  pgId: string;
  pgName: string;
  reporterName?: string;
  reporterEmail?: string;
  reason: string;
  details: string;
  date: string;
  status: 'pending' | 'resolved';
}

export interface FilterState {
  searchQuery: string;
  selectedCollegeId: string;
  city: string;
  area: string;
  maxDistanceKm: number;
  minRent: number;
  maxRent: number;
  genderType: string; // 'all' | 'boys' | 'girls' | 'unisex'
  sharingTypes: string[];
  facilities: string[];
  minRating: number;
  availability: string; // 'all' | 'available' | 'almost_full'
  sortBy: 'rent_low' | 'rent_high' | 'rating' | 'distance' | 'reviews';
}
