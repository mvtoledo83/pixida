import React from "react";
import { render, screen } from "@testing-library/react";
import Logo from "./index";

describe("Logo component", () => {
  test("renders logo", () => {
    render(<Logo />);
    const logoElement = screen.getByTestId("artapi-layout-header-logo");
    expect(logoElement).toBeInTheDocument();
  });
});
