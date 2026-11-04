export type CountryCode = 'kz' | 'ru' | 'us';
export type AgeGroup = 'school' | 'student' | 'adult' | 'all';
export type MentorCategory = 'ent' | 'universities_kz' | 'abroad' | 'business_kz' | 'it' | 'career_design';

export interface MentorPackage {
  title: string;
  sessionsCount: number;
  priceKzt: number;
  description: string;
  isPopular?: boolean;
}

export interface MentorReview {
  id: string;
  author: string;
  authorRole: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  result: string;
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  country: CountryCode;
  countryName: string;
  city: string;
  flag: string;
  hourlyRate: number; // in KZT (тенге)
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  category: MentorCategory;
  categoryLabel: string;
  ageGroups: AgeGroup[];
  ageGroupLabels: string[];
  topics: string[];
  bio: string;
  achievements: string[];
  education: string;
  currentRole: string;
  packages: MentorPackage[];
  reviews: MentorReview[];
  isActive: boolean;
  avatarColor: string;
  initials: string;
}

export interface UniversityKZ {
  id: string;
  name: string;
  shortName: string;
  city: string;
  tuitionKztPerYear: number; // in KZT
  minGrantScore: number; // Passing score for state grant
  militaryDepartment: boolean;
  dormitoryAvailable: boolean;
  popularDirections: string[];
  description: string;
  rankingKZ: number;
  badge?: string;
  grantCompetitionNote: string;
}

export interface GopThreshold {
  code: string;
  name: string;
  subjects: string;
  minGrantScoreGeneral: number;
  minGrantScoreRural: number;
  grantsAllocated2025: number;
  competition: 'Высокая' | 'Очень высокая' | 'Средняя' | 'Умеренная';
}

export interface BusinessMetric {
  title: string;
  value: string;
  subtext: string;
  source: string;
  trend?: string;
}

export interface BusinessTaxRegime {
  name: string;
  rate: string;
  limitKzt: string;
  description: string;
  bestFor: string;
  pitfalls: string;
}

export interface BookingRequest {
  id: string;
  mentorId: string;
  mentorName: string;
  clientName: string;
  clientPhone: string;
  clientTelegram?: string;
  clientAgeGroup: string;
  packageTitle: string;
  priceKzt: number;
  scheduledDate: string;
  scheduledTime: string;
  userGoal: string;
  status: 'new' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}
