import Input from "components/Input";
import useForm from "hooks/useForm";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "services/User";

import styles from "./Register.module.scss";

const Register = () => {
  const navigate = useNavigate();

  const { register, getValue, handleSubmit, formErrors } = useForm();

  const onSubmit = async (data: any) => {
    try {
      let res = await registerUser(data);
      console.log(res);
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };

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
                  message: "Invalid Email",
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
          <button onClick={handleSubmit(onSubmit)}>Register</button>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
