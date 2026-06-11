export type RideStatus = 'Completed' | 'Cancelled' | 'Ongoing' | 'Accepted';

export interface Ride {
  _id: string;
  bookingId: string;

  pickupAddress: string;
  destinationAddress: string;

  ambulanceType: string;

  fare: number;
  distance: number;
  duration: number;

  status: RideStatus;

  createdAt: string;

  driver?: {
    name: string;
    phone: string;
    vehicleNumber: string;
  };
}
