import { render, screen } from "@testing-library/react";
import App from "./App";

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

it("renders without crashing", () => {
  window.ResizeObserver = ResizeObserver;
  render(<App />);
  const heading = screen.queryByText(/Betty carousel task/i);
  expect(heading).toBeDefined();
});
