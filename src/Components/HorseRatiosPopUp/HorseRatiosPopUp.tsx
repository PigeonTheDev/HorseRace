import React, { useState } from "react";
import { Horse } from "../../Models/Horse";
import { useHorseRatios } from "../../Hooks/useHorseRatios";
import "./HorseRatiosPopUp.css";

interface IHorseRatioPopUp {
  horses: Horse[];
  balance: number;
  selectedHorse: (horse: Horse, amount: number) => void;
  ratioOpen: (open: boolean) => void;
  userFavoriteHorse: string;
}

export const HorseRatioPopUp: React.FC<IHorseRatioPopUp> = ({ horses, balance, selectedHorse, ratioOpen, userFavoriteHorse }) => {
  const [amount, setAmount] = useState<number>(0);
  const horsesRatioed: Horse[] = useHorseRatios(horses);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseInt(event.target.value);
    setAmount(parsedValue);
  };

  return (
    <div className="horseBettingBG">
      <div className="horseBettingWrapper">
        <div className="horseBettingHeader">
          <h3>Select a horse to put your money on!</h3>
          <span>
            <h4>Your balance: {Math.floor(balance * 100) / 100}$</h4>
            <span className="betTitle">Whatcha' bettin?</span>
            <input
              className="amountInput"
              type="number"
              placeholder="Enter here"
              onChange={(event) => {
                handleAmountChange(event);
              }}
            />
          </span>
        </div>
        <div className="scrollableArea">
          {horsesRatioed.map((horse, index) => (
            <span key={index} className="horseWrapper">
              <span className="horseInfo">
                <h3 style={{ color: horse.color }}>{horse.name}</h3>: <div className="ratio">{horse.ratio}</div>
              </span>

              {horse.streak > 1 ? (
                <span className="streak">
                  <p>{horse.streak}</p>
                  <img className="streakImg" src="https://parspng.com/wp-content/uploads/2022/05/firepng.parspng.com-5.png" alt="Streak" />
                </span>
              ) : null}
              {horse.name === userFavoriteHorse ? (
                <img
                  className="favorite"
                  src="https://png.pngtree.com/png-vector/20220428/ourmid/pngtree-smooth-glossy-heart-vector-file-ai-and-png-png-image_4557871.png"
                  alt="Favorite"
                />
              ) : null}

              <button
                onClick={() => {
                  if (amount > balance) {
                    alert("Oh No! Doesn't look like you have enough money for that");
                  }
                  if (amount === 0) {
                    alert("Please choose an amount to bet");
                  }
                  if (amount <= balance) {
                    ratioOpen(false);
                    selectedHorse(horse, amount);
                  }
                }}
              >
                Bet!
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
