import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import GlobalProvider from "../../context/GlobalState";
import EModule from "../EModule";

const renderComponentWithContext = (component) => {
  return render(<GlobalProvider>{component}</GlobalProvider>);
};

describe("EModule Component", () => {
  test("check render EModule component", () => {
    renderComponentWithContext(
      <EModule
        module={{
          id: "xyz",
          title: "Experiment Module",
          isLocked: false,
          iterations: [],
        }}
      />
    );
    const linkElement = screen.getByText(/Experiment Module/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("Iteration element should present after module expand", () => {
    renderComponentWithContext(
      <EModule
        module={{
          id: "xyz",
          title: "Experiment Module",
          isLocked: false,
          iterations: [],
        }}
      />
    );
    const element = screen.getByText(/Experiment Module/i);
    fireEvent.click(element);
    expect(screen.getByText(/EM-1/i)).toBeInTheDocument();
    const interationInput = screen.getByPlaceholderText(/Adding iteration/i);
    expect(interationInput).toBeInTheDocument();
  });

  test("+ ADD ITERATION button should available when iterations length > 0", async () => {
    renderComponentWithContext(
      <EModule
        module={{
          id: "xyz",
          title: "Experiment Module",
          isLocked: false,
          iterations: [{ id: "zzz", title: "test_title", isSelected: false }],
        }}
      />
    );
    const element = screen.getByText(/Experiment Module/i);
    fireEvent.click(element);

    const addIterationBtn = screen.getByText(/ADD ITERATION/i);
    expect(addIterationBtn).toBeInTheDocument();
  });

  test("Should not expand locked module", () => {
    renderComponentWithContext(
      <EModule
        module={{
          id: "xyz",
          title: "Experiment Module",
          isLocked: true,
          iterations: [{ id: "zzz", title: "test_title", isSelected: false }],
        }}
      />
    );
    const element = screen.getByText(/Experiment Module/i);
    fireEvent.click(element);
    expect(screen.queryByText(/test_title/i)).not.toBeInTheDocument();
  });

  test("Check locked module text color", async () => {
    renderComponentWithContext(
      <EModule
        module={{
          id: "xyz",
          title: "Experiment Module",
          isLocked: true,
          iterations: [{ id: "zzz", title: "test_title", isSelected: false }],
        }}
      />
    );
    const element = screen.getByText(/Experiment Module/i);
    expect(element?.classList.contains("text-secondary")).toBe(true);
  });
});
