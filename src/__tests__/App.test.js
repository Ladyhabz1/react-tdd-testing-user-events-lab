import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("renders form elements", () => {
  render(<App />);
  
  expect(screen.getByText(/Newsletter Signup/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/name-input/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email-input/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
});

test("allows user to type into inputs", async () => {
  render(<App />);
  
  const nameInput = screen.getByLabelText(/name-input/i);
  const emailInput = screen.getByLabelText(/email-input/i);

  await userEvent.type(nameInput, "Habiba");
  await userEvent.type(emailInput, "habiba@example.com");

  expect(nameInput).toHaveValue("Habiba");
  expect(emailInput).toHaveValue("habiba@example.com");
});

test("allows user to check checkboxes", async () => {
  render(<App />);

  const techCheckbox = screen.getByLabelText(/checkbox-Tech/i);
  const scienceCheckbox = screen.getByLabelText(/checkbox-Science/i);

  await userEvent.click(techCheckbox);
  await userEvent.click(scienceCheckbox);

  expect(techCheckbox).toBeChecked();
  expect(scienceCheckbox).toBeChecked();
});

test("submitting the form displays success message", async () => {
  render(<App />);

  const nameInput = screen.getByLabelText(/name-input/i);
  const emailInput = screen.getByLabelText(/email-input/i);
  const button = screen.getByRole("button", { name: /sign up/i });

  await userEvent.type(nameInput, "Habiba");
  await userEvent.type(emailInput, "habiba@example.com");

  await userEvent.click(button);

  expect(screen.getByText(/Thank you, Habiba/i)).toBeInTheDocument();
  expect(screen.getByText(/Your email: habiba@example.com has been registered/i)).toBeInTheDocument();
});
