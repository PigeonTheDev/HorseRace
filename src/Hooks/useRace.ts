import { Horse } from "../Models/Horse";
import { Run } from "../Models/Run";
import Horses from "../Horse.json";

export const useRace = () => {
  const race: Run[] = [];

  for (let lapCount: number = 1; lapCount <= 6; lapCount++) {
    const chosenHorses: Horse[] = [];
    for (let horseCount: number = 1; horseCount <= 10; horseCount++) {
      const randomizedIndex = Math.floor(Math.random() * 20);
      if (chosenHorses.includes(Horses.horses[randomizedIndex])) {
        horseCount--;
      } else {
        chosenHorses.push(Horses.horses[randomizedIndex]);
      }
    }

    race.push({ horses: chosenHorses, length: 1000 + lapCount * 200, lapCount: lapCount });
  }

  return race;
};
