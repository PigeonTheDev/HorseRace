import React from "react";
import { Run } from "../../Models/Run";
import { Program } from "./Program/Program";
import "./ProgramContainer.css";

interface IProgramContainer {
  race: Run[];
}

export const ProgramContainer: React.FC<IProgramContainer> = ({ race }) => {
  return (
    <div className="ProgramWrapper">
      <div className="ProgramHeader">Program</div>
      <div className="Programs">
        {race.map((run, index) => (
          <div key={index}>
            <h3>
              Lap: {run.lapCount} - {run.length}M
            </h3>
            <Program chosenHorses={run.horses} />
          </div>
        ))}
      </div>
    </div>
  );
};
