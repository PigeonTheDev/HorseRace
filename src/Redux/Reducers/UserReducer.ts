import { Reducer } from "redux";
import { User } from "../../Models/User";

const initUsers: User[] = JSON.parse(localStorage.getItem("users") || "[]");

if (initUsers.length === 0) {
  initUsers.push({ username: "", password: "", favoriteHorse: "", balance: 0, id: 0 });
}

interface IAction {
  type: string;
  payload: User;
}

const UserReducer: Reducer<User[], IAction> = (state: User[] = initUsers, action: IAction): User[] => {
  const users: User[] = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case "USER_ADD":
      const userwithId = { ...action.payload, id: users[users.length - 1].id + 1 };
      users.push(userwithId);
      localStorage.setItem("users", JSON.stringify(users));
      return users;

    case "USER_EDIT":
      for (let i = 0; i < users.length; i++) {
        if (users[i].id === action.payload.id) {
          users[i] = action.payload;
          localStorage.setItem("users", JSON.stringify(users));
        }
      }

      return users;

    /* case "USER_DELETE":
      for (let i = 0; i < users.length; i++) {
        if (users[i].id === action.payload.id) {
          users.splice(i, 1);
          break;
        }
      }
      return users;  */
    default:
      return users;
  }
};

export default UserReducer;
