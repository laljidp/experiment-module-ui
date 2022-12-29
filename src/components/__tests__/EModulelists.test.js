import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import GlobalProvider from "../../context/GlobalState";
import EModulelists from "../EModulelists";

const renderComponentWithContext = (
  component
) => {
  return render(<GlobalProvider>{component}</GlobalProvider>);
};

describe("EModulelists Component", () => {
  test("check render EModulelists component", () => {
    render(<EModulelists />);
    const linkElement = screen.getByText(/Modules/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("+ Add module click should add new module in UI", () => {
    renderComponentWithContext(<EModulelists />);
    const element = screen.getByText(/Add Module/i);
    expect(element).toBeInTheDocument();
    fireEvent.click(element);
    expect(screen.getAllByText(/Experiment Module/i).length).toEqual(2);
  });
});
