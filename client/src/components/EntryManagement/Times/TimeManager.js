import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TimeCreator from "./TimeCreator.js";
import TimeEditor from "./TimeEditor.js";
import { getTimeEntries } from "../../../actions/times.js";

const initialErrorState = { editEntryHour: "", editEntryMinute: "", createHour: "", createMinute: "", activityName: "" };

export default function TimeManager (props) {
  const storedUser = useSelector((state) => state.authReducer);
  const storedTimes = useSelector((state) => state.timesReducer);
  const storedActivities = useSelector((state) => state.activitiesReducer);
  const [timeEntryBeingCreated, setTimeEntryBeingCreated] = useState(false);
  const [timeEntriesBeingViewed, setTimeEntriesBeingViewed] = useState(false);
  const [editingPayload, setEditingPayload] = useState({ beingEdited: false, time_id: -1 });
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

  function toggleCreateEntry () {
    clearMessageFields();
    setTimeEntryBeingCreated(!timeEntryBeingCreated);
  }

  function toggleViewing () {
    clearMessageFields();
    setTimeEntriesBeingViewed(!timeEntriesBeingViewed);
  }

  function toggleEntryEditing (e) {
    clearMessageFields();

    setEditingPayload({
      beingEdited: !editingPayload.beingEdited,
      time_id: parseInt(e.target.attributes.timeid.value)
    });
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

  return (
    <div id="time-manager-panel-wrapper">
      <h3> Time Entries </h3>
      <TimeCreator
        errors={errors}
        initialErrorState={initialErrorState}
        userId={storedUser.authData.result.id}
        timeEntryBeingCreated={timeEntryBeingCreated}
        setTimeEntryBeingCreated={setTimeEntryBeingCreated}
        setErrors={setErrors}
        setServerResponse={setServerResponse}
        entryValidation={entryValidation}
        activities={storedActivities.activitiesData}
        toggleCreateEntry={toggleCreateEntry}
      />
      { serverResponse && <h3 className="response-message-header">{serverResponse}</h3> }
      <TimeEditor
        timesData={storedTimes.timesData}
        activitiesData={storedActivities.activitiesData}
        entryValidation={entryValidation}
        setServerResponse={setServerResponse}
        toggleEntryEditing={toggleEntryEditing}
        toggleViewing={toggleViewing}
        errors={errors}
        setErrors={setErrors}
        initialErrorState={initialErrorState}
        userId={storedUser.authData.result.id}
        editingPayload={editingPayload}
        setEditingPayload={setEditingPayload}
        timeEntryBeingCreated={timeEntryBeingCreated}
        timeEntriesBeingViewed={timeEntriesBeingViewed}
      />
    </div>
  );
}
