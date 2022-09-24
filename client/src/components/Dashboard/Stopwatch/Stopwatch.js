import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { createTimeEntry } from "../../../actions/times.js";

export default function Stopwatch () {
  const storedUser = useSelector((state) => state.authReducer);
  const storedActivities = useSelector((state) => state.activitiesReducer);
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [activityType, setActivityType] = useState(null);
  const [serverResponse, setServerResponse] = useState("");
  const [activitiesList, setActivitiesList] = useState(storedActivities.activitiesData);
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
    <div id="stopwatch-container-wrapper">
      <h3> Stopwatch </h3>
      { serverResponse && <h3 className="response-message-header">{serverResponse}</h3> }
      <div id="stopwatch-time-container">
        <span> {("0" + Math.floor(((time / 60) / 60) % 60)).slice(-2)}:</span>
        <span> {("0" + Math.floor((time / 60) % 60)).slice(-2)}:</span>
        <span> {("0" + (time % 60)).slice(-2)}</span>
      </div>
      <div id="stopwatch-button-wrapper">
        { !timerOn && time === 0 &&
            <button onClick={switchTimerState}> Start </button>
        }
        { !timerOn && time > 0 &&
            <div>
              <button onClick={switchTimerState}> Resume </button>
              <button onClick={saveAndSubmit}> Save Time Entry </button>
            </div>
        }
        { timerOn &&
            <button onClick={switchTimerState}> Stop </button>
        }
        { time > 0 &&
            <button onClick={resetTimer}> Reset </button>
        }
      </div>
      <div id="stopwatch-activity-dropdown-container">
        { storedActivities.activitiesData ?
            <select defaultValue="default" name="activityId" id="stopwatch-activity-dropdown" onChange={getSelectedActivity}>
            <option disabled value="default"> -- Select an activity -- </option>
            {storedActivities.activitiesData.map((activity, index) => (
              <option key={index} value={activity.activity_id}>
              {activity.activity_name}
              </option>
            ))}
            </select>
          :
            null
        }
      </div>
    </div>
  );
}
