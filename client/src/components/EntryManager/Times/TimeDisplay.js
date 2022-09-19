import React from "react";
import PropTypes from "prop-types";

import { convertSecondsToMinutesAndHours } from "../../Helpers/TimeConversions.js"
// TODO: display a table with the activity_name (passed from parent)
// + time value (from TimeConversions) + date

// TODO: create an edit button, which leads to delete and cancel (+ also makes fields editable, same as activitymanager)

const TimeDisplay = (props) => (
  <div id="time-display-wrapper">
    {props.times.map((time, index) => (
      <p key={index} value={time.time_id}>
        {formatTime(time.time_value)}
        {"Activity name INC"}
        {formatDate(time.entry_date)}
      </p>
    ))}
  </div>
);

function getActivityName (activityId) {
  // TODO: binary search for the activity id in activities that matches the parameter id given here
  // then return the name associated with that id
}

function formatTime (seconds) {
  const timeArray = convertSecondsToMinutesAndHours(seconds);
  let hour = timeArray[0] < 10 ? "0" + timeArray[0] : timeArray[0];   // Ensure there are always 2 digits on both sides of the colon
  let minute = timeArray[1] < 10 ? "0" + timeArray[1] : timeArray[1];

  return hour + ":" + minute;
}

function formatDate (date) {
  return date.slice(0, 10);
}

TimeDisplay.propTypes = {
  times: PropTypes.array,
  activities: PropTypes.array
};

export default TimeDisplay;
