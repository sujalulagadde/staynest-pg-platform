import { College, PG, Review, PGReport, FilterState, VerificationStatus } from '../types';
import { INITIAL_COLLEGES, INITIAL_PGS, INITIAL_REVIEWS } from '../data/seedData';

const STORAGE_KEYS = {
  COLLEGES: 'staynest_colleges_v1',
  PGS: 'staynest_pgs_v1',
  REVIEWS: 'staynest_reviews_v1',
  REPORTS: 'staynest_reports_v1'
};

class StorageService {
  constructor() {
    this.init();
  }

  private init() {
    if (!localStorage.getItem(STORAGE_KEYS.COLLEGES)) {
      localStorage.setItem(STORAGE_KEYS.COLLEGES, JSON.stringify(INITIAL_COLLEGES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PGS)) {
      localStorage.setItem(STORAGE_KEYS.PGS, JSON.stringify(INITIAL_PGS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(INITIAL_REVIEWS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.REPORTS)) {
      localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify([]));
    }
  }

  // --- COLLEGES ---
  getColleges(): College[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COLLEGES);
      const colleges: College[] = data ? JSON.parse(data) : INITIAL_COLLEGES;
      const pgs = this.getPGs();

      // Compute total verified PGs per college
      return colleges.map(col => {
        const count = pgs.filter(pg => 
          pg.verifiedStatus === 'verified' && 
          pg.nearbyColleges.some(nc => nc.collegeId === col.id || nc.collegeName.toLowerCase().includes(col.code.toLowerCase()))
        ).length;
        return { ...col, totalPGs: count };
      });
    } catch {
      return INITIAL_COLLEGES;
    }
  }

  getCollegeById(id: string): College | undefined {
    return this.getColleges().find(c => c.id === id);
  }

  saveCollege(college: Omit<College, 'id'> & { id?: string }): College {
    const colleges = this.getColleges();
    if (college.id) {
      const index = colleges.findIndex(c => c.id === college.id);
      if (index !== -1) {
        colleges[index] = { ...colleges[index], ...college };
      }
    } else {
      const newCollege: College = {
        ...college,
        id: 'col-' + Date.now()
      };
      colleges.push(newCollege);
    }
    localStorage.setItem(STORAGE_KEYS.COLLEGES, JSON.stringify(colleges));
    return college as College;
  }

