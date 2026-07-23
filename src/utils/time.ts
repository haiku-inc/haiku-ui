const formatSecondsToHHMMSS = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};
interface ConvertedTime {
  hours: number;
  minutes: number;
}

// Convert total minutes into hours and minutes representation
const convertMinutes = (totalMinutes: number): ConvertedTime => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = hours ? totalMinutes % 60 : totalMinutes;

  return { hours, minutes };
};

// Convert total minutes into hours and minutes representation
const convertMinutesToHMstring = (totalMinutes: number): string => {
  const converted = convertMinutes(totalMinutes);

  return `${converted.hours ? `${converted.hours}h ` : ''}${converted.minutes}min`;
};

// Convert minutes to a 2-digit string with leading zero if necessary
const getFormattedMinutes = (minutes: number): string => minutes.toString().padStart(2, '0');

export { convertMinutes, convertMinutesToHMstring, formatSecondsToHHMMSS, getFormattedMinutes };
