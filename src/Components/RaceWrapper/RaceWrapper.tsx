import React, { useEffect, useState } from "react";
import { Run } from "../../Models/Run";
import { ResultContainer } from "../ResultContainer/ResultContainer";
import { ProgramContainer } from "../ProgramContainer/ProgramContainer";
import { RaceContainer } from "../RaceContainer/RaceContainer";
import "./RaceWrapper.css";
import { HorseRatioPopUp } from "../HorseRatiosPopUp/HorseRatiosPopUp";
import { Horse } from "../../Models/Horse";
import { User } from "../../Models/User";
import { useDispatch } from "react-redux";
import { USER_EDIT } from "../../Redux/UsersAction";

interface IRaceWrapper {
  raceStopped: boolean;
  Race: Run[];
  user: User;
}

export const RaceWrapper: React.FC<IRaceWrapper> = ({ raceStopped, Race, user }) => {
  const [runCount, setRunCount] = useState<number>(1);
  const [didRunFinish, setDidRunFinish] = useState<boolean>(false);
  const [selectedHorse, setSelectedHorse] = useState<Horse | null>(null);
  const [ratioOpen, setRatioOpen] = useState<boolean>(true);
  const [bettedAmount, setBettedAmount] = useState<number>(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(USER_EDIT(user));
  }, [dispatch, runCount, user]);

  const handleReturnedAmount = (amount: number) => {
    user.balance = user.balance + amount;
  };

  useEffect(() => {
    if (runCount < Race.length && didRunFinish) {
      setRunCount(runCount + 1);
      setDidRunFinish(false);
      setRatioOpen(true);
    }
  }, [Race.length, didRunFinish, runCount]);

  return (
    <>
      {ratioOpen ? (
        <HorseRatioPopUp
          horses={Race[runCount - 1].horses}
          userFavoriteHorse={user.favoriteHorse}
          balance={user.balance}
          selectedHorse={(horse, amount) => {
            setBettedAmount(amount);
            user.balance = user.balance - amount;
            setSelectedHorse(horse);
          }}
          ratioOpen={setRatioOpen}
        />
      ) : (
        <span className="RaceWrapper">
          <div>
            <span>
              <span className="lapCount"> Lap: {Race[runCount - 1].lapCount}</span>
              <span className="userInfo">
                <span className="infoElement">Username: {user.username}</span>
                <span className="infoElement">Account: {Math.floor(user.balance * 100) / 100}$</span>
                <span className="infoElement"> Favorite Horse: {user.favoriteHorse}</span>
              </span>
            </span>
            <span>
              {selectedHorse ? (
                <RaceContainer
                  selectedHorse={selectedHorse}
                  raceStopped={raceStopped}
                  userBetAmount={bettedAmount}
                  run={Race[runCount - 1]}
                  didRunFinish={setDidRunFinish}
                  returnedAmount={handleReturnedAmount}
                />
              ) : null}
            </span>
          </div>

          <span className="ProgramsWrapper">
            <ProgramContainer race={Race} />
            <ResultContainer />
          </span>
        </span>
      )}
    </>
  );
};
