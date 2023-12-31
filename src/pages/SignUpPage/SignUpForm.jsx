import { useState } from "react";
import { signUp } from "../../utilities/users-service";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { userAtom } from "../../utilities/userContext";

export default function SignUpForm() {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPW: "",
    errorMessage: "",
  });
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newUser.password !== newUser.confirmPW) {
      setNewUser({
        ...newUser,
        errorMessage: "Passwords do not match.",
      });
      return;
    }

    try {
      const formData = { ...newUser };
      delete formData.errorMessage;
      delete formData.confirmPW;
      const user = await signUp(formData);
      setUser(user);
    } catch (err) {
      setNewUser({
        ...newUser,
        errorMessage: "Sign Up Failed. Please Try Again.",
      });
      console.log(err.message);
    }
  };

  const disable =
    newUser.firstName === "" ||
    newUser.lastName === "" ||
    newUser.email === "" ||
    newUser.password === "" ||
    newUser.confirmPW === "";

  return (
    <form
      className="uk-form-stacked uk-padding"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div className="uk-margin">
        <label className="uk-form-label" htmlFor="firstName">
          First Name
        </label>
        <div className="uk-form-controls">
          <input
            className="uk-input"
            type="text"
            id="firstName"
            name="firstName"
            value={newUser.firstName}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="uk-margin">
        <label className="uk-form-label" htmlFor="lastName">
          Last Name
        </label>
        <div className="uk-form-controls">
          <input
            className="uk-input"
            type="text"
            id="lastName"
            name="lastName"
            value={newUser.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="uk-margin">
        <label className="uk-form-label" htmlFor="email">
          Email
        </label>
        <div className="uk-form-controls">
          <input
            className="uk-input"
            type="email"
            id="email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="uk-margin">
        <label className="uk-form-label" htmlFor="password">
          Password
        </label>
        <div className="uk-form-controls">
          <input
            className="uk-input"
            type="password"
            id="password"
            name="password"
            value={newUser.password}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="uk-margin">
        <label className="uk-form-label" htmlFor="confirmPW">
          Confirm Password
        </label>
        <div className="uk-form-controls">
          <input
            className="uk-input"
            type="password"
            id="confirmPW"
            name="confirmPW"
            value={newUser.confirmPW}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <button
        className="uk-button uk-button-secondary uk-align-center"
        type="submit"
        disabled={disable}
      >
        Sign Up
      </button>
      <p className="uk-text-center uk-text-meta uk-text-danger">
        {newUser.errorMessage}
      </p>
    </form>
  );
}
