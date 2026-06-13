import { create } from 'zustand';

export type DriverTripStep =
  | 'idle'
  | 'incoming'
  | 'navigate_to_pickup'
  | 'trip_in_progress'
  | 'trip_completed';

export interface IncomingRequest {
  pickupLocation: string;
  destinationHospital: string;
  distance: string;
  fareEstimate: string;
  patientName: string;
  patientPhone: string;
  timestamp: number;
}

export interface TripData {
  patientName: string;
  patientPhone: string;
  pickupLocation: string;
  destinationHospital: string;
  distance: string;
  fare: string;
  duration: string;
  paymentMethod: string;
  eta: string;
  distanceRemaining: string;
}

interface DriverState {
  isOnline: boolean;
  tripStep: DriverTripStep;
  incomingRequest: IncomingRequest | null;
  currentTrip: TripData | null;
  todayEarnings: number;
  completedTrips: number;
  totalTrips: number;

  toggleOnline: () => void;
  setOnline: (online: boolean) => void;
  setTripStep: (step: DriverTripStep) => void;
  setIncomingRequest: (request: IncomingRequest | null) => void;
  setCurrentTrip: (trip: TripData | null) => void;
  acceptRequest: () => void;
  declineRequest: () => void;
  arriveAtPickup: () => void;
  startTrip: () => void;
  completeTrip: () => void;
  backToDashboard: () => void;
  resetTrip: () => void;
}

export const useDriverStore = create<DriverState>(set => ({
  isOnline: false,
  tripStep: 'idle',
  incomingRequest: null,
  currentTrip: null,
  todayEarnings: 0,
  completedTrips: 0,
  totalTrips: 0,

  toggleOnline: () => set(state => ({ isOnline: !state.isOnline })),
  setOnline: online => set({ isOnline: online }),

  setTripStep: tripStep => set({ tripStep }),

  setIncomingRequest: incomingRequest => set({ incomingRequest }),

  setCurrentTrip: currentTrip => set({ currentTrip }),

  acceptRequest: () =>
    set(state => {
      if (!state.incomingRequest) return {};
      const request = state.incomingRequest;
      return {
        tripStep: 'navigate_to_pickup',
        incomingRequest: null,
        currentTrip: {
          patientName: request.patientName,
          patientPhone: request.patientPhone,
          pickupLocation: request.pickupLocation,
          destinationHospital: request.destinationHospital,
          distance: request.distance,
          fare: request.fareEstimate,
          duration: '15 min',
          paymentMethod: 'Cash',
          eta: '6 min',
          distanceRemaining: request.distance,
        },
      };
    }),

  declineRequest: () =>
    set({
      incomingRequest: null,
      tripStep: 'idle',
    }),

  arriveAtPickup: () => set({ tripStep: 'trip_in_progress' }),

  startTrip: () => set({ tripStep: 'trip_in_progress' }),

  completeTrip: () =>
    set(state => ({
      tripStep: 'trip_completed',
      todayEarnings: state.todayEarnings + 1500,
      completedTrips: state.completedTrips + 1,
      totalTrips: state.totalTrips + 1,
    })),

  backToDashboard: () =>
    set({
      tripStep: 'idle',
      currentTrip: null,
    }),

  resetTrip: () =>
    set({
      tripStep: 'idle',
      incomingRequest: null,
      currentTrip: null,
    }),
}));
