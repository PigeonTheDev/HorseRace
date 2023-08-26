import { Reducer } from "redux";
import { ResultModal } from "../../Models/ResultModal";

const initResult: ResultModal = {
  winnerRankings: [],
  lapCount: 0,
  id: 0,
};

interface IAction {
  type: string;
  payload: any;
}

const ResultReducer: Reducer<ResultModal[], IAction> = (state: ResultModal[] = [initResult], action: IAction): ResultModal[] => {
  const RaceResults: ResultModal[] = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case "RESULT_ADD":
      const resultwithId = { ...action.payload, id: RaceResults[RaceResults.length - 1].lapCount + 1 };
      RaceResults.push(resultwithId);
      return RaceResults;

    case "RESULT_EDIT":
      for (let i = 0; i < RaceResults.length; i++) {
        if (RaceResults[i].id === action.payload.id) {
          RaceResults[i] = action.payload;
          break;
        }
      }
      return RaceResults;

    /* case "RESULT_DELETE":
      for (let i = 0; i < RaceResults.length; i++) {
        if (RaceResults[i].lapCount === action.payload.id) {
          RaceResults.splice(i, 1);
          break;
        }
      }
      return RaceResults;  */
    default:
      return RaceResults;
  }
};

export default ResultReducer;
