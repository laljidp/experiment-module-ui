import React from "react";

const ActionButtons = ({ data }) => {
  return (
    <div className="d-flex align-items-center justify-content-end p-4">
      {data.map(({ onClick, title, disabled }) => (
        <span
          role={"button"}
          key={title}
          className={`ml-3 action-btn ${disabled ? "disabled" : ""}`}
          onClick={!disabled ? onClick : () => {}}
          disabled={disabled}
        >
          {title}
        </span>
      ))}
    </div>
  );
};

export default ActionButtons;
