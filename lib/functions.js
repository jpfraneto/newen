export const formatTime = time => {
  time = time;
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

// export function calculateDayIndex(startingTimestamp) {
//   if (!startingTimestamp) return 0;
//   const currentDate = new Date();
//   const startDate = new Date(startingTimestamp);
//   const timeDifference = currentDate - startDate;
//   const dayIndex = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
//   // I add 1 so that day 0 doesnt exist.
//   return dayIndex + 1;
// }

export function calculateDayIndex(startingTimestamp, userTimeZone) {
  if (!startingTimestamp) return 0;

  try {
    const currentDate = new Date();
    const startDate = new Date(startingTimestamp);

    // Adjust dates based on user's timezone
    let timeZoneOffset = 0; // Default offset value

    if (userTimeZone) {
      const adjustedDate = new Date().toLocaleString('en-US', {
        timeZone: userTimeZone,
      });
      timeZoneOffset = new Date(adjustedDate).getTimezoneOffset();
    }

    const adjustedStartDate = new Date(
      startDate.getTime() - timeZoneOffset * 60000 + 3 * 60 * 60000 + 33 * 60000
    );
    const adjustedCurrentDate = new Date(
      currentDate.getTime() -
        timeZoneOffset * 60000 +
        3 * 60 * 60000 +
        33 * 60000
    );

    const timeDifference = adjustedCurrentDate - adjustedStartDate;
    const dayIndex = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return dayIndex + 1;
  } catch (error) {
    console.error('Error occurred in calculateDayIndex function:', error);
    return 0; // Return a default value in case of an error
  }
}

export function didUserCompleteWork(user, sadhanaId, thisDayIndex) {
  // Find the specific sadhana from the user's sessions array
  const sadhana = user.sadhanaSessions.filter(
    session => session.sadhanaId === sadhanaId
  );
  // sadhana is an array that contains all the sessions that the user has done of a particular sadhana.
  if (!sadhana) {
    // Sadhana not found, return false
    return false;
  }

  // Identify the active day of that sadhana

  // Find the sadhanaDay corresponding to the current date
  const sadhanaDay = sadhana.filter(x => {
    return x.sessionIndex === thisDayIndex;
  });
  if (sadhanaDay.length > 0) {
    // this means that the user did the work of that sadhana for this day
    return true;
  }

  // The user has not done the work for that day.
  return false;
}

export function formatDate() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat(navigator.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return formatter.format(now);
}

export function hasUserCompletedSadhana(sadhana, userId) {
  const sessionsByUser = sadhana.sadhanaSessions.filter(
    session => session.authorId === userId
  );
  return sessionsByUser.length >= sadhana.targetSessions;
}

export function isSadhanaExpiredForUser(sadhana, userTimeZone) {
  const dayIndex = calculateDayIndex(sadhana.startingTimestamp, userTimeZone);
  return dayIndex > sadhana.targetSessions;
}

export async function sendCompletionEmail(user, sadhana) {
  // Email sending logic using a package like Nodemailer
}
