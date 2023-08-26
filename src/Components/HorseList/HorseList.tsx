import React from "react";
import { Horse } from "../../Models/Horse";
import "./HorseList.css";

interface IHorseList {
  Horses: Horse[];
}

export const HorseList: React.FC<IHorseList> = ({ Horses }) => {
  return (
    <div className="ListWrapper">
      <div className="ListHeader">
        <h3>Horse List (1-20)</h3>
      </div>
      <div className="ListElements">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Condition</th>
            </tr>
          </thead>

          {Horses.map((horse, index) => (
            <tbody style={{ backgroundColor: `${horse.color}` }} key={index}>
              <tr>
                <td>{horse.name}</td>
                <td>{horse.condition}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};
