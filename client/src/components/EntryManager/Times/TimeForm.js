import React from "react";
import PropTypes from "prop-types";

const TimeForm = (props) => (
  <div id="time-input-wrapper">
    { props.createFormVisible ?
      <form onSubmit={props.submitNewTime} id="time-creation-form">
        <label> Hours:
          <input type="number" className="create-entry-input" name="createHour" min="0" max="23" onChange={props.handleFormChange}/>
        </label>
          <label> Minutes:
        <input type="number" className="create-entry-input" name="createMinute" min="0" max="59" onChange={props.handleFormChange}/>
          </label>
        <label> Date:
          <input type="date" className="create-entry-input" name="createDate" onChange={props.handleFormChange}/>
        </label>
        <label> Activity type:
          <select defaultValue="default" name="activityId" id="create-entry-activity-dropdown" onChange={props.handleFormChange}>
            <option disabled value="default"> -- Select an option -- </option>
            {props.activities.map((activity, index) => (
              <option key={index} value={activity.activity_id}>
                {activity.activity_name}
              </option>
            ))}
          </select>
        </label>
        <input type="submit" value="Submit Entry" className="time-form-button"/>
        <button type="button" className="time-form-button" onClick={props.toggleCreateEntry}> Cancel </button>
      </form>
      :
      <button className="time-form-button" onClick={props.toggleCreateEntry}> Add New Time Entry </button>
    }
  </div>
);

TimeForm.propTypes = {
  handleFormChange: PropTypes.func,
  submitNewTime: PropTypes.func,
  activities: PropTypes.array,
  createFormVisible: PropTypes.bool,
  toggleCreateEntry: PropTypes.func
};

export default TimeForm;
