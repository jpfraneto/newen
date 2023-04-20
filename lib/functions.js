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

export function didUserCompleteWork(user, sadhanaId, currentDay) {
  console.log('INSIDE THE DID USER', user, sadhanaId, currentDay);
  // Find the specific sadhana from the user's sessions array
  const sadhana = user.sadhanaSessions.filter(
    session => session.sadhanaId === sadhanaId
  );
  console.log('the sadhana is: ', sadhanaId, sadhana);
  if (!sadhana) {
    // Sadhana not found, return false
    console.log('sadhana not found');
    return false;
  }

  // Identify the active day of that sadhana

  // Find the sadhanaDay corresponding to the current date
  const sadhanaDay = sadhana.filter(x => {
    return x.sessionIndex === currentDay;
  });
  if (sadhanaDay.length > 0) {
    // Sadhana day not found, return false
    return true;
  }

  // Check if the user did the work for that day
  return false;
}
