import { useState, useEffect } from 'react';

function SadhanaDayTimer({ sadhana }) {
  console.log('the sadhana is :', sadhana);
  const [timeRemaining, setTimeRemaining] = useState(
    sadhana.targetSessionDuration
  );

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const sadhanaDate = new Date(sadhana.startingTimestamp);
      const dayDuration = 86400000; // 1 day in milliseconds

      const elapsedTime = now - sadhanaDate;
      const elapsedDays = Math.floor(elapsedTime / dayDuration);
      const nextDay = sadhanaDate.getTime() + dayDuration * (elapsedDays + 1);

      return nextDay - now;
    };

    const updateTimeRemaining = () => {
      setTimeRemaining(calculateTimeRemaining());
    };

    updateTimeRemaining();
    const intervalId = setInterval(updateTimeRemaining, 1000);

    return () => clearInterval(intervalId);
  }, [sadhana]);

  const formatTime = time => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className='my-4'>
      <p>Time remaining until next session:</p>
      <p className='font-semibold'>{formatTime(timeRemaining)}</p>
    </div>
  );
}

export default SadhanaDayTimer;
