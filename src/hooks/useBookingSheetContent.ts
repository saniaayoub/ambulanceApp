// Utility file for future step-specific sheet content routing

import { BookingStep } from '../stores/bookingStore';

// Currently routing is handled directly in BookingScreen component
export const bookingSteps: BookingStep[] = [
  'Pickup',
  'Destination',
  'Trip Details',
  'Summary',
  'Searching',
  'Driver Assigned',
  'Tracking',
  'Completed',
];
