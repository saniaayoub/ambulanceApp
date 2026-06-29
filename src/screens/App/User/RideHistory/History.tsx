import React, { useState } from 'react';
import RideHistoryScreen from '../../Shared/History/RideHistoryScreen';
import { useTrips } from '../../../../hooks/useRideHistory';
const RideHistoryDriver = () => {
  const [filter, setFilter] = useState('All');
  const history = useTrips(10, filter);
  return (
    <RideHistoryScreen
      history={history}
      filter={filter}
      setFilter={setFilter}
    />
  );
};

export default RideHistoryDriver;
