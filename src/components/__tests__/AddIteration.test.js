import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import AddIteration from "../AddIteration";

describe("AddIteration Component", () => {
  test("check render AddIteration component by props", () => {
    render(
      <AddIteration onSaveIteration={() => {}} onCancel={() => {}} number={1} />
    );
    expect(
      screen.getByPlaceholderText(/Adding iteration/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/generate/i)).toBeInTheDocument();
  });

  test("DONE action click effect", () => {
    const onSaveIteration = jest.fn();
    render(
      <AddIteration
        onSaveIteration={onSaveIteration}
        onCancel={() => {}}
        number={1}
      />
    );
    const doneBtn = screen.getByText(/DONE/i);
    const inputText = screen.getByPlaceholderText(/adding iteration/i);
    expect(doneBtn).toBeInTheDocument();
    fireEvent.click(doneBtn);
    expect(onSaveIteration).toHaveBeenCalledTimes(0); // need to set text first
    fireEvent.change(inputText, { target: { value: "new_iteration_title" } });
    fireEvent.click(doneBtn);
    expect(onSaveIteration).toHaveBeenCalledTimes(1); // need to set text first\
  });

  test("Generate link click effect", () => {
    render(
      <AddIteration onSaveIteration={() => {}} onCancel={() => {}} number={1} />
    );
    const generateLinkElem = screen.getByText(/generate/i);
    expect(generateLinkElem).toBeInTheDocument();
    fireEvent.click(generateLinkElem);
    expect(screen.getByText(/SHORT/i)).toBeInTheDocument();
    expect(screen.getByText(/MEDIUM LENGTH/i)).toBeInTheDocument();
    expect(screen.getByText(/REMOVE/i)).toBeInTheDocument();
  });

  test("Generate title for iteration", () => {
    render(
      <AddIteration onSaveIteration={() => {}} onCancel={() => {}} number={1} />
    );
    const generateLinkElem = screen.getByText(/generate/i);
    fireEvent.click(generateLinkElem);
    fireEvent.click(screen.getByText(/SHORT/i));
    expect(
      screen.getByPlaceholderText(/adding iteration/i).value.length
    ).toBeGreaterThan(0);
    fireEvent.click(screen.getByText(/MEDIUM/i));
    expect(
      screen.getByPlaceholderText(/adding iteration/i).value.length
    ).toBeGreaterThan(5);
    fireEvent.click(screen.getByText(/VERY VERY VERY LONG/i));
    expect(
      screen.getByPlaceholderText(/adding iteration/i).value.length
    ).toBeGreaterThan(15);
  });

  test("REMOVE action click effect on generate title mode", () => {
    render(
      <AddIteration onSaveIteration={() => {}} onCancel={() => {}} number={1} />
    );
    const generateLinkElem = screen.getByText(/generate/i);
    fireEvent.click(generateLinkElem);
    const removeBtn = screen.getByText(/REMOVE/i);
    expect(removeBtn).toBeInTheDocument();
    fireEvent.click(removeBtn);
    expect(
      screen.getByText(/To add a new iteration, start typing/i)
    ).toBeInTheDocument();
  });
});
