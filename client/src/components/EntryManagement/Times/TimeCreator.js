import React, { useState } from "react";
import { useDispatch } from "react-redux";
import NewTimeForm from "./NewTimeForm.js";
import { createTimeEntry } from "../../../actions/times.js";
import { convertEntryToSeconds } from "../../Helpers/TimeConversions.js";
import "./timecreator.css";

const initialFormState = { createHour: 0, createMinute: 0, createDate: new Date(), activityId: "" };

export default function TimeCreator (props) {
  const [newTimeForm, setNewTimeForm] = useState(initialFormState);
  const dispatch = useDispatch();

  async function submitNewTime (e) {
    e.preventDefault();

    // Don't submit if an error exists and has not been fixed yet
    for (const error in props.errors) {
      if (props.errors[error] !== "") {
        return;
      }
    }

    let timeValue = convertEntryToSeconds(newTimeForm.createHour, newTimeForm.createMinute);
    let activityId = parseInt(newTimeForm.activityId);

    // If they did not select an activity type, it will default to the first in the list
    if (!activityId) {
      activityId = null;
    }

    let payload = {
      user_id: props.userId,
      activity_id: activityId,
      time_value: timeValue,
      entry_date: newTimeForm.createDate
    }

    let createRequest = await dispatch(createTimeEntry(payload));
    if (createRequest.message) {
      props.setTimeEntryBeingCreated(false);
      props.setErrors(props.initialErrorState);
      props.setServerResponse(createRequest.message);
    }
  }

  function handleFormChange (e) {
    e.persist();

    props.entryValidation(e.target.name, parseInt(e.target.value));
    setNewTimeForm({ ...newTimeForm, [e.target.name]: e.target.value });
  }

  return (
    <div id="time-creator-wrapper">
      { !props.timeEntriesBeingViewed &&
          <NewTimeForm
            handleFormChange={handleFormChange}
            submitNewTime={submitNewTime}
            activities={props.activities}
            timeEntriesBeingViewed={props.timeEntriesBeingViewed}
            timeEntryBeingCreated={props.timeEntryBeingCreated}
            toggleCreateEntry={props.toggleCreateEntry}
            errors={props.errors} />
      }
    </div>
  );
}
