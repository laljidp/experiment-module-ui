import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ActionButtons from "../ActionButtons";

describe("ActionButtons Component", () => {
  test("check render ActionButtons component by props", () => {
    render(
      <ActionButtons
        data={[
          {
            title: "DONE",
            onClick: () => {},
          },
        ]}
      />
    );
    expect(screen.getByText(/DONE/i)).toBeInTheDocument();
  });

  test("Action button click should call a function", () => {
    const doneFn = jest.fn();
    const removeFn = jest.fn();
    render(
      <ActionButtons
        data={[
          {
            title: "DONE",
            onClick: doneFn,
          },
          { title: "REMOVE", onClick: removeFn },
        ]}
      />
    );
    const doneBtn = screen.getByText(/DONE/i);
    const removeBtn = screen.getByText(/REMOVE/i);
    fireEvent.click(doneBtn);
    expect(doneFn).toBeCalledTimes(1);
    fireEvent.click(removeBtn);
    expect(removeFn).toBeCalledTimes(1);
  });

  test("Disabled action button", () => {
    const doneFn = jest.fn();
    render(
      <ActionButtons
        data={[
          {
            title: "DONE",
            onClick: doneFn,
            disabled: true,
          },
        ]}
      />
    );
    const doneBtn = screen.getByText(/DONE/i);
    expect(doneBtn.classList.contains("disabled")).toBe(true);
    fireEvent.click(doneBtn)
    expect(doneFn).not.toHaveBeenCalled()
  });
});
