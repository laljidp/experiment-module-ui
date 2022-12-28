import React from "react";
import ActionButtons from "./ActionButtons";
import EModule from "./EModule";
import { useGlobalContext } from "../context/GlobalState";
import { generateUUID } from "../utils";
import "./EModule.css";

const EModulelists = () => {
  const { experimentModules, addModule } = useGlobalContext();

  const handleAddModule = () => {
    addModule({
      id: generateUUID(),
      title: "Experiment Module",
      isLocked: false,
      iterations: [],
    });
  };

  return (
    <div>
      <div className="pt-4 d-block">
        <h4>Modules</h4>
      </div>
      <div className="mt-4">
        {experimentModules.map((em) => (
          <EModule module={em} key={em.id} />
        ))}
      </div>
      <ActionButtons
        data={[{ title: "+ Add Module", onClick: handleAddModule }]}
      />
    </div>
  );
};

export default EModulelists;
