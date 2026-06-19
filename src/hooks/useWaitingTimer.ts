import { useEffect, useState } from 'react';

export const useLiveWaitingTimer = (waitingStartedAt: any) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!waitingStartedAt) return;

    const startTime = new Date(waitingStartedAt).getTime();

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.floor((now - startTime) / 1000);

      setSeconds(diff);
    }, 1000);

    return () => clearInterval(interval);
  }, [waitingStartedAt]);

  return seconds;
};
