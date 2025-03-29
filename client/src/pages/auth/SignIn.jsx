import "./form.css";

import { useEffect, useState, useCallback } from "react";
import { useToast } from "../../contexts/ToastContext";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [isLoading, setIsloading] = useState(false);
  const toast = useToast();

  const handleLoginInput = useCallback((e) => {
    const { name, value } = e.target;
    setLoginInput((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="login-container form-container">
      <div className="form-wrapper">
        <form onSubmit={handleFormSubmit}>
          <div className="form-info">
            <h2>Sign In !</h2>
            <p>
              Are you new here?
              <Link to="/account/sign-up">SignUp</Link>
            </p>
          </div>

          <div className="form-section">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder="Enter email"
                value={loginInput.email}
                name="email"
                onChange={handleLoginInput}
                required
                autoComplete="on"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>

              <input
                type="password"
                placeholder="Enter password"
                value={loginInput.password}
                name="password"
                onChange={handleLoginInput}
                required
                autoComplete="off"
              />
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Checking..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
