import { create } from 'zustand';

export type BookingStep =
  | 'Pickup'
  | 'Destination'
  | 'Trip Details'
  | 'Summary'
  | 'Searching'
  | 'Driver Assigned'
  | 'Tracking'
  | 'Completed';

export type AmbulanceType =
  | 'Normal Ambulance'
  | 'Ventilator Ambulance'
  | 'Dead Body Ambulance';

const bookingSteps: BookingStep[] = [
  'Pickup',
  'Destination',
  'Trip Details',
  'Summary',
  'Searching',
  'Driver Assigned',
  'Tracking',
  'Completed',
];

interface BookingState {
  selectedAmbulance: AmbulanceType;
  pickupLocation: string;
  destinationLocation: string;
  bookingStep: BookingStep;
  isBookingActive: boolean;
  setSelectedAmbulance: (value: AmbulanceType) => void;
  setPickupLocation: (value: string) => void;
  setDestinationLocation: (value: string) => void;
  advanceStep: () => void;
  resetBooking: () => void;
  startBooking: () => void;
}

export const useBookingStore = create<BookingState>(set => ({
  selectedAmbulance: 'Normal Ambulance',
  pickupLocation: 'Current location',
  destinationLocation: 'Enter destination',
  bookingStep: 'Pickup',
  isBookingActive: false,
  setSelectedAmbulance: selectedAmbulance => set({ selectedAmbulance }),
  setPickupLocation: pickupLocation => set({ pickupLocation }),
  setDestinationLocation: destinationLocation => set({ destinationLocation }),
  advanceStep: () =>
    set(state => {
      const currentIndex = bookingSteps.indexOf(state.bookingStep);
      const nextIndex = Math.min(currentIndex + 1, bookingSteps.length - 1);
      return {
        bookingStep: bookingSteps[nextIndex],
        isBookingActive:
          bookingSteps[nextIndex] !== 'Completed' &&
          bookingSteps[nextIndex] !== 'Pickup',
      };
    }),
  resetBooking: () =>
    set({
      selectedAmbulance: 'Normal Ambulance',
      pickupLocation: 'Current location',
      destinationLocation: 'Enter destination',
      bookingStep: 'Pickup',
      isBookingActive: false,
    }),
  startBooking: () => set({ bookingStep: 'Pickup', isBookingActive: true }),
}));
