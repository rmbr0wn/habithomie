import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTimeEntry } from "../../../actions/times.js";
import StopwatchDisplay from "./StopwatchDisplay.js";

export default function Stopwatch () {
  const storedUser = useSelector((state) => state.authReducer);
  const storedActivities = useSelector((state) => state.activitiesReducer);
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [activityType, setActivityType] = useState(null);
  const [serverResponse, setServerResponse] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000)
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  function switchTimerState () {
    setServerResponse("");
    setTimerOn(!timerOn);
  }

  function resetTimer () {
    setTime(0);
  }

  async function saveAndSubmit () {
    let payload = {
      user_id: storedUser.authData.result.id,
      activity_id: activityType,
      time_value: time,
      entry_date: (new Date()).toLocaleDateString()
    }

    let saveTime = await dispatch(createTimeEntry(payload));

    if (saveTime.message) {
      setServerResponse(saveTime.message);
    }
    resetTimer();
  }

  function getSelectedActivity (e) {
    e.persist();

    setActivityType(e.target.value);
  }

  return (
    <StopwatchDisplay
      serverResponse={serverResponse}
      timerOn={timerOn}
      time={time}
      switchTimerState={switchTimerState}
      saveAndSubmit={saveAndSubmit}
      resetTimer={resetTimer}
      activitiesData={storedActivities.activitiesData}
      getSelectedActivity={getSelectedActivity}
    />
  );
}
