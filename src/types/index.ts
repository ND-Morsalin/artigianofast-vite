export interface SubscriptionPlan {
  id: number;
  name: string;
  description: string | null;
  monthlyPrice: string | number; // decimal as string or number
  yearlyPrice: string | number; // decimal as string or number
  monthlyDuration: number | null;
  yearlyDuration: number | null;
  isActive: boolean;
  isFree: boolean;
  features: string | null; // JSON string
  createdAt: Date | string;
}

export interface WebPage {
  id: number;
  title: string;
  slug: string;
  content: string;
  type: "desktop" | "mobile";
  status: "draft" | "published" | "archived";
  featuredImage: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  authorId: number;
  isHomepage: boolean;
  sortOrder: number;
}

// Types for JSON fields
export interface TimeRange {
  startTime: string; // Format: "HH:mm"
  endTime: string;   // Format: "HH:mm"
}

export interface WeeklySchedule {
  days: number[]; // 0-6 where 0 is Sunday
}

// Main interface
export interface PromotionalSpot {
  id: number;
  title: string;
  content: string | null;
  redirectUrl: string | null;
  enableRedirect: boolean;
  images: string[] | null; // Array of image/video URLs
  textAnimationType: "fixed" | "scroll";
  imageDisplayType: "single" | "slideshow";
  status: "active" | "inactive";
  timeRanges: TimeRange[] | null; // Array of time ranges
  // Legacy single time fields (for backward compatibility)
  startTime: string | null;
  endTime: string | null;
  // Visibility period
  startDate: Date | null;
  endDate: Date | null;
  dailyFrequency: number;
  weeklySchedule: WeeklySchedule | null;
  visiblePages: string[] | "all"; // Array of page paths or "all"
  position: "top" | "bottom" | "left" | "popup";
  width: number | null; // pixels or percentage
  height: number | null; // pixels or percentage
  displayDuration: number; // seconds (for popups)
  displayInterval: number; // seconds (0 = always visible)
  createdAt: Date;
  updatedAt: Date;
}