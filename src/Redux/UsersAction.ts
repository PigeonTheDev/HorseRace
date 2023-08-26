import { User } from "../Models/User";

export const USER_ADD = (user: User) => {
  return { type: "USER_ADD", payload: user };
};

export const USER_EDIT = (user: User) => {
  return { type: "USER_EDIT", payload: user };
};

/* export const USER_DELETE = (user: User) => {
  return { type: "USER_DELETE", payload: user };
};  */
