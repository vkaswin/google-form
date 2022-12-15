import { useState } from "react";
import useForm from "hooks/useForm";

import styles from "./Demo.module.scss";

const Demo = () => {
  const { register, handleSubmit, formErrors } = useForm();
  console.log(formErrors);

  const [value, setValue] = useState(0);

  const onSubmit = (formValues: object) => {
    console.log(formValues);
  };

  const onError = (error: object) => {
    // console.log(error);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_field}>
        <label className="form-label">Name</label>
        <input
          type="text"
          placeholder="Enter Name"
          {...register("name", {
            required: { value: true, message: "Please enter name" },
            minLength: {
              value: 3,
              message: "Name should contain atleast 3 characters",
            },
          })}
        />
        {formErrors?.name && (
          <span className={styles.error_msg}>{formErrors.name}</span>
        )}
      </div>
      <div className={styles.form_field}>
        <label className="form-label">Email ID</label>
        <input
          type="text"
          placeholder="Enter email"
          {...register("email", {
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
        <label className="form-label">Phone Number</label>
        <input
          type="number"
          placeholder="Enter phone number"
          {...register("phone", {
            required: { value: true, message: "Please enter phone number" },
            minLength: {
              value: 10,
              message: "Phone number should contains 10 digits",
            },
            maxLength: {
              value: 10,
              message: "Phone number should not be greater than 10 digits",
            },
          })}
        />
        {formErrors?.phone && (
          <span className={styles.error_msg}>{formErrors.phone}</span>
        )}
      </div>
      <div className={styles.form_field}>
        <label className="form-label">Date of Birth</label>
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
        <label className="form-label">State</label>
        <select
          defaultValue=""
          {...register("state", {
            required: { value: true, message: "Please select any one state" },
          })}
        >
          <option value="" disabled>
            Select State
          </option>
          <option>Chennai</option>
          <option>Hyderabad</option>
          <option>Mumbai</option>
          <option>Delhi</option>
          <option>Pune</option>
        </select>
        {formErrors?.state && (
          <span className={styles.error_msg}>{formErrors.state}</span>
        )}
      </div>
      <div className={styles.form_field}>
        <label>Hobbies</label>
        <fieldset
          className={styles.options}
          {...register("hobbies", {
            required: { value: true, message: "Please select any one hobbies" },
          })}
        >
          <div>
            <input type="checkbox" value="Cricket" />
            <label>Cricket</label>
          </div>
          <div>
            <input type="checkbox" value="BasketBall" />
            <label>BasketBall</label>
          </div>
          <div>
            <input type="checkbox" value="Football" />
            <label>FootBall</label>
          </div>
          <div>
            <input type="checkbox" value="VolleyBall" />
            <label>VolleyBall</label>
          </div>
        </fieldset>
        {formErrors?.hobbies && (
          <span className={styles.error_msg}>{formErrors.hobbies}</span>
        )}
      </div>
      <div className={styles.form_field}>
        <label>Gender</label>
        <fieldset
          className={styles.options}
          {...register("gender", {
            required: { value: true, message: "Please select any gender" },
          })}
        >
          <div>
            <input type="radio" value="Male" />
            <label>Male</label>
          </div>
          <div>
            <input type="radio" value="Female" />
            <label>Female</label>
          </div>
          <div>
            <input type="radio" value="Others" />
            <label>Others</label>
          </div>
        </fieldset>
        {formErrors?.gender && (
          <span className={styles.error_msg}>{formErrors.gender}</span>
        )}
      </div>
      <div className={styles.terms}>
        <div>
          <input
            type="checkbox"
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
      <div>
        <button onClick={handleSubmit(onSubmit, onError)}>Submit</button>
      </div>
      <button onClick={() => setValue(value + 1)}>Increment</button>
      <span>{value}</span>
    </div>
  );
};

export default Demo;
