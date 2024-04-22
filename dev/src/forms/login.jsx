import React, { useState } from "react";
import { login, loginGuest, createUser, resetPass } from "../services/post";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import * as yup from "yup";
import "yup-phone";
// Components
import Input from "../forms/inputs/input";
import Button from "../components/common/button";
import session from "../services/session";
import Loading from "../components/common/loading";
import { check4previous } from "../services/auth";

const Login = (props) => {
  // Schema for contact form
  const schemaWrapper = {
    login: yup.object().shape({
      email: yup
        .string()
        .email("Email not valid")
        .required("Email is required"),
      password: yup.string().required("Password required"),
    }),
    reset: yup.object().shape({
      email: yup
        .string()
        .email("Email not valid")
        .required("Email is required"),
    }),
    create: yup.object().shape({
      fName: yup.string().required("First name is required"),
      lName: yup.string().required("Last name is required"),
      email: yup
        .string()
        .email("Email not valid")
        .required("Email is required"),
      emailConfirm: yup
        .string()
        .email("Email not valid")
        .oneOf([yup.ref("email"), null], "Emails don't match!")
        .required("Confirmation is required"),
      password: yup.string().required("Password required"),
      passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords don't match!")
        .required("Confirmation required"),
    }),
  };

  const [loading, setLoading] = useState(false);
  const [schema, setSchema] = useState(schemaWrapper.login);

  // Form fields
  const [loginForm, setLogin] = useState(true);
  const [createForm, setCreate] = useState(false);
  const [resetForm, setReset] = useState(false);

  // Form handling
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const changeForm = (e, type) => {
    e.preventDefault();

    if (type === "initial") {
      setSchema(schemaWrapper.reset);
      setLogin(true);
      setCreate(false);
      setReset(false);
    }

    if (type === "reset") {
      setSchema(schemaWrapper.reset);
      setLogin(false);
      setCreate(false);
      setReset(true);
    }

    if (type === "create") {
      setSchema(schemaWrapper.create);
      setLogin(false);
      setReset(false);
      setCreate(true);
    }
  };

  const onSubmit = async (values) => {
    setLoading(true);
    if (loginForm) {
      const { success, error } = await login(values);
      if (success) {
        session.set("token", success.token);
        // Continue
        check4previous();
      }
      error && console.log(error);
      error && toast.error(error.message);
    }
    if (createForm) {
      console.log("createForm");
      delete values.emailConfirm;
      delete values.passwordConfirm;
      const { success, error } = await createUser(values);
      if (success) {
        toast.success(success.message);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
      error && toast.error(error.message);
    }
    if (resetForm) {
      console.log(values);
      const { success, error } = await resetPass(values);
      if (success) {
        toast.success(success.message);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
      error && toast.error(error.message);
    }
    setLoading(false);
  };

  const loginWithGuest = async (e) => {
    e.preventDefault();
    const { success, error } = await loginGuest();
    if (success) {
      session.set("token", success.token);
      // Continue
      check4previous();
    }
    error && toast.error(error.message);
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="card-body">
          <div className="row">
            {createForm ? (
              <h5 className="card-title ml-2">Create new account</h5>
            ) : resetForm ? (
              <h5 className="card-title ml-2">Reset password</h5>
            ) : (
              <h5 className="card-title ml-2">Login to the Dashboard</h5>
            )}

            {(createForm || resetForm) && (
              <Button
                className="btn close-btn"
                title="Back to login"
                onClick={(e) => changeForm(e, "initial")}
              >
                {String.fromCharCode(10005)}
              </Button>
            )}
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="login">
            {createForm && (
              <>
                <Input
                  name="fName"
                  placeholder="First Name"
                  fullWidth={true}
                  className="form-control"
                  register={register}
                  error={errors.fName?.message}
                />
                <Input
                  name="lName"
                  placeholder="Last Name"
                  fullWidth={true}
                  className="form-control"
                  register={register}
                  error={errors.lName?.message}
                />
              </>
            )}
            <Input
              type="email"
              name="email"
              placeholder="Email"
              fullWidth={true}
              className="form-control"
              register={register}
              error={errors.email?.message}
            />

            {createForm && (
              <Input
                type="email"
                name="emailConfirm"
                placeholder="Confirm Email"
                fullWidth={true}
                className="form-control"
                register={register}
                error={errors.emailConfirm?.message}
              />
            )}
            {(loginForm || createForm) && (
              <Input
                type="password"
                name="password"
                className="password"
                placeholder="Password"
                fullWidth={true}
                className="form-control"
                register={register}
                error={errors.password?.message}
              />
            )}
            {createForm && (
              <Input
                type="password"
                name="passwordConfirm"
                placeholder="Confirm Password"
                fullWidth={true}
                className="form-control"
                register={register}
                error={errors.passwordConfirm?.message}
              />
            )}
            {!createForm && !resetForm && (
              <Button
                text="Login as Guest"
                id="guestLogin"
                type="submit"
                className="btn btn-success float-left"
                onClick={(e) => loginWithGuest(e)}
              />
            )}

            {resetForm ? (
              <>
                <p>
                  If a valid email is entered, instructions will be sent on how
                  to reset your password.
                </p>
                <Button
                  text="Reset"
                  type="submit"
                  className="btn btn-custom full-width"
                />
              </>
            ) : (
              <Button
                text={createForm ? "Create" : "Login"}
                type="submit"
                className={
                  "btn btn-custom " +
                  (createForm ? "full-width" : "float-right")
                }
              />
            )}
            {!createForm && !resetForm && (
              <div className="form-footer">
                <hr />
                <Button
                  text="Reset Password"
                  className="btn btn-link"
                  onClick={(e) => changeForm(e, "reset")}
                />
                <Button
                  text="Create Account"
                  className="btn btn-link"
                  onClick={(e) => changeForm(e, "create")}
                />
              </div>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
