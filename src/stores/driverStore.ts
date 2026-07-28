import { create } from 'zustand';
import { queryClient } from '../../App';
import { getErrorMessage } from '../hooks/useAuth';
import { toggleOnlineStatus } from '../services/driverService';
import { toastError, toastSuccess } from '../services/toast';
import { DriverTrackingInfo } from './bookingStore';
import { useLoaderStore } from './loaderStore';

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
  tripTracking: DriverTrackingInfo | null;
  currentTrip: TripData | null;
  setTripTracking: (value: any) => void;
  setIsOnline: (value: boolean) => void;
  toggleOnline: (driverId: string) => void;
  setTripStep: (step: DriverTripStep) => void;
  setIncomingRequest: (request: IncomingRequest | null) => void;
  setCurrentTrip: (trip: TripData | null) => void;
  resetTrip: () => void;
}

export const useDriverStore = create<DriverState>(set => ({
  isOnline: false,
  tripStep: 'idle',
  incomingRequest: null,
  currentTrip: null,
  tripTracking: null,
  setTripTracking: tripTracking => set({ tripTracking }),
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

  setTripStep: tripStep => set({ tripStep }),
  setIncomingRequest: incomingRequest => set({ incomingRequest }),
  setCurrentTrip: currentTrip => set({ currentTrip }),
  resetTrip: () =>
    set({
      tripStep: 'idle',
      incomingRequest: null,
      currentTrip: null,
    }),
}));
