export type RideStatus = 'COMPLETED' | 'CANCELLED' | 'STARTED' | 'WAITING';

export interface Ride {
  _id: string;
  bookingId: string;

  pickupAddress: string;
  destinationAddress: string;

  ambulanceType: string;

  fare: { total: number };
  distance: number;
  duration: number;

  status: RideStatus;

  createdAt: string;
  updatedAt: string;

  driver?: {
    name: string;
    phone: string;
    vehicleNumber: string;
  };
}
