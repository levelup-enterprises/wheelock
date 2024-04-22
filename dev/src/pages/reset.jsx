import React, { useEffect, useState } from "react";
import { validateToken } from "../services/post";
import { toast } from "react-toastify";
import PasswordReset from "../forms/password-reset";
import logo from "../assets/images/wheelLock-06.png";

const Reset = (props) => {
  // State
  const [show, toggleShow] = useState(false);

  const checkToken = async () => {
    const { success, error } = await validateToken({
      token: props.token,
    });

    console.log(success);
    console.log(error);

    success && toggleShow(true);
    error && toast.error(error.message);
  };

  useEffect(() => {
    props.token ? checkToken() : window.location.replace("/login");
  }, [props]);

  return (
    <main className="login">
      {show && (
        <>
          <div className="container main-logo">
            <img src={logo} alt="Wheel Lock Solutions"></img>
          </div>
          <div className="container">
            <div className="card login">
              <PasswordReset token={props.token} />
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Reset;
