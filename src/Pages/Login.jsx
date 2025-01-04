import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdVisibility, MdVisibilityOff } from "react-icons/md"; // Import icons
import { toast } from "react-hot-toast"; // Import toast
import { authContext } from "../provider/Provider";

export default function Login() {
  const { userLogin, setUser, googleLogin, setTempEmail } = useContext(authContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); 


  const handleGoogleLogin = () => {
    googleLogin()
      .then((res) => {
        setUser(res.user);
        toast.success("Logged in successfully!");
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        setError(err.code);
        toast.error("Failed to log in with Google.");
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;


    setTempEmail(email);

    userLogin(email, password)
      .then((res) => {
        setUser(res.user);
        toast.success("Logged in successfully!");
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        setError(err.code);
        toast.error("Login failed. Please check your credentials.");
      });
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"} // Toggle input type
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-10"
                  onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                >
                  {showPassword ? (
                    <MdVisibilityOff size={20} />
                  ) : (
                    <MdVisibility size={20} />
                  )}
                </button>
              </div>

              <label className="label">
                <Link to={"/"} className="label-text-alt link link-hover">
                  Forgot password?
                </Link>
              </label>

              <div>
                <p className="font-semibold">Social Logins</p>
                <button
                  onClick={handleGoogleLogin}
                  type="button"
                  className="btn mt-5 flex items-center justify-center"
                >
                  <img
                    className="w-[20px] mr-2"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png"
                    alt=""
                  />
                  Continue with Google
                </button>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>

            <p className="font-semibold text-center p-4">
              Don't have an account?{" "}
              <Link className="text-red-500 font-bold" to="/register">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
