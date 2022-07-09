import { useEffect, useState } from 'react';

export interface CountdownProps {
  active: boolean;
  duration: number;
  onFinished: () => void;
}

export function Countdown({ duration, active = false, ...props }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!active) {
      return;
    }

    if (timeLeft <= 0) {
      props.onFinished();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, active]);

  return <>{active ? timeLeft : null}</>;
}
