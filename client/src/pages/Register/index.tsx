import { Fragment, useEffect } from "react";
import Input from "components/Input";
import useForm from "hooks/useForm";
import { useLocation, Navigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import { cookie } from "utils";

import styles from "./Register.module.scss";

const Register = () => {
  const location = useLocation();

  const { register, getValue, handleSubmit, formErrors } = useForm<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>();

  const { register: registerUser } = useAuth();

  const searchParams = new URLSearchParams(location.search);

  let url = searchParams.get("url");

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") handleSubmit(registerUser)(event);
  };

  if (cookie.get("auth_token"))
    return <Navigate replace to={url || "/form/list"} />;

  return (
    <Fragment>
      <div className={styles.header}>
        <span>Sign Up</span>
      </div>
      <div className={styles.container}>
        <div>
          <div className={styles.field}>
            <label>Name</label>
            <Input
              placeholder="Enter name"
              register={register("name", {
                required: {
                  value: true,
                  message: "Please enter name",
                },
                pattern: {
                  value: /^[A-Za-z ]+$/,
                  message: "Name should contain alphabets only",
                },
                minLength: {
                  value: 3,
                  message: "Name should contain atleast 3 characters",
                },
              })}
            />
          </div>
          {formErrors?.name && (
            <span className={styles.error_msg}>{formErrors.name}</span>
          )}
        </div>
        <div>
          <div className={styles.field}>
            <label>Email Id</label>
            <Input
              placeholder="Enter email id"
              register={register("email", {
                required: {
                  value: true,
                  message: "Please enter email id",
                },
                pattern: {
                  value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Invalid Email",
                },
              })}
            />
          </div>
          {formErrors?.email && (
            <span className={styles.error_msg}>{formErrors.email}</span>
          )}
        </div>
        <div>
          <div className={styles.field}>
            <label>Password</label>
            <Input
              type="password"
              placeholder="Enter password"
              register={register("password", {
                required: { value: true, message: "Please enter password" },
                pattern: {
                  value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                  message:
                    "Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",
                },
              })}
            />
          </div>
          {formErrors?.password && (
            <span className={styles.error_msg}>{formErrors.password}</span>
          )}
        </div>
        <div>
          <div className={styles.field}>
            <label>Confirm Password</label>
            <Input
              type="password"
              placeholder="Enter password"
              register={register("confirmPassword", {
                required: {
                  value: true,
                  message: "Please enter confirm password",
                },
                validate: {
                  value: (val) => getValue("password") !== val,
                  message: "Confirm password should match with password",
                },
              })}
            />
          </div>
          {formErrors?.confirmPassword && (
            <span className={styles.error_msg}>
              {formErrors.confirmPassword}
            </span>
          )}
        </div>
        <div className={styles.cta}>
          <button onClick={handleSubmit(registerUser)}>Register</button>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
