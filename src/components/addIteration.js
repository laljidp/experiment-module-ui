import React, { useEffect, useState } from "react";
import ActionButtons from "./ActionButtons";
import { generateRandomName } from "../utils";

const AddIteration = (props) => {
  const { onSaveIteration, onCancel, number } = props;
  const [text, setText] = useState("");
  const [generateMode, setGenerateMode] = useState(false);
  const [generateType, setGenerateType] = useState("");
  const [error, setError] = useState(false);

  const handleGenerateName = (type) => {
    setGenerateType(type);
    switch (type) {
      case "SHORT":
        setText(generateRandomName(1));
        break;
      case "MEDIUM":
        setText(generateRandomName(2));
        break;
      case "LONG":
        setText(generateRandomName(3));
        break;
      default:
        setText(generateRandomName(1));
    }
  };

  const handleAddIteration = () => {
    if (text.trim().length === 0) {
      setError(true);
      return;
    }
    onSaveIteration(text);
    setText("");
    setGenerateMode(false);
    onCancel();
  };

  const handleRemove = () => {
    setGenerateMode(false);
    setGenerateType("");
    setText("");
  };

  useEffect(() => {
    if (text.trim().length > 0) setError(false);
  }, [text]);

  return (
    <React.Fragment>
      <div className={`iteration-section ${error ? "error" : ""}`}>
        <div className="d-flex align-items-center">
          <span>{`EM-${number}`}</span>
          <input
            placeholder="Adding iteration..."
            name="text"
            value={text}
            readOnly={generateMode}
            onChange={({ target }) => setText(target.value)}
            className="ml-5 it-input"
          />
        </div>
        {generateMode && (
          <div className="mt-4 generator-section">
            <button
              className={`genetate-btn ${
                generateType === "SHORT" && "selected"
              }`}
              onClick={() => handleGenerateName("SHORT")}
            >
              SHORT
            </button>
            <button
              className={`genetate-btn ml-2 ${
                generateType === "MEDIUM" && "selected"
              }`}
              onClick={() => handleGenerateName("MEDIUM")}
            >
              MEDIUM LENGTH
            </button>
            <br />
            <button
              className={`genetate-btn mt-2 ${
                generateType === "LONG" && "selected"
              }`}
              onClick={() => handleGenerateName("LONG")}
            >
              VERY VERY VERY LONG (UP TO 35 CHAR)
            </button>
            <hr style={{ background: "grey" }} className="mb-0" />
            <ActionButtons
              data={[
                { title: "REMOVE", onClick: handleRemove },
                { title: "DONE", onClick: handleAddIteration },
              ]}
            />
          </div>
        )}
      </div>
      {!generateMode && (
        <>
          <div className="iteration-section mt-2">
            To add a new iteration, start typing a prompt or{" "}
            <span
              onClick={() => setGenerateMode(true)}
              role="button"
              className="text-underline"
            >
              <u>generate</u>
            </span>{" "}
            one
          </div>
          <ActionButtons
            data={[
              { title: "CANCEL", onClick: onCancel, disabled: number === 1 },
              { title: "DONE", onClick: handleAddIteration },
            ]}
          />
        </>
      )}
    </React.Fragment>
  );
};

export default AddIteration;
