import { create } from 'zustand';
import { toggleOnlineStatus } from '../services/driverService';
import { useLoaderStore } from './loaderStore';
import { toastError, toastSuccess } from '../services/toast';
import { getErrorMessage } from '../hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';
import { queryClient } from '../../App';

export type DriverTripStep =
  | 'idle'
  | 'INCOMING'
  | 'ASSIGNED'
  | 'WAITING'
  | 'CANCEL'
  | 'STARTED'
  | 'COMPLETED';

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
  pickupLocation: any;
  destination: any;
  distance: string;
  fare: string;
  duration: string;
  paymentMethod: string;
  eta: string;
  distanceRemaining: string;
  waitingStartedAt: string;
}

interface DriverState {
  isOnline: boolean;
  tripStep: DriverTripStep;
  incomingRequest: IncomingRequest | null;
  currentTrip: TripData | null;
  todayEarnings: number;
  completedTrips: number;
  totalTrips: number;
  setIsOnline: (value: boolean) => void;
  toggleOnline: (driverId: string) => void;
  setOnline: (online: boolean) => void;
  setTripStep: (step: DriverTripStep) => void;
  setIncomingRequest: (request: IncomingRequest | null) => void;
  setCurrentTrip: (trip: TripData | null) => void;
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
  setIsOnline: value => set({ isOnline: value }),

  toggleOnline: async () => {
    try {
      set(state => ({ isOnline: !state.isOnline }));

      useLoaderStore.getState().showLoader();
      const res = await toggleOnlineStatus();

      if (!res.success) {
        set(state => ({ isOnline: !state.isOnline }));
        toastError(getErrorMessage(res.error));
        return;
      }

      toastSuccess(res?.message);
      queryClient.invalidateQueries({ queryKey: ['driver-data'] });
    } catch (error) {
      console.log(error, 'toggle error');
    } finally {
      useLoaderStore.getState().hideLoader();
    }
  },
  setOnline: online => set({ isOnline: online }),

  setTripStep: tripStep => set({ tripStep }),

  setIncomingRequest: incomingRequest => set({ incomingRequest }),

  setCurrentTrip: currentTrip => set({ currentTrip }),
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
