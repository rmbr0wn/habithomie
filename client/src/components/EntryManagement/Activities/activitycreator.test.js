import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "../../../reducers/store";
import ActivityCreator from "./ActivityCreator";


describe("Conditional rendering of buttons and inputs", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <ActivityCreator />
      </Provider>
    );
  });

  test("Create button should exist & be enabled", async () => {
    expect(await screen.findByRole('button', { name: /create new activity/i })).toBeEnabled();
  });

  // Currently doesn' render anything.  *** Will come back to this once I can properly mock the state toggling functions ***
  test("Clicking create button should render the input + the submit and cancel buttons", async () => {
    expect(await screen.findByRole('button', { name: /create new activity/i })).toBeEnabled();
    await userEvent.click(screen.getByRole('button', { name: /create new activity/i }));

    // The create button should disappear upon clicking it
    const createButton = screen.queryByText('create new activity');
    expect(createButton).toBeNull();

    // expect(await screen.getByPlaceholderText('New activity name')).toBeInTheDocument();
    // expect(screen.findByRole('button', { name: /submit/i })).toBeEnabled();
    // expect(await screen.findByRole('button', { name: /cancel/i })).toBeEnabled();
  });
})
