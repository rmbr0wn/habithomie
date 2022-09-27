import React from "react";
import PropTypes from "prop-types";
import "./activityeditinput.css";

const ActivityEditInput = (props) => (
  <div id="activity-input-wrapper">
    { props.editingPayload.id === props.id && props.editingPayload.beingEdited === true ?
      <div id="activity-input-editing-container">
        <form onSubmit={props.submitNameChange} id="activity-input-form" activityid={props.id}>
          <div id="activity-input-container">
            <input type="text" id="edit-activity-name" name="activityEditInput" defaultValue={props.name} onChange={props.handleNameChange}/>
            <div id="activity-input-button-container">
              <input type="submit" value="Save changes" className="activity-form-button"/>
              <button type="button" className="activity-form-button" activityid={props.id} onClick={props.deleteActivityHandler}> Delete </button>
              <button type="button" className="activity-form-button" activityid={props.id} onClick={props.toggleEditing}> Cancel </button>
            </div>
          </div>
        </form>
        { props.error && <h3 className="form-error-message">{props.error}</h3> }
      </div>
      :
      <div id="activity-display-wrapper">
        <div id="activity-name-container">
          <p className="activity-name"> {props.name} </p>
        </div>
        <div id="activity-button-container">
          <button type="button" className="activity-form-button" activityid={props.id} onClick={props.toggleEditing}> Edit </button>
        </div>
      </div>
    }
  </div>
);

ActivityEditInput.propTypes = {
  handleNameChange: PropTypes.func,
  submitNameChange: PropTypes.func,
  deleteActivityHandler: PropTypes.func,
  editingPayload: PropTypes.object,
  toggleEditing: PropTypes.func,
  name: PropTypes.string,
  id: PropTypes.number,
  error: PropTypes.string
};

export default ActivityEditInput;
