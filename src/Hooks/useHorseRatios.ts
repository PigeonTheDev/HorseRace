import { Horse } from "../Models/Horse";

export const useHorseRatios = (horses: Horse[]) => {
  const calculateHorseValue = (horse: Horse) => {
    if (horse.streak === 0) {
      return horse.condition * 2;
    } else {
      return horse.condition * (horse.streak + 1);
    }
  };

  horses.forEach((horse) => (horse.ratio = Math.floor((1 + Math.floor((100 / calculateHorseValue(horse)) * 100) / 100) * 100) / 100));

  return horses;
};
