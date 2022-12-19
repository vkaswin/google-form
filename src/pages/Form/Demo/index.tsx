import { useState } from "react";
import useForm from "hooks/useForm";

import styles from "./Demo.module.scss";

type FormValues = {
  name: string;
  dob: string;
  hobbies: string[];
  gender: string;
  resume: FileList | null;
  terms: boolean;
  state: string;
  password: string;
  confirmPassword: string;
  percentage: string;
  emailId: string;
};

const Demo = () => {
  const {
    watch,
    register,
    reset,
    resetField,
    setError,
    getValue,
    validate,
    setValue,
    clearError,
    handleSubmit,
    formErrors,
    formValues,
  } = useForm();

  const [count, setCount] = useState(0);

  const onSubmit = (formValues: object) => {
    console.log(formValues);
  };

  const onError = (error: object) => {
    console.log(error);
  };

  watch("password.0.old.value.0", () => {
    validate("password.0.new.value.0");
  });

  return (
    <div className={styles.container}>
      <div className={styles.form_field}>
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter Name"
          {...register("user.name", {
            required: { value: true, message: "Please enter name" },
            minLength: {
              value: 3,
              message: "Name should contain atleast 3 characters",
            },
          })}
        />
        {formErrors?.user?.name && (
          <span className={styles.error_msg}>{formErrors.user.name}</span>
        )}
      </div>
      <div className={styles.form_field}>
        <label>Email ID</label>
        <input
          type="text"
          placeholder="Enter email"
          defaultValue="aswin@gmail.com"
          {...register("user.info.detail.email", {
            required: { value: true, message: "Please enter email id" },
            pattern: {
              value: /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$/,
              message: "Invalid email id",
            },
          })}
        />
        {formErrors?.email && (
          <span className={styles.error_msg}>{formErrors.email}</span>
        )}
      </div>
      <div className={styles.form_field}>
        <label>Phone Number</label>
        <input
          type="text"
          placeholder="Enter phone number"
          defaultValue="9093434549"
          {...register("user.info.phone", {
            required: { value: true, message: "Please enter phone number" },
            pattern:
              /^[+]?(\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
          })}
        />
        {formErrors?.user?.info?.phone && (
          <span className={styles.error_msg}>{formErrors.user.info.phone}</span>
        )}
      </div>
      <div className={styles.form_field}>
        <label>Date of Birth</label>
        <input
          type="date"
          placeholder="Enter Date of Birth"
          {...register("dob", {
            required: { value: true, message: "Please enter date of birth" },
          })}
        />
        {formErrors?.dob && (
          <span className={styles.error_msg}>{formErrors.dob}</span>
        )}
      </div>
      <div className={styles.form_field}>
        <label>Percentage</label>
        <input
          type="number"
          placeholder="Enter Date of Birth"
          {...register("percentage", {
            required: { value: true, message: "Please enter percentage" },
            min: "20",
            max: "100",
          })}
        />
        {formErrors?.percentage && (
          <span className={styles.error_msg}>{formErrors.percentage}</span>
        )}
      </div>
      <div className={styles.form_field}>
        <label>Password</label>
        <input
          type="text"
          placeholder="Enter Password"
          {...register("password.0.old.value.0", {
            required: { value: true, message: "Please enter password" },
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d@$#!%*?&]{8,}$/,
              message:
                "Password contains atleast 8 character includes one captial letter, one symbol and one number",
            },
          })}
        />
        {formErrors?.password?.[0]?.old?.value?.[0] && (
          <span className={styles.error_msg}>
            {formErrors.password[0].old.value[0]}
          </span>
        )}
      </div>
      <div className={styles.form_field}>
        <label>Confirm Password</label>
        <input
          type="text"
          placeholder="Enter Confirm Password"
          {...register("password.0.new.value.0", {
            required: { value: true, message: "Please enter confirm password" },
            validate: {
              value: (val) => getValue("password.0.old.value.0") !== val,
              message: "Confirm password is not matched with password",
            },
          })}
        />
        {formErrors?.password?.[0]?.new?.value?.[0] && (
          <span className={styles.error_msg}>
            {formErrors.password[0].new.value[0]}
          </span>
        )}
      </div>
      <div className={styles.form_field}>
        <label>State</label>
        <select
          defaultValue="Hyderabad"
          {...register("state", {
            required: { value: true, message: "Please select any one state" },
          })}
        >
          <option value="" disabled>
            Select State
          </option>
          <option label="Chennai" value="Chennai" />
          <option
            label="Hyderabad"
            defaultValue="Hyderabad"
            value="Hyderabad"
          />
          <option label="Mumbai" value="Mumbai" />
          <option label="Delhi" value="Delhi">
            Delhi
          </option>
          <option label="Pune" value="Pune">
            Pune
          </option>
        </select>
        {formErrors?.state && (
          <span className={styles.error_msg}>{formErrors.state}</span>
        )}
      </div>
      <div className={styles.form_field}>
        <label>Hobbies</label>
        <div className={styles.options}>
          <div>
            <input
              type="checkbox"
              value="Cricket"
              {...register("hobbies", {
                required: {
                  value: true,
                  message: "Please select any one hobbies",
                },
              })}
            />
            <label>Cricket</label>
          </div>
          <div>
            <input
              type="checkbox"
              value="BasketBall"
              defaultChecked
              {...register("hobbies")}
            />
            <label>BasketBall</label>
          </div>
          <div>
            <input
              type="checkbox"
              value="VolleyBall"
              {...register("hobbies")}
            />
            <label>VolleyBall</label>
          </div>
          <div>
            <input
              type="checkbox"
              value="FootBall"
              defaultChecked
              {...register("hobbies")}
            />
            <label>FootBall</label>
          </div>
        </div>
        {formErrors?.hobbies && (
          <span className={styles.error_msg}>{formErrors.hobbies}</span>
        )}
      </div>
      <div className={styles.form_field}>
        <label>Gender</label>
        <div className={styles.options}>
          <div>
            <input
              type="radio"
              value="Male"
              defaultChecked
              {...register("gender", {
                required: { value: true, message: "Please select gender" },
              })}
            />
            <label>Male</label>
          </div>
          <div>
            <input type="radio" value="Female" {...register("gender")} />
            <label>Female</label>
          </div>
          <div>
            <input type="radio" value="Others" {...register("gender")} />
            <label>Others</label>
          </div>
        </div>
        {formErrors?.gender && (
          <span className={styles.error_msg}>{formErrors.gender}</span>
        )}
      </div>
      <div className={styles.form_field}>
        <label htmlFor="resume" className={styles.upload_btn}>
          Upload Resume
        </label>
        <input
          id="resume"
          type="file"
          {...register("resume", {
            required: { value: true, message: "Please upload resume" },
          })}
          hidden
        />
        {formErrors?.resume && (
          <span className={styles.error_msg}>{formErrors.resume}</span>
        )}
      </div>
      <div className={styles.terms}>
        <div>
          <input
            type="checkbox"
            value="true"
            {...register("terms", {
              required: {
                value: true,
                message: "Please agree terms and conditions",
              },
            })}
          />
          <label>Agree Terms And Conditions</label>
        </div>
        {formErrors?.terms && (
          <span className={styles.error_msg}>{formErrors.terms}</span>
        )}
      </div>
      <div className={styles.form_btn}>
        <button onClick={handleSubmit(onSubmit, onError)}>Submit</button>
        <button onClick={reset}>Reset</button>
        <button onClick={() => resetField("dob")}>Reset Field</button>
        <button onClick={() => setCount(count + 1)}>Render {count}</button>
      </div>
    </div>
  );
};

export default Demo;
