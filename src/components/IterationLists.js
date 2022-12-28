import React, { useState } from "react";
import AddIteration from "./AddIteration";
import ActionButtons from "./ActionButtons";

const IterationLists = (props) => {
  const {
    data = [],
    onSaveIteration,
    handleLock,
    handleReset,
    handleSelect,
  } = props;
  const [isAddMode, setIsAddMode] = useState(false);

  const getClassName = (index) => {
    if (index === 0) return "first";
    if (index === data.length - 1) return "last";
    return "";
  };

  return (
    <div>
      {data.map((iteration, index) => (
        <div
          key={iteration.id}
          className={`iteration-section d-flex align-items-center cursor-pointer ${getClassName(
            index
          )}`}
          onClick={() => handleSelect(iteration.id, !iteration.isSelected)}
        >
          <div style={{ minWidth: "40px" }}>{`EM-${index + 1}`}</div>
          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="it-title">{iteration.title}</div>
            {iteration.isSelected && (
              <div className="d-flex align-items-center">
                <span className="mr-2">Selection</span>
                <span className="green-dot mr-1">&#x2022;</span>
              </div>
            )}
          </div>
        </div>
      ))}
      {(data.length === 0 || isAddMode) && (
        <AddIteration
          number={data.length + 1}
          onSaveIteration={onSaveIteration}
          onCancel={() => setIsAddMode(false)}
        />
      )}
      {data.length > 0 && !isAddMode && (
        <ActionButtons
          data={[
            { title: "LOCK", onClick: handleLock },
            { title: "RESET", onClick: handleReset },
            { title: "+ ADD ITERATION", onClick: () => setIsAddMode(true) },
          ]}
        />
      )}
    </div>
  );
};

export default IterationLists;
