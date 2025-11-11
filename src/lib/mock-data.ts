// Mock data for Plushify UI

// TypeScript Interfaces

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  credits: number;
  memberSince: string;
  totalGenerations: number;
  totalCreditsPurchased: number;
  totalCreditsUsed: number;
}

export interface PlushieGeneration {
  id: string;
  userId: string;
  originalImage: string;
  plushieImage: string;
  subjectType: "person" | "pet" | "other";
  createdAt: string;
  status: "completed" | "processing" | "failed";
}

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  credits: number;
  features: string[];
  isPopular: boolean;
  pricePerCredit: number;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  quote: string;
  rating: number;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Statistic {
  label: string;
  value: string | number;
  icon: string;
  trend?: "up" | "down" | "neutral";
}

// Mock User Data
export const mockUser: User = {
  id: "user_123456",
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  avatar: "/avatars/user-1.jpg",
  credits: 47,
  memberSince: "2024-08-15",
  totalGenerations: 156,
  totalCreditsPurchased: 500,
  totalCreditsUsed: 453,
};

// Mock Plushie Generation Data (12 items)
export const mockGenerations: PlushieGeneration[] = [
  {
    id: "gen_001",
    userId: "user_123456",
    originalImage: "/examples/original-1.jpg",
    plushieImage: "/examples/plushie-1.jpg",
    subjectType: "pet",
    createdAt: "2025-11-10T14:30:00Z",
    status: "completed",
  },
  {
    id: "gen_002",
    userId: "user_123456",
    originalImage: "/examples/original-2.jpg",
    plushieImage: "/examples/plushie-2.jpg",
    subjectType: "person",
    createdAt: "2025-11-09T10:15:00Z",
    status: "completed",
  },
  {
    id: "gen_003",
    userId: "user_123456",
    originalImage: "/examples/original-3.jpg",
    plushieImage: "/examples/plushie-3.jpg",
    subjectType: "pet",
    createdAt: "2025-11-08T16:45:00Z",
    status: "completed",
  },
  {
    id: "gen_004",
    userId: "user_123456",
    originalImage: "/examples/original-4.jpg",
    plushieImage: "/examples/plushie-4.jpg",
    subjectType: "person",
    createdAt: "2025-11-07T09:20:00Z",
    status: "completed",
  },
  {
    id: "gen_005",
    userId: "user_123456",
    originalImage: "/examples/original-5.jpg",
    plushieImage: "/examples/plushie-5.jpg",
    subjectType: "other",
    createdAt: "2025-11-06T11:30:00Z",
    status: "completed",
  },
  {
    id: "gen_006",
    userId: "user_123456",
    originalImage: "/examples/original-6.jpg",
    plushieImage: "/examples/plushie-6.jpg",
    subjectType: "pet",
    createdAt: "2025-11-05T13:10:00Z",
    status: "completed",
  },
  {
    id: "gen_007",
    userId: "user_123456",
    originalImage: "/examples/original-7.jpg",
    plushieImage: "/examples/plushie-7.jpg",
    subjectType: "person",
    createdAt: "2025-11-04T15:50:00Z",
    status: "completed",
  },
  {
    id: "gen_008",
    userId: "user_123456",
    originalImage: "/examples/original-8.jpg",
    plushieImage: "/examples/plushie-8.jpg",
    subjectType: "pet",
    createdAt: "2025-11-03T08:40:00Z",
    status: "completed",
  },
  {
    id: "gen_009",
    userId: "user_123456",
    originalImage: "/examples/original-9.jpg",
    plushieImage: "/examples/plushie-9.jpg",
    subjectType: "other",
    createdAt: "2025-11-02T12:25:00Z",
    status: "completed",
  },
  {
    id: "gen_010",
    userId: "user_123456",
    originalImage: "/examples/original-10.jpg",
    plushieImage: "/examples/plushie-10.jpg",
    subjectType: "person",
    createdAt: "2025-11-01T14:00:00Z",
    status: "completed",
  },
  {
    id: "gen_011",
    userId: "user_123456",
    originalImage: "/examples/original-11.jpg",
    plushieImage: "/examples/plushie-11.jpg",
    subjectType: "pet",
    createdAt: "2025-10-31T10:30:00Z",
    status: "completed",
  },
  {
    id: "gen_012",
    userId: "user_123456",
    originalImage: "/examples/original-12.jpg",
    plushieImage: "/examples/plushie-12.jpg",
    subjectType: "person",
    createdAt: "2025-10-30T16:15:00Z",
    status: "completed",
  },
];

