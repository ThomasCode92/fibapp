import { render, screen } from "@testing-library/react";

import App from "./App";

test("should render the correct heading and description", () => {
  render(<App />);
  const headingEl = screen.getByRole("heading", { name: /fibapp/i });
  const descriptionEl = screen.getByText(/find out the value/i);
  expect(headingEl).toBeInTheDocument();
  expect(descriptionEl).toBeInTheDocument();
});
