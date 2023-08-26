import React from "react";
import { ResultModal } from "../../../Models/ResultModal";
import "./Result.css";

interface IResult {
  result: ResultModal;
}

export const Result: React.FC<IResult> = ({ result }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Position</th>
          <th>Name</th>
        </tr>
      </thead>

      <tbody>
        {result.winnerRankings.map((horse, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{horse.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
