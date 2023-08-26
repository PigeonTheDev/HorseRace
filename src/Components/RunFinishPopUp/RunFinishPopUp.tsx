import React from "react";
import "./RunFinishPopUp.css";

interface IRunFinishPopUp {
  wonAmount: number;
  close: () => void;
  userBetAmount: number;
}

export const RunFinishPopUp: React.FC<IRunFinishPopUp> = ({ wonAmount, close, userBetAmount }) => {
  return (
    <div className="RunFinishPopUpWrapper">
      <div className="RunFinishPopUp">
        {wonAmount > userBetAmount ? (
          <div>Congratulations, you won {Math.floor(((wonAmount - userBetAmount) * 100) / 100)}$ !</div>
        ) : wonAmount === 0 ? (
          <div>Oh no, you lost! Better luck next time!</div>
        ) : (
          <div>Unfortunately, you didn't earn any money, but you got {Math.floor(wonAmount * 100) / 100}$ back!</div>
        )}
        <button className="closeButton" onClick={close}>
          Alright!
        </button>
      </div>
    </div>
  );
};