  deleteCollege(id: string) {
    const colleges = this.getColleges().filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.COLLEGES, JSON.stringify(colleges));
  }

  // --- PGS ---
  getPGs(includeAllStatuses = false): PG[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PGS);
      const pgs: PG[] = data ? JSON.parse(data) : INITIAL_PGS;
      if (includeAllStatuses) {
        return pgs;
      }
      // Public standard only sees verified PGs
      return pgs.filter(p => p.verifiedStatus === 'verified');
    } catch {
      return INITIAL_PGS;
    }
  }

  getPGById(id: string): PG | undefined {
    const pgs = this.getPGs(true);
    return pgs.find(p => p.id === id);
  }

  // Filter engine
  filterPGs(filters: FilterState): PG[] {
    let pgs = this.getPGs(false);

    // Search query (PG name, area, city, college)
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase().trim();
      pgs = pgs.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.area.toLowerCase().includes(query) ||
        p.city.toLowerCase().includes(query) ||
        p.nearbyColleges.some(c => c.collegeName.toLowerCase().includes(query))
      );
    }

    // Selected College
    if (filters.selectedCollegeId && filters.selectedCollegeId !== 'all') {
      pgs = pgs.filter(p => 
        p.nearbyColleges.some(c => c.collegeId === filters.selectedCollegeId)
      );

      // Filter by maximum distance if college is selected
      if (filters.maxDistanceKm < 20) {
        pgs = pgs.filter(p => {
          const colInfo = p.nearbyColleges.find(c => c.collegeId === filters.selectedCollegeId);
          return colInfo ? colInfo.distanceKm <= filters.maxDistanceKm : false;
        });
      }
    }

    // City
    if (filters.city && filters.city !== 'all') {
      pgs = pgs.filter(p => p.city.toLowerCase() === filters.city.toLowerCase());
    }

    // Area
    if (filters.area && filters.area !== 'all') {
      pgs = pgs.filter(p => p.area.toLowerCase() === filters.area.toLowerCase());
    }

    // Budget range
    if (filters.minRent > 0) {
      pgs = pgs.filter(p => p.rentPerMonth >= filters.minRent);
    }
    if (filters.maxRent < 30000) {
      pgs = pgs.filter(p => p.rentPerMonth <= filters.maxRent);
    }

    // Gender suitability
    if (filters.genderType && filters.genderType !== 'all') {
      pgs = pgs.filter(p => p.genderType === filters.genderType || p.genderType === 'unisex');
    }

    // Sharing Types
    if (filters.sharingTypes.length > 0) {
      pgs = pgs.filter(p => 
        p.sharingTypes.some(st => filters.sharingTypes.includes(st))
      );
    }

    // Facilities (must match all selected)
    if (filters.facilities.length > 0) {
      pgs = pgs.filter(p => 
        filters.facilities.every(f => p.facilities.includes(f))
      );
    }

    // Min Rating
    if (filters.minRating > 0) {
      pgs = pgs.filter(p => p.rating >= filters.minRating);
    }

    // Availability
    if (filters.availability && filters.availability !== 'all') {
      pgs = pgs.filter(p => p.availabilityStatus === filters.availability);
    }

    // Sorting
    pgs.sort((a, b) => {
      if (filters.sortBy === 'rent_low') {
        return a.rentPerMonth - b.rentPerMonth;
      }
      if (filters.sortBy === 'rent_high') {
        return b.rentPerMonth - a.rentPerMonth;
      }
      if (filters.sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (filters.sortBy === 'reviews') {
        return b.totalReviews - a.totalReviews;
      }
      if (filters.sortBy === 'distance' && filters.selectedCollegeId) {
        const distA = a.nearbyColleges.find(c => c.collegeId === filters.selectedCollegeId)?.distanceKm ?? 999;
        const distB = b.nearbyColleges.find(c => c.collegeId === filters.selectedCollegeId)?.distanceKm ?? 999;
        return distA - distB;
      }
      return 0;
    });

    return pgs;
  }

  // Submit new PG by owner
  submitPG(pgData: Omit<PG, 'id' | 'verifiedStatus' | 'rating' | 'totalReviews' | 'isDemoData' | 'createdAt'>): PG {
    const pgs = this.getPGs(true);
    const newPG: PG = {
      ...pgData,
      id: 'pg-user-' + Date.now(),
      verifiedStatus: 'pending',
      rating: 0,
      totalReviews: 0,
      isDemoData: false,
      createdAt: new Date().toISOString()
    };

    pgs.push(newPG);
    localStorage.setItem(STORAGE_KEYS.PGS, JSON.stringify(pgs));
    return newPG;
  }

  // Update PG verification status by Admin
  updatePGStatus(pgId: string, status: VerificationStatus): PG | undefined {
    const pgs = this.getPGs(true);
    const index = pgs.findIndex(p => p.id === pgId);
    if (index !== -1) {
      pgs[index].verifiedStatus = status;
      localStorage.setItem(STORAGE_KEYS.PGS, JSON.stringify(pgs));
      return pgs[index];
    }
    return undefined;
  }

  // Delete PG
  deletePG(id: string) {
    const pgs = this.getPGs(true).filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PGS, JSON.stringify(pgs));
  }

  // --- REVIEWS ---
  getReviews(pgId?: string): Review[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      const reviews: Review[] = data ? JSON.parse(data) : INITIAL_REVIEWS;
      const approved = reviews.filter(r => r.status === 'approved');
      if (pgId) {
        return approved.filter(r => r.pgId === pgId);
      }
      return approved;
    } catch {
      return INITIAL_REVIEWS;
    }
  }

  addReview(reviewData: Omit<Review, 'id' | 'date' | 'status'>): Review {
    const reviews = this.getAllReviewsRaw();
    const newReview: Review = {
      ...reviewData,
      id: 'rev-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      status: 'approved' // auto approved for demo, can be flagged later
    };

    reviews.push(newReview);
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));

    // Recalculate PG rating & total reviews
    this.recalculatePGRating(reviewData.pgId);

    return newReview;
  }

  private getAllReviewsRaw(): Review[] {
    const data = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    return data ? JSON.parse(data) : INITIAL_REVIEWS;
  }

  private recalculatePGRating(pgId: string) {
    const reviews = this.getReviews(pgId);
    const pgs = this.getPGs(true);
    const index = pgs.findIndex(p => p.id === pgId);
    if (index !== -1) {
      if (reviews.length === 0) {
        pgs[index].rating = 0;
        pgs[index].totalReviews = 0;
      } else {
        const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
        pgs[index].rating = parseFloat((sum / reviews.length).toFixed(1));
        pgs[index].totalReviews = reviews.length;
      }
      localStorage.setItem(STORAGE_KEYS.PGS, JSON.stringify(pgs));
    }
  }

  deleteReview(reviewId: string) {
    const reviews = this.getAllReviewsRaw().filter(r => r.id !== reviewId);
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }

  // --- REPORTS ---
  getReports(): PGReport[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REPORTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  submitReport(report: Omit<PGReport, 'id' | 'date' | 'status'>): PGReport {
    const reports = this.getReports();
    const newReport: PGReport = {
      ...report,
      id: 'rep-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    reports.push(newReport);
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
    return newReport;
  }

  resolveReport(reportId: string) {
    const reports = this.getReports();
    const index = reports.findIndex(r => r.id === reportId);
    if (index !== -1) {
      reports[index].status = 'resolved';
      localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
    }
  }

  // --- STATS FOR ADMIN ---
  getAdminStats() {
    const colleges = this.getColleges();
    const pgs = this.getPGs(true);
    const reviews = this.getAllReviewsRaw();
    const reports = this.getReports();

    return {
      totalColleges: colleges.length,
      totalPGs: pgs.length,
      verifiedPGs: pgs.filter(p => p.verifiedStatus === 'verified').length,
      pendingPGs: pgs.filter(p => p.verifiedStatus === 'pending').length,
      rejectedPGs: pgs.filter(p => p.verifiedStatus === 'rejected').length,
      totalReviews: reviews.length,
      activeReports: reports.filter(r => r.status === 'pending').length
    };
  }
}

export const storageService = new StorageService();
