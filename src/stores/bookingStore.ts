import { create } from 'zustand';
import { Location } from './locationStore';

export type BookingStep =
  | 'Pickup'
  | 'Destination'
  | 'Trip Details'
  | 'Searching'
  | 'Driver Assigned'
  | 'Cancelled'
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
  'Searching',
  'Driver Assigned',
  'Cancelled',
  'Tracking',
  'Completed',
];

interface BookingState {
  selectedAmbulance: AmbulanceType;
  pickupLocation: Location;
  destinationLocation: Location;
  bookingStep: BookingStep;
  isBookingActive: boolean;
  setSelectedAmbulance: (value: AmbulanceType) => void;
  setPickupLocation: (value: Location) => void;
  setDestinationLocation: (value: Location) => void;
  advanceStep: () => void;
  resetBooking: () => void;
  startBooking: () => void;
}

export const useBookingStore = create<BookingState>(set => ({
  selectedAmbulance: 'Normal Ambulance',
  pickupLocation: { latitude: 1234, longitude: 12233, name: 'Abc' },
  destinationLocation: { latitude: 1234, longitude: 12233, name: 'Abc' },
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
