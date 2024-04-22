import React, { useEffect } from "react";
import session from "../services/session";
import { toast } from "react-toastify";
import LoginForm from "../forms/login";
import logo from "../assets/images/wheelLock-06.png";

const Login = () => {
  useEffect(() => {
    inactiveAlert();
  }, []);

  const inactiveAlert = () => {
    const message = session.get("inactive");
    message && toast.warning(message, { autoClose: false });
    session.remove("inactive");
  };

  return (
    <main className="login">
      <div className="container main-logo">
        <img src={logo} alt="Wheel Lock Solutions"></img>
      </div>
      <div className="container">
        <div className="card login">
          <LoginForm />
        </div>
      </div>
    </main>
  );
};
export default Login;
