import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SubmitIndexForm from "./SubmitIndexForm";

function setup() {
  render(<SubmitIndexForm />);
  return userEvent.setup();
}

test("renders form with heading and input field", function () {
  setup();
  expect(screen.getByText("Submit a new index")).toBeInTheDocument();
  expect(screen.getByLabelText("Enter your index:")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Enter a number")).toBeInTheDocument();
  expect(screen.getByDisplayValue("Submit")).toBeInTheDocument();
});

test("input has correct attributes", function () {
  setup();
  const input = screen.getByLabelText("Enter your index:");
  expect(input).toHaveAttribute("type", "number");
  expect(input).toHaveAttribute("name", "inputField");
  expect(input).toHaveAttribute("min", "1");
  expect(input).toHaveAttribute("placeholder", "Enter a number");
});

test("submit button is disabled when input is empty", function () {
  setup();
  const submitButton = screen.getByDisplayValue("Submit");
  expect(submitButton).toBeDisabled();
});

test("submit button is enabled when input has value", async function () {
  const { type } = setup();
  const input = screen.getByLabelText("Enter your index:");
  const submitButton = screen.getByDisplayValue("Submit");

  await type(input, "5");
  expect(submitButton).not.toBeDisabled();
  expect(input).toHaveValue(5);
});
