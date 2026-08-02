import { create } from 'zustand';
import { Location } from './locationStore';
import { AmbulanceType } from '../components/home/AmbulanceCard';

export interface DriverTrackingInfo {
  distanceMeters: number;
  distanceText: string;
  etaSeconds: number;
  etaText: string;
  estimatedArrival: string;
  calculatedAt: string; // ISO date string
  fromLocation: {
    lat: number;
    lng: number;
  };
}

export interface DriverLocationUpdatePayload {
  lat: number;
  lng: number;
  tracking: DriverTrackingInfo;
}

export type BookingStep =
  | 'PICKUP'
  | 'DROP OFF'
  | 'TRIP'
  | 'SEARCHING'
  | 'ASSIGNED'
  | 'CANCELLED'
  | 'WAITING'
  | 'STARTED'
  | 'COMPLETED';

export const bookingSteps = [
  'pickup',
  'drop off',
  'trip',
  'searching',
  'Assigned',
  'cancelled',
  'waiting',
  'started',
  'completed',
];

interface BookingState {
  trip: object | null;
  selectedAmbulance: AmbulanceType;
  pickupLocation: Location | null;
  destinationLocation: Location | null;
  bookingStep: BookingStep;
  isBookingActive: boolean;
  homeData: object | null;
  driverLocation: DriverLocationUpdatePayload | null;

  setSelectedAmbulance: (value: AmbulanceType) => void;
  setPickupLocation: (value: Location) => void;
  setDestinationLocation: (value: Location) => void;
  setStep: (step: BookingStep) => void;
  resetBooking: () => void;
  startBooking: () => void;
  setTrip: (trip: object) => void;
  setDriverLocation: (loc: DriverLocationUpdatePayload) => void;
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
  pickupLocation: null,
  destinationLocation: null,
  bookingStep: 'PICKUP',
  isBookingActive: false,
  setTrip: trip => set({ trip }),
  setDriverLocation: (loc: DriverLocationUpdatePayload) =>
    set({ driverLocation: loc }),
  setSelectedAmbulance: selectedAmbulance => set({ selectedAmbulance }),
  setPickupLocation: pickupLocation => set({ pickupLocation }),
  setDestinationLocation: destinationLocation => set({ destinationLocation }),
  setStep: (step: BookingStep) =>
    set({
      bookingStep: step,
      isBookingActive: step !== 'PICKUP' && step !== 'COMPLETED',
    }),
  resetBooking: () =>
    set({
      selectedAmbulance: {
        type: 'NORMAL',
        label: 'Normal Ambulance',
        baseFare: 900,
        perKm: 125,
      },
      pickupLocation: null,
      destinationLocation: null,
      // pickupLocation: {
      //   latitude: 1234,
      //   longitude: 12233,
      //   placeName: 'Add Pickup Location',
      //   address: 'Add Pickup Location',
      // },
      // destinationLocation: {
      //   latitude: 1234,
      //   longitude: 12233,
      //   placeName: 'Add Drop Off Location',
      //   address: 'Add Drop Off Location',
      // },
      bookingStep: 'PICKUP',
      isBookingActive: false,
    }),
  startBooking: () => set({ bookingStep: 'PICKUP', isBookingActive: true }),
}));
