import React, { createContext, useContext, useReducer } from "react";
import {
  ADD_EXPERIMENT_MODULE,
  LOCK_MODULE,
  RESET_MODULE,
  SAVE_ITERATION,
  SELECT_ITERATION,
} from "../constants";
import { generateUUID } from "../utils";
import appReducer from "./appReducer";

const initialState = {
  experimentModules: [
    {
      id: generateUUID(),
      title: "Experiment Module",
      isLocked: false,
      iterations: [],
    },
  ],
};

export const GlobalContext = createContext(initialState);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  function addExperimentalModule(module) {
    dispatch({
      type: ADD_EXPERIMENT_MODULE,
      payload: module,
    });
  }

  function saveIteration(id, iteration) {
    dispatch({
      type: SAVE_ITERATION,
      payload: { id, iteration },
    });
  }

  function addModule(module) {
    dispatch({
      type: ADD_EXPERIMENT_MODULE,
      payload: module,
    });
  }

  function lockModule(id) {
    dispatch({
      type: LOCK_MODULE,
      payload: id,
    });
  }

  function resetModule(id) {
    dispatch({
      type: RESET_MODULE,
      payload: id,
    });
  }

  function selectIteration({ moduleID, iterationID, selection }) {
    dispatch({
      type: SELECT_ITERATION,
      payload: { moduleID, iterationID, selection },
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        experimentModules: state.experimentModules,
        addExperimentalModule,
        saveIteration,
        addModule,
        lockModule,
        resetModule,
        selectIteration,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
