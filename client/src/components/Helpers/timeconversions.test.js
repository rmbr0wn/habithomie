import React from "react";
import '@testing-library/jest-dom';
import * as timeConversion from "./TimeConversions.js";

describe("Minutes to seconds with valid & invalid input", () => {
  test("Should return 3600 (seconds) given 60 (minutes)", () => {
    expect(timeConversion.minutesToSeconds(60)).toBe(3600);
  });

  test("Should return 0 given 0", () => {
    expect(timeConversion.minutesToSeconds(0)).toBe(0);
  });

  test("Should return 0 given invalid input of -5", () => {
    expect(timeConversion.minutesToSeconds(-5)).toBe(0);
  });

  test("Should return 0 given invalid input of #h2-!", () => {
    expect(timeConversion.minutesToSeconds("#h2-!")).toBe(0);
  });
});


describe("Hours to seconds with valid & invalid input", () => {
  test("Should return 7200 (seconds) given 2 (hours)", () => {
    expect(timeConversion.hoursToSeconds(2)).toBe(7200);
  });

  test("Should return 0 given 0", () => {
    expect(timeConversion.hoursToSeconds(0)).toBe(0);
  });

  test("Should return 0 given invalid input of -5", () => {
    expect(timeConversion.hoursToSeconds(-5)).toBe(0);
  });

  test("Should return 0 given invalid input of #h2-!", () => {
    expect(timeConversion.hoursToSeconds("#h2-!")).toBe(0);
  });
});


describe("Entry (hours, minutes) to seconds with valid & invalid input", () => {
  test("Should return 5400 (seconds) given 1 hour & 30 minutes", () => {
    expect(timeConversion.convertEntryToSeconds(1, 30)).toBe(5400);
  });

  test("Should return 7260 (seconds) given 1 hour & 61 minutes", () => {
    expect(timeConversion.convertEntryToSeconds(1, 61)).toBe(7260);
  });

  test("Should return 0 given (0, 0)", () => {
    expect(timeConversion.convertEntryToSeconds(0, 0)).toBe(0);
  });

  test("Should return 0 given invalid input of (-5, -5)", () => {
    expect(timeConversion.convertEntryToSeconds(-5, -5)).toBe(0);
  });

  test("Should return 0 given invalid input of (#inv!, ~@lid)", () => {
    expect(timeConversion.convertEntryToSeconds("#inv!", "~@lid")).toBe(0);
  });
});


describe("Seconds to minutes with valid & invalid input", () => {
  test("Should return 10 (minutes) given 600 (seconds)", () => {
    expect(timeConversion.convertSecondsToMinutes(600)).toBe(10);
  });

  test("Should return 10 (minutes) given 605 (seconds)", () => {
    expect(timeConversion.convertSecondsToMinutes(605)).toBe(10);
  });

  // Seems odd, but it is always used in conjunction with converting to hours
  test("Should return 0 (minutes) given 3600 (seconds)", () => {
    expect(timeConversion.convertSecondsToMinutes(3600)).toBe(0);
  });

  test("Should return 0 given 0", () => {
    expect(timeConversion.convertSecondsToMinutes(0)).toBe(0);
  });

  test("Should return 0 given invalid input of -5", () => {
    expect(timeConversion.convertSecondsToMinutes(-5)).toBe(0);
  });

  test("Should return 0 given invalid input of (#inv!)", () => {
    expect(timeConversion.convertSecondsToMinutes("#inv!")).toBe(0);
  });
});


describe("Seconds to hours with valid & invalid input", () => {
  test("Should return 2 (hours) given 7200 (seconds)", () => {
    expect(timeConversion.convertSecondsToHours(7200)).toBe(2);
  });

  test("Should return 0 (hours) given 1000 (seconds)", () => {
    expect(timeConversion.convertSecondsToHours(1000)).toBe(0);
  });

  test("Should return 0 given 0", () => {
    expect(timeConversion.convertSecondsToHours(0)).toBe(0);
  });

  test("Should return 0 given invalid input of -7200", () => {
    expect(timeConversion.convertSecondsToHours(-7200)).toBe(0);
  });

  test("Should return 0 given invalid input of (#inv!)", () => {
    expect(timeConversion.convertSecondsToHours("#inv!")).toBe(0);
  });
});


describe("Seconds to [hours, minutes] with valid & invalid input", () => {
  test("Should return [2, 0] given 7200 (seconds)", () => {
    expect(timeConversion.convertSecondsToMinutesAndHours(7200)).toStrictEqual([2, 0]);
  });

  test("Should return [2, 0] given 7255 (seconds)", () => {
    expect(timeConversion.convertSecondsToMinutesAndHours(7255)).toStrictEqual([2, 0]);
  });

  test("Should return [0, 0] given 0", () => {
    expect(timeConversion.convertSecondsToMinutesAndHours(0)).toStrictEqual([0, 0]);
  });

  test("Should return [0, 0] given invalid input of -7200", () => {
    expect(timeConversion.convertSecondsToMinutesAndHours(-7200)).toStrictEqual([0, 0]);
  });

  test("Should return [0, 0] given invalid input of (inv@lid)", () => {
    expect(timeConversion.convertSecondsToMinutesAndHours("inv@lid")).toStrictEqual([0, 0]);
  });
});


describe("Seconds to decimal hours with valid & invalid input", () => {
  test("Should return 2 (hours) given 7200 (seconds)", () => {
    expect(timeConversion.convertSecondsToDecimalHours(7200)).toBeCloseTo(2.000, 3);
  });

  test("Should return 1.5 (hours) given 5400 (seconds)", () => {
    expect(timeConversion.convertSecondsToDecimalHours(5400)).toBeCloseTo(1.500, 3);
  });

  test("Should return 0.926 (hours) given 3333 (seconds)", () => {
    expect(timeConversion.convertSecondsToDecimalHours(3333)).toBeCloseTo(0.926, 3);
  });

  test("Should return 0 given 0", () => {
    expect(timeConversion.convertSecondsToDecimalHours(0)).toBe(0);
  });

  test("Should return 0 given invalid input of -3333", () => {
    expect(timeConversion.convertSecondsToDecimalHours(-3333)).toBe(0);
  });

  test("Should return 0 given invalid input of (#inv!)", () => {
    expect(timeConversion.convertSecondsToDecimalHours("#inv!")).toBe(0);
  });
});
