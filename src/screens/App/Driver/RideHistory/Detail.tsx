import React from 'react';
import { useDriverTripDetail } from '../../../../hooks/useDriverTripHistory';
import { useAuthStore } from '../../../../stores/authStore';
import RideDetailScreen from '../../Shared/History/RideDetailScreen';
const DriverRideDetail = ({ route }) => {
  const { tripId } = route?.params;
  const detail = useDriverTripDetail(tripId);
  const role = useAuthStore(state => state.role);
  return <RideDetailScreen detail={detail} role={role} />;
};

export default DriverRideDetail;
