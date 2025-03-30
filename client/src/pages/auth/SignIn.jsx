import "./form.css";

import { useEffect, useState, useCallback } from "react";
import { useToast } from "../../contexts/ToastContext";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../apiWrapper";

const SignIn = () => {
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [isLoading, setIsloading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const handleLoginInput = useCallback((e) => {
    const { name, value } = e.target;
    setLoginInput((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsloading(true);
      const response = await API.post(`/auth/sign-in`, { ...loginInput });
      toast.success(response?.data?.message);
      setLoginInput("");
      localStorage.setItem("user", JSON.stringify(response?.data.userId));
      // Redirect to dashboard
      navigate("/");
    } catch (err) {
      console.log(err?.response.data.error);
      toast.error(err?.response?.data?.error?.message || err.message);
    } finally {
      setIsloading(false);
    }
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
