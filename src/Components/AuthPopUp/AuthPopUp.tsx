import { useState } from "react";
import { User } from "../../Models/User";
import { Horse } from "../../Models/Horse";
import "./AuthPopUp.css";
import { useDispatch } from "react-redux";
import { USER_ADD } from "../../Redux/UsersAction";
import { useUsers } from "../../Hooks/useUsers";

const initUsertoAdd: User = {
  username: "",
  password: "",
  balance: 100,
  favoriteHorse: "Patlıcan",
  id: 0,
};

interface IAuthPopUp {
  Horses: Horse[];
  returnUser: (user: User) => void;
}

export const AuthPopUp: React.FC<IAuthPopUp> = ({ Horses, returnUser }) => {
  const [user, setUser] = useState<User>(initUsertoAdd);
  const [animationName, setAnimationName] = useState<string>("flipImg");
  const [isLoginComponent, setIsLoginComponent] = useState<boolean>(false);
  const users = useUsers();

  const dispatch = useDispatch();

  const handleUserSubmit = () => {
    if (user.password === "" || user.username === "") {
      alert("Please enter your informations!");
    } else if (users.some((userElement) => userElement.username === user.username)) {
      alert("This username is already taken");
    } else {
      dispatch(USER_ADD(user));
      returnUser({ ...user, id: users[users.length - 1].id + 1 });
    }
  };

  const handleUserLogin = () => {
    const loggedInUser = users.find((userElement) => userElement.username === user.username && userElement.password === user.password);
    if (user.password === "" || user.username === "") {
      alert("Please enter your informations!");
    } else if (loggedInUser) {
      returnUser(loggedInUser);
    } else {
      alert("Please check your password and username!");
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevValue) => ({ ...prevValue, username: e.target.value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevValue) => ({ ...prevValue, password: e.target.value }));
  };

  const handleUserHorseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUser((prevValue) => ({ ...prevValue, favoriteHorse: e.target.value }));
  };

  return (
    <div className="PopUpBg">
      <div className="PopUpWrapper">
        <img
          onAnimationEnd={() => {
            if (animationName === "flipImg") {
              setAnimationName("reverseFlipImg");
            } else {
              setAnimationName("flipImg");
            }
          }}
          style={{ animationName: animationName }}
          alt="img"
          src="https://media.istockphoto.com/id/165965557/vector/man-with-checkered-flag.jpg?s=612x612&w=0&k=20&c=_ALe-rePsUWUJgBrb0CgQj7hB60TjLtAf1QI40ACqTo="
        />
        {isLoginComponent ? <h3>Log-In</h3> : <h3>Register</h3>}

        <span className="inputWrapper">
          Username:
          <input className="userInput" type="text" onChange={handleUsernameChange} placeholder="Please enter your username..." />
        </span>
        <span className="inputWrapper">
          Password:
          <input className="userInput" type="text" onChange={handlePasswordChange} placeholder="Please enter your password..." />
        </span>
        {!isLoginComponent ? (
          <>
            <span className="inputWrapper">
              Select your favorite horse:
              <select className="userDropdown" onChange={handleUserHorseChange}>
                {Horses.map((horse, index) => (
                  <option className="dropdownOption" key={index} style={{ backgroundColor: horse.color }} value={horse.name}>
                    {horse.name} - {horse.condition}
                  </option>
                ))}
              </select>
            </span>
            <span className="buttonWrapper">
              <button onClick={handleUserSubmit}>Start Racing !</button>
              <button onClick={() => setIsLoginComponent(true)}>Already have an account?</button>
            </span>
          </>
        ) : (
          <span className="buttonWrapper">
            <button onClick={handleUserLogin}>Login!</button>
            <button onClick={() => setIsLoginComponent(false)}>Don't have an account?</button>
          </span>
        )}
      </div>
    </div>
  );
};
