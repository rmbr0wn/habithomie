export function minutesToSeconds (minutes) {
  if (minutes > 0) {
    return parseInt(minutes) * 60;
  } else {
    return 0;
  }
}

export function hoursToSeconds (hours) {
  if (hours > 0) {
    return parseInt(hours) * 3600;
  } else {
    return 0;
  }
}

export function convertEntryToSeconds (hours, minutes) {
  return hoursToSeconds(hours) + minutesToSeconds(minutes);
}

export function convertSecondsToMinutes (seconds) {
  return Math.floor((seconds/60)%60);
}

export function convertSecondsToHours (seconds) {
  return Math.floor(seconds/3600);
}

export function convertSecondsToMinutesAndHours (seconds) {
  const minutes = convertSecondsToMinutes(seconds);
  const hours = convertSecondsToHours(seconds);
  return [hours, minutes];
}
