import React from "react";
import { Horse } from "../../../Models/Horse";

interface IProgram {
  chosenHorses: Horse[];
}

export const Program: React.FC<IProgram> = ({ chosenHorses }) => {
  return (
    <div>
      {chosenHorses.map((horse, index) => (
        <div key={index}>{horse.name}</div>
      ))}
    </div>
  );
};
