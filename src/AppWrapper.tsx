/* eslint-disable react-hooks/rules-of-hooks */
import { useMemo, useState } from "react";
import Horses from "./Horse.json";
import "./AppWrapper.css";

import { AuthPopUp } from "./Components/AuthPopUp/AuthPopUp";
import { User } from "./Models/User";
import { HorseList } from "./Components/HorseList/HorseList";
import { RaceWrapper } from "./Components/RaceWrapper/RaceWrapper";
import { useRace } from "./Hooks/useRace";

export const AppWrapper = () => {
  const [raceStopped, setRaceStopped] = useState<boolean>(false);
  const [raceClicked, setRaceClicked] = useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>(undefined);

  const race = useMemo(() => {
    return useRace();
  }, []);

  return (
    <>
      {user === undefined ? <AuthPopUp returnUser={setUser} Horses={Horses.horses} /> : null}
      <div className="AppWrapper">
        <div className="Header">
          <h2 style={{ fontStyle: "italic" }}>Horse Racing</h2>
          <img className="logoImg" src="https://assets.stickpng.com/thumbs/616051ea76000b00045a7d80.png" alt="logo" />
          <button
            onClick={() => {
              setRaceClicked(true);
            }}
          >
            Generate Program
          </button>
          <button disabled={!raceClicked} onClick={() => setRaceStopped(!raceStopped)}>
            Pause/Resume
          </button>
        </div>
        <span className="Wrapper">
          <HorseList Horses={Horses.horses} />
          {raceClicked && user ? <RaceWrapper Race={race} user={user} raceStopped={raceStopped} /> : null}
        </span>
      </div>
    </>
  );
};
