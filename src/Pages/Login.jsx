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
      <div className="hero  bg-gradient-to-r from-purple-800 to-purple-600 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          
          {/* Back to Home Button */}
          <Link 
            to="/" 
            className="absolute  -top-3 left-0  md:top-5 md:left-5 btn btn-ghost text-xl text-white hover:text-gray-200"
          >
            &#8592; Back to Home
          </Link>

          <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-xl p-6 rounded-lg">
            <form onSubmit={handleLogin} className="card-body">
              <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-gray-700">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="form-control relative mb-6">
                <label className="label">
                  <span className="label-text text-gray-700">Password</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"} // Toggle input type
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-10 text-gray-600"
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
                <Link to={"/"} className="label-text-alt text-blue-500 hover:underline">
                  Forgot password?
                </Link>
              </label>

              <div className="mb-4 text-center">
                <p className="font-semibold text-gray-700">Social Logins</p>
                <button
                  onClick={handleGoogleLogin}
                  type="button"
                  className="btn mt-5 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md"
                >
                  <img
                    className="w-[20px] mr-2"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png"
                    alt="Google logo"
                  />
                  Continue with Google
                </button>
              </div>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary w-full text-white rounded-lg shadow-md">
                  Login
                </button>
              </div>
            </form>

            <p className="font-semibold text-center text-gray-700 mt-4">
              Don't have an account?{" "}
              <Link className="text-red-500 font-bold hover:underline" to="/register">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
