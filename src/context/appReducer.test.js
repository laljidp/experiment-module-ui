import appReducer from "./appReducer";
import {
  ADD_EXPERIMENT_MODULE,
  LOCK_MODULE,
  RESET_MODULE,
  SAVE_ITERATION,
  SELECT_ITERATION,
} from "../constants";

const MOCK_MODULE_DATA = {
  id: "xyz",
  title: "Experiment Module",
  isLocked: false,
  iterations: [],
};

describe("App reducer functions tests", () => {
  test("should add module when ADD_EXPERIMENT_MODULE action called", () => {
    const initialState = {
      experimentModules: [],
    };
    const action = {
      type: ADD_EXPERIMENT_MODULE,
      payload: { ...MOCK_MODULE_DATA },
    };
    const updatedState = appReducer(initialState, action);
    expect(updatedState).toEqual({
      experimentModules: [
        {
          id: 'xyz',
          title: 'Experiment Module',
          isLocked: false,
          iterations: []
        },
      ],
    });
  });

  test("should update lock status when LOCK_MODULE action called", () => {
    const initialState = {
      experimentModules: [
        {
          ...MOCK_MODULE_DATA,
        },
      ],
    };
    const action = {
      type: LOCK_MODULE,
      payload: MOCK_MODULE_DATA.id, // module id
    };
    const updatedState = appReducer(initialState, action);
    expect(updatedState).toEqual({
      experimentModules: [
        {
          id: "xyz",
          title: "Experiment Module",
          isLocked: true,
          iterations: [],
        },
      ],
    });
  });

  test("should add iteration when SAVE_ITERATION called", () => {
    const initialState = {
      experimentModules: [
        {
          ...MOCK_MODULE_DATA,
        },
      ],
    };
    const action = {
      type: SAVE_ITERATION,
      payload: {
        id: "xyz",
        iteration: { id: "zzz", title: "test_title", isSelected: false },
      },
    };
    const updatedState = appReducer(initialState, action);
    expect(updatedState).toEqual({
      experimentModules: [
        {
          id: "xyz",
          title: "Experiment Module",
          isLocked: false,
          iterations: [{ id: "zzz", title: "test_title", isSelected: false }],
        },
      ],
    });
  });

  test("should reset module when RESET_MODULE action dispatch", () => {
    const initialState = {
      experimentModules: [
        {
          ...MOCK_MODULE_DATA,
          iterations: [
            { id: "qwerty", title: "test_qwerty", isSelected: true },
          ],
        },
      ],
    };
    const action = {
      type: RESET_MODULE,
      payload: "xyz",
    };
    const updatedState = appReducer(initialState, action);
    expect(updatedState).toEqual({
      experimentModules: [
        {
          id: "xyz",
          title: "Experiment Module",
          isLocked: false,
          iterations: [],
        },
      ],
    });
  });

  test("should change isSelected value when SELECT_ITERATION action dispatch", () => {
    const initialState = {
      experimentModules: [
        {
          ...MOCK_MODULE_DATA,
          iterations: [{ id: "poiuy", title: "test_poiuy", isSelected: false }],
        },
      ],
    };
    const action = {
      type: SELECT_ITERATION,
      payload: { moduleID: "xyz", iterationID: "poiuy", selection: true },
    };
    const updatedState = appReducer(initialState, action);
    expect(updatedState).toEqual({
      experimentModules: [
        {
          id: "xyz",
          title: "Experiment Module",
          isLocked: false,
          iterations: [{ id: "poiuy", title: "test_poiuy", isSelected: true }],
        },
      ],
    });
  });
});
