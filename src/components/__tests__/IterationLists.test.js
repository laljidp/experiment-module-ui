import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import IterationLists from "../IterationLists";

describe("IterationLists Component", () => {
  test("check IterationLists component by props", () => {
    render(
      <IterationLists
        data={[
            { id: "zzz", title: "test_iteration_title", isSelected: false },
            { id: 'wer', title: 'demo_iteration_title', isSelected: false}
        ]}
        onSaveIteration={jest.fn()}
        handleLock={jest.fn()}
        handleReset={jest.fn()}
        handleSelect={jest.fn()}
      />
    );
    expect(screen.getByText(/test_iteration_title/i)).toBeInTheDocument();
    expect(screen.getByText(/EM-2/i)).toBeInTheDocument();
  });

  test("Selection text should exists when iteration is selected", () => {
    render(
      <IterationLists
        data={[{ id: "zzz", title: "test_iteration_title", isSelected: true }]}
        onSaveIteration={jest.fn()}
        handleLock={jest.fn()}
        handleReset={jest.fn()}
        handleSelect={jest.fn()}
      />
    );
    expect(screen.getByText(/Selection/i)).toBeInTheDocument();
  });

  test("Add interation mode effect after click on +ADD INTERATION button", () => {
    render(
      <IterationLists
        data={[{ id: "zzz", title: "test_iteration_title", isSelected: true }]}
        onSaveIteration={jest.fn()}
        handleLock={jest.fn()}
        handleReset={jest.fn()}
        handleSelect={jest.fn()}
      />
    );
    const addIterationBtn = screen.getByText(/ADD ITERATION/i)
    expect(addIterationBtn).toBeInTheDocument()
    fireEvent.click(addIterationBtn)
    expect(screen.getByText(/EM-2/i)).toBeInTheDocument()
    // check for done button availability after click on add iteration btn
    expect(screen.getByText(/DONE/i)).toBeInTheDocument()
  });
});
