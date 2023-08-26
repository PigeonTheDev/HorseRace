import { combineReducers } from "redux";
import ResultReducer from "./ResultReducer";
import { ResultModal } from "../../Models/ResultModal";
import { User } from "../../Models/User";
import UserReducer from "./UserReducer";

export type GlobalState = {
  results: ResultModal[];
  users: User[];
};

const rootReducer = combineReducers<GlobalState>({
  results: ResultReducer,
  users: UserReducer,
});

export default rootReducer;
