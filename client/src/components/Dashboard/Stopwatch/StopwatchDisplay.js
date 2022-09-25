import React from "react";

export default function StopwatchDisplay (props) {
  return (
    <div id="stopwatch-container-wrapper">
      <h3> Stopwatch </h3>
      { props.serverResponse && <h3 className="response-message-header">{props.serverResponse}</h3> }
      <div id="stopwatch-time-container">
        <span> {("0" + Math.floor(((props.time / 60) / 60) % 60)).slice(-2)}:</span>
        <span> {("0" + Math.floor((props.time / 60) % 60)).slice(-2)}:</span>
        <span> {("0" + (props.time % 60)).slice(-2)}</span>
      </div>
      <div id="stopwatch-button-wrapper">
        { !props.timerOn && props.time === 0 &&
            <button onClick={props.switchTimerState}> Start </button>
        }
        { !props.timerOn && props.time > 0 &&
            <div>
              <button onClick={props.switchTimerState}> Resume </button>
              <button onClick={props.saveAndSubmit}> Save Time Entry </button>
            </div>
        }
        { props.timerOn &&
            <button onClick={props.switchTimerState}> Stop </button>
        }
        { props.time > 0 &&
            <button onClick={props.resetTimer}> Reset </button>
        }
      </div>
      <div id="stopwatch-activity-dropdown-container">
        { props.activitiesData ?
            <select defaultValue="default" name="activityId" id="stopwatch-activity-dropdown" onChange={props.getSelectedActivity}>
            <option disabled value="default"> -- Select an activity -- </option>
            {props.activitiesData.map((activity, index) => (
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
