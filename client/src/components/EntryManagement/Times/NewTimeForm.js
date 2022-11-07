import React from "react";
import PropTypes from "prop-types";
import "./newtimeform.css";

const NewTimeForm = (props) => (
  <div id="time-creation-form-wrapper">
    { props.timeEntryBeingCreated ?
      <div id="time-creation-form-container">
        <form onSubmit={props.submitNewTime} id="time-creation-form">
          <div id="creation-form-field-wrapper">
            <div className="creation-form-field-container">
              <label className="creation-field-label"> Hours:
                <input type="number"
                  defaultValue={0}
                  className="create-entry-input"
                  name="createHour"
                  min="0"
                  max="23"
                  onChange={props.handleFormChange} />
                { props.errors.createHour && <h3 className="form-error-message">{props.errors.createHour}</h3> }
              </label>
            </div>
            <div className="creation-form-field-container">
              <label className="creation-field-label"> Minutes:
                <input type="number"
                  defaultValue={0}
                  className="create-entry-input"
                  name="createMinute"
                  min="0"
                  max="59"
                  onChange={props.handleFormChange} />
                { props.errors.createMinute && <h3 className="form-error-message">{props.errors.createMinute}</h3> }
              </label>
            </div>
            <div className="creation-form-field-container">
              <label className="creation-field-label"> Date:
                <input type="date"
                  defaultValue={props.defaultDate}
                  className="create-entry-input"
                  name="createDate"
                  onChange={props.handleFormChange} />
              </label>
            </div>
            <div className="creation-form-field-container">
              <label className="creation-field-label"> Activity:
                <select defaultValue="default" name="activityId" id="create-entry-activity-dropdown" onChange={props.handleFormChange}>
                  <option disabled value="default"> -- Select an option -- </option>
                  {props.activities.map((activity, index) => (
                    <option key={index} value={activity.activity_id}>
                      {activity.activity_name}
                    </option>
                  ))}
                </select>
                { props.errors.activityName && <h3 className="form-error-message">{props.errors.activityName}</h3> }
              </label>
            </div>
            <div id="creation-form-button-container">
              <input type="submit" value="Submit Entry" className="time-form-button"/>
              <button type="button" className="time-form-button" onClick={props.toggleCreateEntry}> Cancel </button>
            </div>
            </div>
          </form>
        </div>
      :
      <div className="time-display-button">
        { !props.timeEntriesBeingViewed &&
          <button className="time-form-button" onClick={props.toggleCreateEntry}> Add New Time Entry </button>
        }
      </div>
    }
  </div>
);

NewTimeForm.propTypes = {
  handleFormChange: PropTypes.func,
  submitNewTime: PropTypes.func,
  activities: PropTypes.array,
  timeEntryBeingCreated: PropTypes.bool,
  toggleCreateEntry: PropTypes.func,
  defaultDate: PropTypes.string,
  errors: PropTypes.object
};

export default NewTimeForm;
