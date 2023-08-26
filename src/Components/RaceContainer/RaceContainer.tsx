/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Run } from "../../Models/Run";
import "./RaceContainer.css";
import { Horse } from "../../Models/Horse";
import { useDispatch } from "react-redux";
import { RESULT_ADD, RESULT_EDIT } from "../../Redux/ResultsAction";
import { RunFinishPopUp } from "../RunFinishPopUp/RunFinishPopUp";

interface IRaceWrapper {
  run: Run;
  raceStopped: boolean;
  selectedHorse: Horse;
  userBetAmount: number;
  returnedAmount: (amount: number) => void;
  didRunFinish: (didRunFinish: boolean) => void;
}

export const RaceContainer: React.FC<IRaceWrapper> = ({ run, raceStopped, selectedHorse, userBetAmount, returnedAmount, didRunFinish }) => {
  const [horseRankings, setHorseRankings] = useState<Horse[]>([]);
  const [finalizedSpeedsCalculated, setFinalizedSpeedsCalculated] = useState<boolean>(false);
  const dispatch = useDispatch();

  const calculateWonAmount = () => {
    if (selectedHorse.ratio) {
      switch (selectedHorse) {
        case horseRankings[0]:
          return userBetAmount * selectedHorse.ratio;

        case horseRankings[1]:
          return userBetAmount * selectedHorse.ratio * 0.75;

        case horseRankings[2]:
          return userBetAmount * selectedHorse.ratio * 0.5;
        default:
          return 0;
      }
    } else {
      console.error("horse ratio not calculated, refunding...");
      return userBetAmount;
    }
  };

  useEffect(() => {
    if (horseRankings.length === 0) {
      dispatch(RESULT_ADD({ winnerRankings: horseRankings, lapCount: run.lapCount, id: run.lapCount }));
    } else if (!run.horses.some((horse) => horse.finalizedSpeed === undefined)) {
      dispatch(RESULT_EDIT({ winnerRankings: horseRankings, lapCount: run.lapCount, id: run.lapCount }));

      if (horseRankings.length === run.horses.length) {
        for (let i = 0; i < horseRankings.length; i++) {
          if (i < 3) {
            horseRankings[i].streak += 1;
          } else {
            if (horseRankings[i].streak > 0) {
              horseRankings[i].streak -= 1;
            }
          }
        }
      }
    }
  }, [calculateWonAmount, didRunFinish, dispatch, horseRankings, returnedAmount, run.horses, run.lapCount, selectedHorse, userBetAmount]);

  return (
    <div>
      {horseRankings.length === 10 ? (
        <RunFinishPopUp
          close={() => {
            didRunFinish(true);
            returnedAmount(calculateWonAmount());
            setFinalizedSpeedsCalculated(false);
            setHorseRankings([]);
          }}
          wonAmount={calculateWonAmount()}
          userBetAmount={userBetAmount}
        />
      ) : null}
      <div className="HorseRaceWrapper">
        {run.horses.map((horse, index) => {
          if (!finalizedSpeedsCalculated) {
            horse.finalizedSpeed = horse.condition * 0.5 + Math.floor(Math.random() * 20);
            if (index === run.horses.length - 1) {
              setFinalizedSpeedsCalculated(true);
            }

            const horseAnimationDecider = Math.floor(Math.random() * 5);

            switch (horseAnimationDecider) {
              case 0:
                horse.animationType = "linear";
                break;
              case 1:
                horse.animationType = "ease";
                break;
              case 2:
                horse.animationType = "ease-in";
                break;
              case 3:
                horse.animationType = "ease-out";
                break;
              case 4:
                horse.animationType = "ease-in-out";
                break;
            }
          }

          return (
            <div key={index} className="HorseWrapper">
              <div className="HorseNumber">{index + 1}</div>
              <div>{horse.name}</div>
              <div
                className="HorseIcon"
                style={{
                  animationDuration: `${horse.finalizedSpeed === undefined ? 0 : run.length / (horse.finalizedSpeed * 3)}s`,
                  animationTimingFunction: horse.animationType,
                  animationPlayState: `${raceStopped ? "paused" : "running"}`,
                }}
                onAnimationEnd={() => {
                  setHorseRankings((current) => [...current, horse]);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill={horse.color} width="35" height="35" viewBox="0 0 15 15" id="racetrack-horse">
                  <path d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289C9.10536 1.48043 9 1.73478 9 2C9 2.26522 9.10536 2.51957 9.29289 2.70711C9.48043 2.89464 9.73478 3 10 3C10.2652 3 10.5196 2.89464 10.7071 2.70711C10.8946 2.51957 11 2.26522 11 2C11 1.73478 10.8946 1.48043 10.7071 1.29289C10.5196 1.10536 10.2652 1 10 1ZM5.5 3C5.25 3 4.5 3 5 3.75L6.25 6H4.5C4.223 6.003 3.983 6.1 3.75 6.25C2.944 5.121 2.242 5.552 1.51 6C1.107 6.247 0.694 6.499 0.25 6.5C0.184332 6.50201 0.121902 6.52899 0.0754461 6.57545C0.0289898 6.6219 0.00200653 6.68433 0 6.75C0.00200653 6.81567 0.0289898 6.8781 0.0754461 6.92455C0.121902 6.97101 0.184332 6.99799 0.25 7C0.626 7.02 1.057 6.907 1.488 6.793C2.144 6.62 2.798 6.448 3.254 6.75C3.16 6.937 3 7.5 3 8L2.998 9.51C2.792 9.714 2.619 9.633 2.443 9.55C2.303 9.485 2.16 9.42 2 9.5L1 12.45C1 12.7 1.393 12.752 1.5 12.5L2.25 10.744C2.998 10.744 4.5 10 5 9L9 10L11.5 12.5C11.697 12.697 12.12 12.362 11.96 12.115L10 9L12 6.5C12.248 7 12.495 7 12.986 7H13L13.6 7.75C13.988 8.235 14.82 7.743 14.5 7.25L12.834 4.79L13 4.5C13.062 4.313 12.637 3.924 12.5 4L10.5 5.5L8.89 3.187C8.84314 3.12862 8.78377 3.08151 8.71627 3.04915C8.64877 3.01678 8.57486 2.99999 8.5 3H5.5ZM9 5.25L9.5 6L6.777 7.916C6.72243 7.95469 6.66065 7.98204 6.59532 7.99643C6.52999 8.01081 6.46244 8.01194 6.39666 7.99975C6.33089 7.98756 6.26823 7.96229 6.2124 7.92545C6.15656 7.8886 6.10869 7.84093 6.07162 7.78525C6.03454 7.72957 6.00901 7.66701 5.99655 7.60129C5.98409 7.53556 5.98494 7.46801 5.99905 7.40262C6.01317 7.33723 6.04026 7.27534 6.07873 7.22061C6.1172 7.16588 6.16626 7.11943 6.223 7.084L9 5.25Z" />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
