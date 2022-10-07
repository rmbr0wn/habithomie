import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Form from "./Form";

const initialErrorsState = { signupEmail: "", signupPassword: "", confirmPassword: "",
                            loginEmail: "", loginPassword: "", response: "" };

// The base props template. Will change Form props as needed, depending on the test.
const props = {
  isSignedUp: true,
  handleSubmit: function(){},
  handleChange: function(){},
  errors: initialErrorsState,
  successMessage: '',
  googleSuccess: function(){},
  googleFailure: function(){},
  switchFormType: function(){},
  signupPasswordRef: {}
}

describe("Sign in form rendering", () => {
  beforeEach(() => {
    render(
      <GoogleOAuthProvider clientId="794956968618-b1o8rcuov3dv6po9a2h5o8q9dejgf980.apps.googleusercontent.com">
        <Form
          isSignedUp={props.isSignedUp}
          handleSubmit={props.handleSubmit}
          handleChange={props.handleChange}
          errors={props.errors}
          successMessage={props.successMessage}
          googleSuccess={props.googleSuccess}
          googleFailure={props.googleFailure}
          switchFormType={props.switchFormType}
          signupPasswordRef={props.signupPasswordRef}
        />
      </GoogleOAuthProvider>);
  });

  test("Sign in header should be rendered correctly", () => {
    const header = screen.getByRole("heading");
    expect(header).toBeInTheDocument();
    const headerText = screen.getByText(/sign in/i);
    expect(headerText).toBeInTheDocument();
  });

  test("E-mail input should be rendered", () => {
    const emailInput = screen.getByPlaceholderText(/e-mail/i);
    expect(emailInput).toBeInTheDocument();
  });

  test("Password input should be rendered", () => {
    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput).toBeInTheDocument();
  });

  test("Login button should be rendered", () => {
    const loginButton = screen.getByRole("button", { name: /log in/i });
    expect(loginButton).toBeInTheDocument();
  });

  test("Create new account button should be rendered", () => {
    const createAccountButton = screen.getByRole("button", { name: /create new account/i });
    expect(createAccountButton).toBeInTheDocument();
  });
});


describe("Sign in form input checking", () => {
  beforeEach(() => {
    render(
      <GoogleOAuthProvider clientId="794956968618-b1o8rcuov3dv6po9a2h5o8q9dejgf980.apps.googleusercontent.com">
        <Form
          isSignedUp={props.isSignedUp}
          handleSubmit={props.handleSubmit}
          handleChange={props.handleChange}
          errors={props.errors}
          successMessage={props.successMessage}
          googleSuccess={props.googleSuccess}
          googleFailure={props.googleFailure}
          switchFormType={props.switchFormType}
          signupPasswordRef={props.signupPasswordRef}
        />
      </GoogleOAuthProvider>);
  });

  test("E-mail input should be empty", () => {
    const emailInput = screen.getByPlaceholderText(/e-mail/i);
    expect(emailInput.value).toBe("");
  });

  test("Password input should be empty", () => {
    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput.value).toBe("");
  });

  test("E-mail input should change", () => {
    const emailInput = screen.getByPlaceholderText(/e-mail/i);
    const changedValue = "test";

    fireEvent.change(emailInput, { target: { value: changedValue } });
    expect(emailInput.value).toBe(changedValue);
  });

  test("Password input should change", () => {
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const changedValue = "test";

    fireEvent.change(passwordInput, { target: { value: changedValue } });
    expect(passwordInput.value).toBe(changedValue);
  });
});


describe("Sign up form rendering", () => {
  beforeEach(() => {
    render(
      <GoogleOAuthProvider clientId="794956968618-b1o8rcuov3dv6po9a2h5o8q9dejgf980.apps.googleusercontent.com">
        <Form
          isSignedUp={false}
          handleSubmit={props.handleSubmit}
          handleChange={props.handleChange}
          errors={props.errors}
          successMessage={props.successMessage}
          googleSuccess={props.googleSuccess}
          googleFailure={props.googleFailure}
          switchFormType={props.switchFormType}
          signupPasswordRef={React.createRef()}
        />
      </GoogleOAuthProvider>);
  });

  test("Sign up header should be rendered correctly", () => {
    const header = screen.getByRole("heading");
    expect(header).toBeInTheDocument();
    const headerText = screen.getByText(/sign up/i);
    expect(headerText).toBeInTheDocument();
  });

  test("New e-mail input should be rendered", () => {
    const emailInput = screen.getByPlaceholderText(/new e-mail/i);
    expect(emailInput).toBeInTheDocument();
  });

  test("New password input should be rendered", () => {
    const passwordInput = screen.getByPlaceholderText(/new password/i);
    expect(passwordInput).toBeInTheDocument();
  });

  test("Confirm password input should be rendered", () => {
    const passwordInput = screen.getByPlaceholderText(/confirm password/i);
    expect(passwordInput).toBeInTheDocument();
  });

  test("Submit button should be rendered", () => {
    const loginButton = screen.getByRole("button", { name: /submit/i });
    expect(loginButton).toBeInTheDocument();
  });

  test("Existing account prompt text should be rendered", () => {
    const createAccountButton = screen.getByText(/already have an account?/i);
    expect(createAccountButton).toBeInTheDocument();
  });

  test("Sign in button should be rendered", () => {
    const createAccountButton = screen.getByRole("button", { name: /sign in/i });
    expect(createAccountButton).toBeInTheDocument();
  });
});


describe("Sign up form input checking", () => {
  beforeEach(() => {
    render(
      <GoogleOAuthProvider clientId="794956968618-b1o8rcuov3dv6po9a2h5o8q9dejgf980.apps.googleusercontent.com">
        <Form
          isSignedUp={false}
          handleSubmit={props.handleSubmit}
          handleChange={props.handleChange}
          errors={props.errors}
          successMessage={props.successMessage}
          googleSuccess={props.googleSuccess}
          googleFailure={props.googleFailure}
          switchFormType={props.switchFormType}
          signupPasswordRef={React.createRef()}
        />
      </GoogleOAuthProvider>);
  });

  test("New e-mail input should be empty", () => {
    const emailInput = screen.getByPlaceholderText(/new e-mail/i);
    expect(emailInput.value).toBe("");
  });

  test("New password input should be empty", () => {
    const passwordInput = screen.getByPlaceholderText(/new password/i);
    expect(passwordInput.value).toBe("");
  });

  test("Confirm password input should be empty", () => {
    const passwordInput = screen.getByPlaceholderText(/confirm password/i);
    expect(passwordInput.value).toBe("");
  });

  test("New e-mail input should change", () => {
    const emailInput = screen.getByPlaceholderText(/new e-mail/i);
    const changedValue = "test";

    fireEvent.change(emailInput, { target: { value: changedValue } });
    expect(emailInput.value).toBe(changedValue);
  });

  test("New password input should change", () => {
    const passwordInput = screen.getByPlaceholderText(/new password/i);
    const changedValue = "test";

    fireEvent.change(passwordInput, { target: { value: changedValue } });
    expect(passwordInput.value).toBe(changedValue);
  });

  test("Confirm password input should change", () => {
    const passwordInput = screen.getByPlaceholderText(/confirm password/i);
    const changedValue = "test";

    fireEvent.change(passwordInput, { target: { value: changedValue } });
    expect(passwordInput.value).toBe(changedValue);
  });
});
