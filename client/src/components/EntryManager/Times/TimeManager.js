import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddTimeForm from "./AddTimeForm.js";
import TimeDisplay from "./TimeDisplay.js";
import { createTimeEntry, getTimeEntries, updateTimeEntry, deleteTimeEntry } from "../../../actions/times.js";
import { convertEntryToSeconds, convertSecondsToMinutesAndHours } from "../../Helpers/TimeConversions.js";

const initialFormState = { createHour: 0, createMinute: 0, createDate: new Date(), activityId: "" };
const initialEditState = {
  editEntryHour: -1, editEntryMinute: -1, editActivity: -1, editDate: (new Date(0,0)).toLocaleDateString() };
const initialErrorState = { editEntryHour: "", editEntryMinute: "", createHour: "", createMinute: "", activityName: "" };

export default function TimeManager (props) {
  const storedUser = useSelector((state) => state.authReducer);
  const storedTimes = useSelector((state) => state.timesReducer);
  const storedActivities = useSelector((state) => state.activitiesReducer);
  const [newTimeForm, setNewTimeForm] = useState(initialFormState);
  const [createFormVisible, setCreateFormVisible] = useState(false);
  const [beingViewed, setBeingViewed] = useState(false);
  const [editingPayload, setEditingPayload] = useState({ beingEdited: false, time_id: -1 });
  const [updatedEntryPayload, setUpdatedEntryPayload] = useState({});
  const [errors, setErrors] = useState(initialErrorState);
  const [serverResponse, setServerResponse] = useState();
  const dispatch = useDispatch();

  // Send db fetch only if activties not already in redux store
  useEffect(() => {
    if (storedUser.authData && !storedTimes.timesData) {
      let userId = storedUser.authData.result.id;
      let fetchTimes = dispatch(getTimeEntries(userId));
    }
  }, []);

  async function submitNewTime (e) {
    e.preventDefault();

    // Don't submit if an error exists and has not been fixed yet
    for (const error in errors) {
      if (errors[error] !== "") {
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
      user_id: storedUser.authData.result.id,
      activity_id: activityId,
      time_value: timeValue,
      entry_date: newTimeForm.createDate
    }

    let createRequest = await dispatch(createTimeEntry(payload));
    if (createRequest.message) {
      setCreateFormVisible(false);
      setErrors(initialErrorState);
      setServerResponse(createRequest.message);
    }
  }

  function handleFormChange (e) {
    e.persist();

    entryValidation(e.target.name, parseInt(e.target.value));
    setNewTimeForm({ ...newTimeForm, [e.target.name]: e.target.value });
  }

  function toggleCreateEntry () {
    clearMessageFields();
    setCreateFormVisible(!createFormVisible);
  }

  function toggleViewing () {
    clearMessageFields();
    setBeingViewed(!beingViewed);
  }

  function toggleEntryEditing (e) {
    initializeUpdatePayload(e);
    clearMessageFields();

    setEditingPayload({
      beingEdited: !editingPayload.beingEdited,
      time_id: parseInt(e.target.attributes.timeid.value)
    });
  }

  function handleEditFields (e) {
    e.persist();

    entryValidation(e.target.name, parseInt(e.target.value));
    setUpdatedEntryPayload({ ...updatedEntryPayload, [e.target.name]: e.target.value });
    // clearMessageFields();
  }

  async function submitUpdatedEntry (e) {
    e.preventDefault();

    // Don't submit if an error exists and has not been fixed yet
    for (const error in errors) {
      if (errors[error] !== "") {
        return;
      }
    }

    let activityId = parseInt(updatedEntryPayload.editActivity);
    let timeValue = convertEntryToSeconds(updatedEntryPayload.editEntryHour, updatedEntryPayload.editEntryMinute);

    let payload = {
      time_id: editingPayload.time_id,
      user_id: storedUser.authData.result.id,
      activity_id: activityId,
      time_value: timeValue,
      entry_date: updatedEntryPayload.editDate
    }

    let updateRequest = await dispatch(updateTimeEntry(payload));
    if (updateRequest.message) {
      setEditingPayload({ ...editingPayload, beingEdited: false });
      setErrors(initialErrorState);
      setServerResponse(updateRequest.message);
    }
  }

  function initializeUpdatePayload (e) {
    let existingEntryValues = getExistingEntryValue(
      storedTimes.timesData, parseInt(e.target.attributes.timeid.value));

    let timeValue = convertSecondsToMinutesAndHours(existingEntryValues.time_value);
    let activityId = existingEntryValues.activity_id;
    let date = existingEntryValues.entry_date;

    let formattedExistingEntry = {
      editEntryHour: timeValue[0], editEntryMinute: timeValue[1],
      editActivity: activityId, editDate: date
    };

    setUpdatedEntryPayload(formattedExistingEntry);
  }

  function getExistingEntryValue (times, timeId) {
    for (let i = 0; i < times.length; i++) {
      if (times[i].time_id === timeId) {
        return times[i];
      }
    }
  }

  function clearMessageFields () {
    setErrors(initialErrorState);
    setServerResponse("");
  }

  function entryValidation (name, value) {
    switch (name) {
      case "createHour":
      case "editEntryHour":
        if (value > 23 || value < 0) {
          setErrors({ ...errors, [name]: "The hour value must be between 0 and 23." });
        } else if (isNaN(value)) {
          setErrors({ ...errors, [name]: "The hour value must be a number." });
        } else {
          setErrors({ ...errors, [name]:"" });
        }
        break;

      case "createMinute":
      case "editEntryMinute":
        if (value < 0 || value > 59) {
          setErrors({ ...errors, [name]: "The minute value must be between 0 and 59." });
        } else if (isNaN(value)) {
          setErrors({ ...errors, [name]: "The minute value must be a number." });
        } else {
          setErrors({ ...errors, [name]: "" });
        }
        break;

      case "activityId":

      default:
        break;
    }
  }

  async function deleteEntryHandler (e) {
    e.preventDefault();

    let deleteRequest = await dispatch(deleteTimeEntry(e.target.attributes.timeid.value));
    if (deleteRequest.message) {
      setServerResponse(deleteRequest.message);
    }
  }

  return (
    <div id="time-manager-panel-wrapper">
      <h3> Time Entries </h3>
      { !beingViewed &&
          <AddTimeForm
            handleFormChange={handleFormChange}
            submitNewTime={submitNewTime}
            activities={storedActivities.activitiesData}
            createFormVisible={createFormVisible}
            toggleCreateEntry={toggleCreateEntry}
            errors={errors} />
      }
      { serverResponse && <h3 className="response-message-header">{serverResponse}</h3> }
      { !createFormVisible &&
          <TimeDisplay
            times={storedTimes.timesData}
            activities={storedActivities.activitiesData}
            beingViewed={beingViewed}
            toggleViewing={toggleViewing}
            editingPayload={editingPayload}
            toggleEditing={toggleEntryEditing}
            handleEditFields={handleEditFields}
            submitUpdatedEntry={submitUpdatedEntry}
            deleteEntryHandler={deleteEntryHandler}
            errors={errors} />
      }
    </div>
  );
}
