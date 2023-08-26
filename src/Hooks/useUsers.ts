import { useSelector } from "react-redux";
import { GlobalState } from "../Redux/Reducers";

export const useUsers = () => {
  const users = useSelector((state: GlobalState) => state.users);
  return users;
};
