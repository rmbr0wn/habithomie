import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { renderWithProviders } from "../../Helpers/TestUtils.js";
import { Provider } from "react-redux";
import { store } from "../../../reducers/store";
import ActivityManager from "./ActivityManager";

describe("Conditional rendering of buttons and inputs", () => {
  // Preload a test user
  beforeEach(() => {
    const testUser = { authData:
      { result: { user_id: 2, email: "peppy@p.ca" },
        token: "testToken" }
    };

    renderWithProviders(<ActivityManager />, {
      preloadedState: {
        authReducer: testUser
      }
    })
  });

  test("Checks that buttons render correctly and disappear when switching between create & view/edit", async () => {
    const user = userEvent.setup();

    // Create new activity should be enabled & clickable
    expect(await screen.findByRole('button', { name: /create new activity/i })).toBeEnabled();
    await user.click(screen.getByRole('button', { name: /create new activity/i }));

    // Create new activity button should disappear
    const createButton = screen.queryByText('create new activity');
    expect(createButton).toBeNull();

    // Submit, cancel, & the new activity name input should now be visible in place of create new activity button
    expect(await screen.getByPlaceholderText('New activity name')).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /submit/i })).toBeEnabled();
    expect(await screen.findByRole('button', { name: /cancel/i })).toBeEnabled();

    // Clicking cancel should cause the "submit" & "cancel" buttons to disappear, and "create new activity" to reappear
    const submitButton = screen.queryByText('submit');
    const cancelButton = screen.queryByText('cancel');
    await user.click(screen.getByRole('button', { name: /cancel/i }));
    expect(await screen.findByRole('button', { name: /create new activity/i })).toBeEnabled();
    expect(submitButton).toBeNull();
    expect(cancelButton).toBeNull();

    // Clicking view/edit should cause the cancel to appear & other buttons to disappear
    await user.click(screen.getByRole('button', { name: /view\/edit activities/i }));
    expect(createButton).toBeNull();
    expect(submitButton).toBeNull();
    expect(screen.queryByText('View/edit activities')).toBeNull();
    expect(await screen.findByRole('button', { name: /cancel/i })).toBeEnabled();
  })
})

// TODO: activity CRUD tests
