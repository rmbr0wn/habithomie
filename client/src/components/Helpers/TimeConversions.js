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

// Must always be used in conjunction with convertSecondsToHours (else multiples of 60 returns 0)
export function convertSecondsToMinutes (seconds) {
  if (seconds > 0) {
    return Math.floor((seconds/60)%60)
  } else {
    return 0;
  }
}

export function convertSecondsToHours (seconds) {
  if (seconds > 0) {
    return Math.floor(seconds/3600);
  } else {
    return 0;
  }
}

export function convertSecondsToMinutesAndHours (seconds) {
  const minutes = convertSecondsToMinutes(seconds);
  const hours = convertSecondsToHours(seconds);
  return [hours, minutes];
}

export function convertSecondsToDecimalHours (seconds) {
  if (seconds > 0) {
    return parseFloat((seconds/3600).toFixed(3));
  } else {
    return 0;
  }
}
