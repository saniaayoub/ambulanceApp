import { useEffect, useState } from 'react';

export const useLiveWaitingTimer = (waitingStartedAt: any) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!waitingStartedAt) return;
    const startTime = new Date(waitingStartedAt).getTime();

    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.max(0, Math.floor((now - startTime) / 1000));

      setSeconds(diff);
    };

    updateTimer(); // update immediately
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [waitingStartedAt]);

  return seconds;
};