// Mock Pricing Data
export const mockPricingTiers: PricingTier[] = [
  {
    id: "tier_basic",
    name: "Basic",
    price: 9,
    credits: 30,
    features: [
      "30 plushie generations",
      "High-quality output",
      "Download in PNG format",
      "Email support",
      "Credits never expire",
    ],
    isPopular: false,
    pricePerCredit: 0.3,
  },
  {
    id: "tier_pro",
    name: "Pro",
    price: 19,
    credits: 100,
    features: [
      "100 plushie generations",
      "High-quality output",
      "Download in PNG format",
      "Priority email support",
      "Credits never expire",
      "Early access to new features",
    ],
    isPopular: true,
    pricePerCredit: 0.19,
  },
  {
    id: "tier_elite",
    name: "Elite",
    price: 29,
    credits: 200,
    features: [
      "200 plushie generations",
      "Highest quality output",
      "Download in PNG & SVG",
      "Priority support 24/7",
      "Credits never expire",
      "Early access to new features",
      "Commercial usage rights",
    ],
    isPopular: false,
    pricePerCredit: 0.145,
  },
];

// Mock Testimonials
export const mockTestimonials: Testimonial[] = [
  {
    id: "testimonial_001",
    name: "Sarah Mitchell",
    avatar: "/avatars/testimonial-1.jpg",
    quote:
      "I turned my cat into the cutest plushie ever! The AI did an amazing job capturing her personality. My kids love it!",
    rating: 5,
  },
  {
    id: "testimonial_002",
    name: "Michael Chen",
    avatar: "/avatars/testimonial-2.jpg",
    quote:
      "As a designer, I'm impressed by the quality and attention to detail. Perfect for creating unique gift ideas for clients.",
    rating: 5,
  },
  {
    id: "testimonial_003",
    name: "Emma Thompson",
    avatar: "/avatars/testimonial-3.jpg",
    quote:
      "I created plushies of my whole family! The process was super easy and the results exceeded my expectations. Highly recommend!",
    rating: 5,
  },
  {
    id: "testimonial_004",
    name: "David Rodriguez",
    avatar: "/avatars/testimonial-4.jpg",
    quote:
      "This is genius! I made a plushie version of myself as a birthday gift. Everyone at the party loved it. Worth every credit!",
    rating: 5,
  },
];

// Mock Features for Landing Page
export const mockFeatures: Feature[] = [
  {
    id: "feature_ai",
    title: "AI-Powered Magic",
    description:
      "Advanced AI technology transforms any photo into an adorable plushie design with incredible accuracy.",
    icon: "Sparkles",
  },
  {
    id: "feature_fast",
    title: "Lightning Fast",
    description:
      "Get your plushie design in seconds, not hours. Our optimized AI processes images instantly.",
    icon: "Zap",
  },
  {
    id: "feature_quality",
    title: "High Quality Output",
    description:
      "Professional-grade results every time. Perfect for printing, sharing, or cherishing forever.",
    icon: "Award",
  },
  {
    id: "feature_easy",
    title: "Super Easy to Use",
    description:
      "Just upload a photo and let the magic happen. No technical skills required. Anyone can do it!",
    icon: "Smile",
  },
  {
    id: "feature_affordable",
    title: "Affordable Pricing",
    description:
      "Credit-based system means you only pay for what you use. No subscriptions, no commitments.",
    icon: "DollarSign",
  },
  {
    id: "feature_fun",
    title: "Endless Fun",
    description:
      "Create plushies of family, friends, pets, or anything else. Perfect for gifts, decorations, and memories.",
    icon: "Heart",
  },
];

// Mock Dashboard Statistics
export const mockDashboardStats: Statistic[] = [
  {
    label: "Total Generations",
    value: 156,
    icon: "Image",
    trend: "up",
  },
  {
    label: "Credits Used This Month",
    value: 23,
    icon: "TrendingUp",
  },
  {
    label: "Member Since",
    value: "Aug 2024",
    icon: "Calendar",
  },
];

// Helper function to get recent generations
export function getRecentGenerations(count: number = 4): PlushieGeneration[] {
  return mockGenerations.slice(0, count);
}

// Helper function to get generation by ID
export function getGenerationById(id: string): PlushieGeneration | undefined {
  return mockGenerations.find((gen) => gen.id === id);
}

// Helper function to format date
export function formatGenerationDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Helper function to calculate credits remaining percentage
export function getCreditsPercentage(user: User): number {
  const maxCredits = 200; // Based on largest tier
  return Math.min((user.credits / maxCredits) * 100, 100);
}
