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
  | 'DESTINATION'
  | 'TRIP'
  | 'SEARCHING'
  | 'ASSIGNED'
  | 'CANCELLED'
  | 'WAITING'
  | 'STARTED'
  | 'COMPLETED';

export const bookingSteps = [
  'pickup',
  'destination',
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
  pickupLocation: Location;
  destinationLocation: Location;
  bookingStep: BookingStep;
  isBookingActive: boolean;
  homeData: object | null;
  driverLocation: DriverLocationUpdatePayload;

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
    placeName: 'Current Location',
  },
  destinationLocation: {
    latitude: 1234,
    longitude: 12233,
    placeName: 'Add Destination Location',
  },
  bookingStep: 'PICKUP',
  isBookingActive: false,
  setTrip: trip => set({ trip }),
  setDriverLocation: loc => set({ driverLocation: loc }),
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
      pickupLocation: {
        latitude: 1234,
        longitude: 12233,
        placeName: 'Current Location',
        address: 'Current Location',
      },
      destinationLocation: {
        latitude: 1234,
        longitude: 12233,
        placeName: 'Add Destination Location',
        address: 'Current Location',
      },
      bookingStep: 'PICKUP',
      isBookingActive: false,
    }),
  startBooking: () => set({ bookingStep: 'PICKUP', isBookingActive: true }),
}));
