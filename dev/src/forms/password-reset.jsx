import React, { useState } from "react";
import { updatePassword } from "../services/post";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import * as yup from "yup";
import "yup-phone";
// Components
import Input from "./inputs/input";
import Button from "../components/common/button";
import Loading from "../components/common/loading";

const PasswordReset = ({ token }) => {
  // Schema for contact form
  const schema = yup.object().shape({
    password: yup.string().required("Password required"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords don't match!")
      .required("Confirmation required"),
  });

  const [loading, setLoading] = useState(false);

  // Form handling
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    console.log(values);
    setLoading(true);

    delete values.passwordConfirm;
    values.token = token;

    const { success, error } = await updatePassword(values);
    if (success) {
      toast.success(success.message);
      setTimeout(() => {
        window.location.replace("/login");
      }, 3000);
    }
    error && toast.error(error.message);
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="card-body">
          <div className="row">
            <h5 className="card-title ml-2">Create new password</h5>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="login">
            <Input
              type="password"
              name="password"
              className="form-control password"
              placeholder="Password"
              fullWidth={true}
              register={register}
              error={errors.password?.message}
            />
            <Input
              type="password"
              name="passwordConfirm"
              placeholder="Confirm Password"
              fullWidth={true}
              className="form-control"
              register={register}
              error={errors.passwordConfirm?.message}
            />
            <Button
              text="Change password"
              type="submit"
              className="btn btn-custom full-width"
            />
          </form>
        </div>
      )}
    </>
  );
};

export default PasswordReset;
