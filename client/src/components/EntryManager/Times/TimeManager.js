import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TimeForm from "./TimeForm.js";
import TimeDisplay from "./TimeDisplay.js";
import { createTimeEntry, getTimeEntries } from "../../../actions/times.js";
import { convertEntryToSeconds } from "../../Helpers/TimeConversions.js";

const initialFormState = { createHour: 0, createMinute: 0, createDate: new Date(), activityId: "" };

export default function TimeManager (props) {
  const storedUser = useSelector((state) => state.authReducer);
  const storedTimes = useSelector((state) => state.timesReducer);
  const storedActivities = useSelector((state) => state.activitiesReducer);
  const [newTimeForm, setNewTimeForm] = useState(initialFormState);
  const [createFormVisible, setCreateFormVisible] = useState(false);
  const [error, setError] = useState();
  const [successMessage, setSuccessMessage] = useState();
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

    let timeValue = convertEntryToSeconds(newTimeForm.createHour, newTimeForm.createMinute);
    let activityId = parseInt(newTimeForm.activityId);

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
  }

  function handleFormChange (e) {
    e.persist();

    setNewTimeForm({ ...newTimeForm, [e.target.name]: e.target.value });
  }

  function toggleCreateEntry () {
    setCreateFormVisible(!createFormVisible);
  }

  return (
    <div id="time-manager-panel-wrapper">
      <h3> Time Entries </h3>
      <TimeForm
      handleFormChange={handleFormChange}
      submitNewTime={submitNewTime}
      activities={storedActivities.activitiesData}
      createFormVisible={createFormVisible}
      toggleCreateEntry={toggleCreateEntry}
      />
      <TimeDisplay
        times={storedTimes.timesData}
        activities={storedActivities.activitiesData}
      />
    </div>
  );
}
