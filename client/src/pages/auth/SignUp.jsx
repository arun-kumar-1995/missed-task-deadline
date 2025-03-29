import "./form.css";

import { useEffect, useState, useCallback } from "react";
import { useToast } from "../../contexts/ToastContext";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formInput, setformInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsloading] = useState(false);
  const toast = useToast();

  const handleFormInput = useCallback((e) => {
    const { name, value } = e.target;
    setformInput((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="signup-container form-container">
      <div className="form-wrapper">
        <form onSubmit={handleFormSubmit}>
          <div className="form-info">
            <h2>Sign Up !</h2>
            <p>
              Already have an account?
              <Link to="/account/sign-in">SignIn</Link>
            </p>
          </div>

          <div className="form-section">
            <div className="form-group">
              <label htmlFor="fullName">Enter name</label>
              <input
                type="text"
                placeholder="First and last name"
                value={formInput.name}
                name="name"
                onChange={handleFormInput}
                required
                autoComplete="on"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Enter email</label>
              <input
                type="text"
                placeholder="Email-id@gmail.com"
                value={formInput.email}
                name="email"
                onChange={handleFormInput}
                required
                autoComplete="on"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="min 8 character"
                value={formInput.password}
                name="password"
                onChange={handleFormInput}
                required
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Re-enter Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                value={formInput.confirmPassword}
                name="confirmPassword"
                onChange={handleFormInput}
                required
                autoComplete="off"
              />
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Create account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
