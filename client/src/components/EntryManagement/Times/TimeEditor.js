import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TimeEntryDisplay from "./TimeEntryDisplay.js";
import { updateTimeEntry, deleteTimeEntry } from "../../../actions/times.js";
import { convertEntryToSeconds, convertSecondsToMinutesAndHours } from "../../Helpers/TimeConversions.js";

export default function TimeEditor (props) {
  const [updatedEntryPayload, setUpdatedEntryPayload] = useState({});   
  const dispatch = useDispatch();

  function getExistingEntryValue (times, timeId) {
    for (let i = 0; i < times.length; i++) {
      if (times[i].time_id === timeId) {
        return times[i];
      }
    }
  }

  function initializeUpdatePayload (e) {
    let existingEntryValues = getExistingEntryValue(
      props.timesData, parseInt(e.target.attributes.timeid.value));
    let timeValue = convertSecondsToMinutesAndHours(existingEntryValues.time_value);
    let activityId = existingEntryValues.activity_id;
    let date = existingEntryValues.entry_date;

    let formattedExistingEntry = {
      editEntryHour: timeValue[0], editEntryMinute: timeValue[1],
      editActivity: activityId, editDate: date
    };

    setUpdatedEntryPayload(formattedExistingEntry);
  }

  function toggleEntryAndInitialize (e) {
    initializeUpdatePayload(e);
    props.toggleEntryEditing(e);
  }

  function handleEditFields (e) {
    e.persist();

    props.entryValidation(e.target.name, parseInt(e.target.value));
    setUpdatedEntryPayload({ ...updatedEntryPayload, [e.target.name]: e.target.value });
  }

  async function deleteEntryHandler (e) {
    e.preventDefault();

    let deleteRequest = await dispatch(deleteTimeEntry(e.target.attributes.timeid.value));
    if (deleteRequest.message) {
      props.setServerResponse(deleteRequest.message);
    }
  }

  async function submitUpdatedEntry (e) {
    e.preventDefault();

    // Don't submit if an error exists and has not been fixed yet
    for (const error in props.errors) {
      if (props.errors[error] !== "") {
        return;
      }
    }

    let activityId = parseInt(updatedEntryPayload.editActivity);
    let timeValue = convertEntryToSeconds(updatedEntryPayload.editEntryHour, updatedEntryPayload.editEntryMinute);

    let payload = {
      time_id: props.editingPayload.time_id,
      user_id: props.userId,
      activity_id: activityId,
      time_value: timeValue,
      entry_date: updatedEntryPayload.editDate
    }

    let updateRequest = await dispatch(updateTimeEntry(payload));
    if (updateRequest.message) {
      props.setEditingPayload({ ...props.editingPayload, beingEdited: false });
      props.setErrors(props.initialErrorState);
      props.setServerResponse(updateRequest.message);
    }
  }

  return (
    <div id="time-editor-wrapper">
      { !props.timeEntryBeingCreated &&
          <div>
            { props.timeEntriesBeingViewed &&
              <div className="time-display-button">
                <button onClick={props.toggleViewing}> Cancel Viewing </button>
              </div>
            }
            <TimeEntryDisplay
              times={props.timesData}
              activities={props.activitiesData}
              timeEntriesBeingViewed={props.timeEntriesBeingViewed}
              toggleViewing={props.toggleViewing}
              editingPayload={props.editingPayload}
              toggleEntryAndInitialize={toggleEntryAndInitialize}
              handleEditFields={handleEditFields}
              submitUpdatedEntry={submitUpdatedEntry}
              deleteEntryHandler={deleteEntryHandler}
              errors={props.errors} />
          </div>
      }
    </div>
  );
}
