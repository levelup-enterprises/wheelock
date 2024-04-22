import React, { useEffect } from "react";
import { verify } from "../services/post";
import { toast } from "react-toastify";

const Verify = (props) => {
  console.log(props);

  const checkToken = async () => {
    const { success, error } = await verify({
      token: props.token,
      confirmed: props.confirmation,
      valid: props.valid,
    });

    console.log(success);
    console.log(error);

    if (success) {
      toast.success(success.message);
      setTimeout(() => {
        window.location.replace("/login");
      }, 3000);
    }
    error && toast.error(error.message);
  };
  useEffect(() => {
    checkToken();
  }, []);

  return <main className="login"></main>;
};

export default Verify;
