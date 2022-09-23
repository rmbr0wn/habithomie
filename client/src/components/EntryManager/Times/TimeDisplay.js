import React from "react";
import PropTypes from "prop-types";

import { convertSecondsToMinutesAndHours, convertSecondsToMinutes, convertSecondsToHours } from "../../Helpers/TimeConversions.js"
import "./timedisplay.css";

const TimeDisplay = (props) => (
  <div id="time-display-wrapper">
    { props.beingViewed ?
        <div id="time-display-table-container">
          <div>
            <button onClick={props.toggleViewing}> Cancel Viewing </button>
          </div>
          <div id="time-table-times-wrapper">
            <h5> Time </h5>
            {props.times.map((time, index) => (
              <div key={"times-div" + index}>
                {props.editingPayload.beingEdited && props.editingPayload.time_id === time.time_id ?
                    <div id="time-table-time-entry-wrapper">
                      <div id="time-table-time-entry-container">
                        <input
                          type="number"
                          className="edit-entry-time"
                          name="editEntryHour"
                          defaultValue={convertSecondsToHours(time.time_value)}
                          min="0"
                          max="23"
                          key={"hour" + index}
                          onChange={props.handleEditFields} />
                        <p key={"colon" + index}>:</p>
                        <input
                        type="number"
                        className="edit-entry-time"
                        name="editEntryMinute"
                        defaultValue={convertSecondsToMinutes(time.time_value)}
                        min="0"
                        max="59"
                        key={"minute" + index}
                        onChange={props.handleEditFields} />
                      </div>
                      { props.errors.editEntryHour && <h3 className="form-error-message">{props.errors.editEntryHour}</h3> }
                      { props.errors.editEntryMinute && <h3 className="form-error-message">{props.errors.editEntryMinute}</h3> }
                    </div>
                  :
                  <p key={"time" + index} value={time.time_id}>
                    {formatTime(time.time_value)}
                  </p>
                }
              </div>
            ))}
          </div>
          <div id="time-table-names">
            <h5> Activity Type </h5>
            {props.times.map((time, index) => (
              <div key={"activity-div" + index}>
                {props.editingPayload.beingEdited && props.editingPayload.time_id === time.time_id ?
                  <select
                    defaultValue={getActivityName(props.activities, time.activity_id)}
                    name="editActivity"
                    id="create-entry-activity-dropdown"
                    onChange={props.handleEditFields}
                  >
                    {props.activities.map((activity, index) => (
                      <option key={index} value={activity.activity_id}>
                        {activity.activity_name}
                      </option>
                    ))}
                  </select>
                  :
                  <p key={"activity" + index} value={time.time_id}>
                    {getActivityName(props.activities, time.activity_id)}
                  </p>
                }
              </div>
            ))}
          </div>
          <div id="time-table-dates">
            <h5> Date </h5>
            {props.times.map((time, index) => (
              <div key={"dates-div" + index}>
                {props.editingPayload.beingEdited && props.editingPayload.time_id === time.time_id ?
                  <input
                    type="date"
                    defaultValue={formatDate(time.entry_date)}
                    className="edit-entry-input"
                    name="editDate"
                    onChange={props.handleEditFields} />
                  :
                  <p key={"date" + index} value={time.time_id}>
                    {formatDate(time.entry_date)}
                  </p>
                }
              </div>
            ))}
          </div>
          <div id="time-table-buttons-container">
            {props.times.map((time, index) => (
              <div key={"buttons-div" + index}>
                {props.editingPayload.beingEdited && props.editingPayload.time_id === time.time_id ?
                    <div>
                      <button className="time-table-button" onClick={props.submitUpdatedEntry}> Save Changes </button>
                    <button key={"cancelBtn" + index} timeid={time.time_id} className="time-table-button" onClick={props.toggleEditing}> Cancel </button>
                    </div>
                  :
                    <div>
                      <button key={"editBtn" + index} timeid={time.time_id} className="time-table-button" onClick={props.toggleEditing}> Edit </button>
                      <button key={"deleteBtn" + index} timeid={time.time_id} className="time-table-button" onClick={props.deleteEntryHandler}> Delete </button>
                    </div>
                }
              </div>
            ))}
          </div>
        </div>
      :
        <button onClick={props.toggleViewing}> View Time Entries </button>
    }
  </div>
);


function formatTime (seconds) {
  const timeArray = convertSecondsToMinutesAndHours(seconds);
  let hour = timeArray[0] < 10 ? "0" + timeArray[0] : timeArray[0];   // Ensure there are always 2 digits on both sides of the colon
  let minute = timeArray[1] < 10 ? "0" + timeArray[1] : timeArray[1];

  return hour + ":" + minute;
}

function getActivityName (activities, activityId) {
  for (let i = 0; i < activities.length; i++) {
    if (activities[i].activity_id === activityId) {
      return activities[i].activity_name
    }
  }
}


function formatDate (date) {
  return date.slice(0, 10);
}

TimeDisplay.propTypes = {
  times: PropTypes.array,
  activities: PropTypes.array,
  beingViewed: PropTypes.bool,
  toggleViewing: PropTypes.func,
  editingPayload: PropTypes.object,
  toggleEditing: PropTypes.func,
  handleEditFields: PropTypes.func,
  submitUpdatedEntry: PropTypes.func,
  deleteEntryHandler: PropTypes.func,
  errors: PropTypes.object
};

export default TimeDisplay;
