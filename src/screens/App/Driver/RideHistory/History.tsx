import React, { useState } from 'react';
import { useDriverTrips } from '../../../../hooks/useDriverTripHistory';
import RideHistoryScreen from '../../Shared/History/RideHistoryScreen';
const RideHistoryDriver = () => {
  const [filter, setFilter] = useState('All');
  const history = useDriverTrips(10, filter);
  console.log(history, 'his');
  return (
    <RideHistoryScreen
      history={history}
      filter={filter}
      setFilter={setFilter}
    />
  );
};

export default RideHistoryDriver;
