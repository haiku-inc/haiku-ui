const timestampToHuman = (timestamp?: string): string => {
  if (!timestamp) return '';
  return new Date(timestamp)
    .toLocaleString('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    .replace(',', '')
    .replace(/\//g, '-');
};

const timestampToHumanDate = (timestamp?: string): string => {
  if (!timestamp) return '';
  return new Date(timestamp).toLocaleString('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const dateDaysBefore = (number = 30) => {
  // Create a new Date object representing the current date and time.
  const currentDateObj = new Date();

  // Calculate the number of milliseconds in the specified number of days.
  // (days * 24 hours/day * 60 minutes/hour * 60 seconds/minute * 1000 milliseconds/second)
  const daysInMs = number * 24 * 60 * 60 * 1000;

  // Create a new Date object for the specified number of days ago by subtracting the milliseconds.
  const daysAgo = new Date(currentDateObj.getTime() - daysInMs);

  // Optional: Format the date into a more readable YYYY-MM-DD string.
  const year = daysAgo.getFullYear();
  const month = daysAgo.getMonth() + 1; // getMonth() is 0-indexed, so add 1
  const day = daysAgo.getDate();

  return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
};

export { dateDaysBefore, timestampToHuman, timestampToHumanDate };
