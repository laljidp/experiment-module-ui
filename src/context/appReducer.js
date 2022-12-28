import {
  ADD_EXPERIMENT_MODULE,
  LOCK_MODULE,
  RESET_MODULE,
  SAVE_ITERATION,
  SELECT_ITERATION,
} from "../constants";

export default function appReducer(state, action) {
  switch (action.type) {
    case ADD_EXPERIMENT_MODULE:
      return {
        ...state,
        experimentModules: [...state.experimentModules, action.payload],
      };
    case SAVE_ITERATION:
      return (function () {
        const id = action.payload.id;
        const iteration = action.payload.iteration;
        const newModules = state.experimentModules.slice();
        const idx = newModules.findIndex((o) => o.id === id);
        newModules[idx] = {
          ...newModules[idx],
          iterations: [...newModules[idx]?.iterations, iteration],
        };
        return {
          ...state,
          experimentModules: newModules,
        };
      })();
    case LOCK_MODULE:
      return (function () {
        const id = action.payload
        const newModules = state.experimentModules.slice();
        const idx = newModules.findIndex((o) => o.id === id);
        newModules[idx] = {
          ...newModules[idx],
          isLocked: true,
        };
        return {
          ...state,
          experimentModules: newModules,
        };
      })();
    case RESET_MODULE:
      return (function () {
        const id = action.payload;
        const newModules = state.experimentModules.slice();
        const idx = newModules.findIndex((o) => o.id === id);
        newModules[idx] = {
          ...newModules[idx],
          iterations: [],
        };
        return {
          ...state,
          experimentModules: newModules,
        };
      })();
      case SELECT_ITERATION:
        return (function () {
          const mid = action.payload.moduleID
          const iid = action.payload.iterationID
          const isSelected = action.payload.selection
          const newModules = state.experimentModules.slice();
          const idx = newModules.findIndex((o) => o.id === mid);
          const newIterations = newModules[idx]?.iterations
          const iterationIdx = newIterations.findIndex(o => o.id === iid)
          newIterations[iterationIdx] = { ...newIterations[iterationIdx], isSelected }
          newModules[idx] = {
            ...newModules[idx],
            iterations: newIterations,
          };
          return {
            ...state,
            experimentModules: newModules,
          };
        })()
    default:
      return state;
  }
}

