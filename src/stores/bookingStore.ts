import { create } from 'zustand';
import { Location } from './locationStore';
import { AmbulanceType } from '../components/home/AmbulanceCard';

export type BookingStep =
  | 'Pickup'
  | 'Destination'
  | 'Trip Details'
  | 'Searching'
  | 'Driver Assigned'
  | 'Cancelled'
  | 'Waiting'
  | 'Tracking'
  | 'Completed';

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
  trip: object | null;
  selectedAmbulance: AmbulanceType;
  pickupLocation: Location;
  destinationLocation: Location;
  bookingStep: BookingStep;
  isBookingActive: boolean;
  homeData: object | null;
  driverLocation: Location;

  setSelectedAmbulance: (value: AmbulanceType) => void;
  setPickupLocation: (value: Location) => void;
  setDestinationLocation: (value: Location) => void;
  setStep: (step: BookingStep) => void;
  resetBooking: () => void;
  startBooking: () => void;
  setTrip: (trip: object) => void;
  setDriverLocation: (loc: Location) => void;
}

export const useBookingStore = create<BookingState>(set => ({
  trip: null,
  driverLocation: null,
  selectedAmbulance: {
    type: 'NORMAL',
    label: 'Normal Ambulance',
    baseFare: 900,
    perKm: 125,
  },

  homeData: null,
  pickupLocation: {
    latitude: 1234,
    longitude: 12233,
    name: 'Current Location',
  },
  destinationLocation: {
    latitude: 1234,
    longitude: 12233,
    name: 'Add Destination Location',
  },
  bookingStep: 'Pickup',
  isBookingActive: false,
  setTrip: trip => set({ trip }),
  setDriverLocation: loc => set({ driverLocation: loc }),
  setSelectedAmbulance: selectedAmbulance => set({ selectedAmbulance }),
  setPickupLocation: pickupLocation => set({ pickupLocation }),
  setDestinationLocation: destinationLocation => set({ destinationLocation }),
  setStep: (step: BookingStep) =>
    set({
      bookingStep: step,
      isBookingActive: step !== 'Pickup' && step !== 'Completed',
    }),
  resetBooking: () =>
    set({
      selectedAmbulance: {
        type: 'NORMAL',
        label: 'Normal Ambulance',
        baseFare: 900,
        perKm: 125,
      },
      pickupLocation: {
        latitude: 1234,
        longitude: 12233,
        name: 'Current Location',
      },
      destinationLocation: {
        latitude: 1234,
        longitude: 12233,
        name: 'Add Destination Location',
      },
      bookingStep: 'Pickup',
      isBookingActive: false,
    }),
  startBooking: () => set({ bookingStep: 'Pickup', isBookingActive: true }),
}));
