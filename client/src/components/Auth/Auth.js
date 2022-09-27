import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Form from "./Form.js";
import { signIn, signUp, googleAccountHandling } from "../../actions/auth.js";

export default function Auth () {
  const initialState = { signupEmail: "", signupPassword: "", confirmPassword: "",
                          loginEmail: "", loginPassword: "", response: "" };
  const [isSignedUp, setIsSignedUp] = useState(true);
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [successMessage, setSuccessMessage] = useState("");
  const signupPasswordRef = useRef(null);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  function switchFormType () {
    setIsSignedUp(!isSignedUp);
    setFormData(initialState);
    setErrors(initialState);
    setSuccessMessage("");
  }

  function handleChange (e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    signupValidation(e.target.name, e.target.value);

    if (errors.response.length > 0) {
      setErrors({ ...errors, response: "" }); // Reset response error once an input field has been changed
    }
  }

  async function handleSubmit (e) {
    e.preventDefault();
    setSuccessMessage("");

    if (isSignedUp) {
      let loginRequest = await dispatch(signIn(formData, navigate));

      if (loginRequest.response) {
        setErrors({ ...errors, response: loginRequest.response.data.message });
      } else {
        setErrors(initialState);
      }

    } else {
        let signupRequest = await dispatch(signUp(formData, navigate));
        if (signupRequest.response) { // An error has been returned
          setErrors({ ...errors, response: signupRequest.response.data.message });
        } else {
            switchFormType(!isSignedUp);
            setSuccessMessage("Account successfully created.");
        }
    }
  }

  function signupValidation (name, value) {
    switch (name) {
      case "signupEmail":
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value) || value.length === 0) { // Valid or empty email, so clear the error field
          setErrors({ ...errors, signupEmail: "" });
        } else {
            setErrors({ ...errors, signupEmail: "Invalid e-mail address." });
        }
        break;

      case "signupPassword":
        if (value.length > 0 && value.length < 8) {
          setErrors({ ...errors, signupPassword: "The password must be 8 characters or longer." });
        } else {
            setErrors({ ...errors, signupPassword: "" });
        }
        break;

      case "confirmPassword":
        let formPassword = signupPasswordRef.current.value;

        if (formPassword && formPassword !== value) {
          setErrors({ ...errors, confirmPassword: "The two passwords are not equal." });
        } else {
            setErrors({ ...errors, confirmPassword: "" });
        }
        break;

      default:
        break;
    }
  }

  async function googleSuccess (response) {
    let payload = { email: jwt_decode(response.credential).email };

    // Insert or retrieve google user from users DB
    await dispatch(googleAccountHandling(payload, navigate));
  }

  async function googleFailure (error) {
    console.log(error);
  }

  return (
    <div className="auth-form-container-wrapper">
      <Form
        isSignedUp={isSignedUp}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        errors={errors}
        successMessage={successMessage}
        googleSuccess={googleSuccess}
        googleFailure={googleFailure}
        switchFormType={switchFormType}
        signupPasswordRef={signupPasswordRef}
      />
    </div>
  );
}
