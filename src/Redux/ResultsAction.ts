import { ResultModal } from "../Models/ResultModal";

export const RESULT_ADD = (result: ResultModal) => {
  return {
    type: "RESULT_ADD",
    payload: result,
  };
};

export const RESULT_EDIT = (result: ResultModal) => {
  return { type: "RESULT_EDIT", payload: result };
};

/* export const RESULT_DELETE = (result: ResultModal) => {
  return { type: "RESULT_DELETE", payload: result };
};  */
