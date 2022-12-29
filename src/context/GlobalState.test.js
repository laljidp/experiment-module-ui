import React from "react";
import { render, renderHook } from "@testing-library/react";
import GlobalProvider, { useGlobalContext, GlobalContext } from "./GlobalState";

const state = { exprimentModules: [
    { id: 'xyz', title: 'Experiment Module', isLocked: false }
] };
const dispatch = jest.fn();

const wrapper = ({ children }) => (
  <GlobalContext.Provider value={{ state, dispatch }}>
    {children}
  </GlobalContext.Provider>
);

const mockUseContext = jest
  .fn()
  .mockImplementation(() => ({ state, dispatch }));

React.useContext = mockUseContext;

describe("useGlobalContext test", () => {
  test("should return present state and dispatch functions", () => {
    render(<GlobalProvider />);
    const { result } = renderHook(() => useGlobalContext(), { wrapper });

    expect(result.current.state.exprimentModules.length).toBe(1);
    expect(result.current).toEqual({ state, dispatch });
  });
});
