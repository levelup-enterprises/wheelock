import React, { useReducer } from "react";
import jwt from "jwt-decode";
import session from "../services/session";
import { logout } from "../services/auth";

let reducer = (user, newUser) => {
  return { ...user, ...newUser };
};

// Get user data from session
const getUser = () => {
  try {
    // Get user info
    const user = session.get("token") || null;
    if (user) {
      let time = jwt(user);

      // Check if expired
      time = new Date(time.exp);
      time < new Date() && logout();

      return jwt(user);
    } else {
      return {};
    }
  } catch (error) {
    console.log(error);
  }
};

const UserContext = React.createContext();

function UserProvider(props) {
  const [user, updateUser] = useReducer(reducer, getUser());

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
