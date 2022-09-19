export function minutesToSeconds (minutes) {
  return parseInt(minutes) * 60;
}

export function hoursToSeconds (hours) {
  return parseInt(hours) * 3600;
}

export function convertEntryToSeconds (hours, minutes) {
  return hoursToSeconds(hours) + minutesToSeconds(minutes);
}

// TODO: seconds to minutes & hours
export function convertSecondsToMinutesAndHours (seconds) {
  const minutes = Math.floor((seconds/60)%60);
  const hours = Math.floor(seconds/3600);
  return [hours, minutes];
}
