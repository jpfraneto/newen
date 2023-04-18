export const formatTime = time => {
  time = time;
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export function calculateDayIndex(startingTimestamp) {
  if (!startingTimestamp) return 0;
  const currentDate = new Date();
  const startDate = new Date(startingTimestamp);
  const timeDifference = currentDate - startDate;
  return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
}
