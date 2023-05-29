import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Search from "./index";

describe("Search component", () => {
  test("renders input and button", () => {
    render(<Search />);
    expect(
      screen.getByPlaceholderText("Please type in your search")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  test("displays error message when search is empty", () => {
    render(<Search />);
    fireEvent.click(screen.getByRole("button", { name: "Search" }));
    expect(screen.getByText("Please type something")).toBeInTheDocument();
  });

  test("calls search service when search is not empty", async () => {
    render(<Search />);
    const fetchMock = jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({ count: 10 }),
    });

    const searchInput = screen.getByPlaceholderText(
      "Please type in your search"
    );
    const searchButton = screen.getByRole("button", { name: "Search" });

    fireEvent.change(searchInput, { target: { value: "art" } });
    fireEvent.click(searchButton);

    expect(fetchMock).toHaveBeenCalledWith(
      "https://www.rijksmuseum.nl/api/en/collection?key=2esrTh6M&search?q=art"
    );

    await waitFor(() => {
      expect(screen.getByText("Search")).toBeInTheDocument();
      expect(screen.queryByText("Please type something")).toBeNull();
    });

    fetchMock.mockRestore();
  });
});
