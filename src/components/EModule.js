import React, { useState } from "react";
import IterationLists from "./IterationLists";
import { LockIcon, UnlockIcon } from "../assets/icons";
import { useGlobalContext } from "../context/GlobalState";
import { generateUUID } from "../utils";

const EModule = (props) => {
  const { module } = props;
  const [expand, setExpand] = useState(false);
  const { saveIteration, lockModule, resetModule, selectIteration } =
    useGlobalContext();

  const toggleExpand = () => setExpand(!expand);

  const onSaveIteration = (title) => {
    saveIteration(module.id, {
      id: generateUUID(),
      title: title,
      isSelected: false,
    });
  };

  const handleLock = () => {
    lockModule(module.id);
    toggleExpand();
  };

  const handleReset = () => {
    resetModule(module.id);
  };

  const handleSelect = (iterationID, isSelected) => {
    selectIteration({
      moduleID: module.id,
      iterationID,
      selection: isSelected,
    });
  };

  const renderIcon = () => {
    if (module.iterations.length === 0) return null;
    if (module.isLocked) return <LockIcon />;
    return <UnlockIcon />;
  };

  return (
    <div className="d-block module-section">
      <div
        className="module-head"
        onClick={!module.isLocked ? toggleExpand : () => {}}
      >
        <h5
          className={`m-0 ${
            (module.isLocked || module.iterations.length === 0) &&
            "text-secondary"
          }`}
        >
          {module.title}
        </h5>
        <i>{renderIcon()}</i>
      </div>
      {expand && (
        <div className="module-body mt-2">
          <IterationLists
            data={module.iterations}
            toggleExpand={toggleExpand}
            mid={module.id}
            onSaveIteration={onSaveIteration}
            handleLock={handleLock}
            handleReset={handleReset}
            handleSelect={handleSelect}
          />
        </div>
      )}
    </div>
  );
};

export default EModule;
