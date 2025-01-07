import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast'; // Import React Hot Toast
import { authContext } from '../provider/Provider';

export default function Registration() {
  const { createUserProfile, setUser, updateUserProfile } = useContext(authContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const passwordValidation = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return regex.test(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photoURL.value;
    const password = e.target.password.value;

    // Password Validation
    if (!passwordValidation(password)) {
      setPasswordError(
        "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
      );
      return;
    }
    setPasswordError("");

    createUserProfile(email, password)
      .then((res) => {
        setUser(res.user);
        updateUserProfile({ displayName: name, photoURL: photoURL })
          .then(() => {
            toast.success('Successfully Registered!'); // Show success toast
            navigate("/");
          })
          .catch((err) => {
            setError(err.code);
          });
      })
      .catch((err) => {
        setError(err.code);
        toast.error("Registration failed. Please try again."); // Show error toast
      });
  };

  return (
    <div>
      <div className="hero bg-gradient-to-r from-purple-800 to-purple-600 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          {/* Back to Home Button */}
          <Link 
            to="/" 
            className="absolute -top-3 left-0  md:top-5 md:left-5 btn btn-ghost text-xl text-white hover:text-gray-200"
          >
            &#8592; Back to Home
          </Link>

          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-xl p-6 rounded-lg">
            <form onSubmit={handleRegister} className="card-body">
              <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Register</h2>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-gray-700">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-gray-700">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-gray-700">Photo URL</span>
                </label>
                <input
                  type="text"
                  name="photoURL"
                  placeholder="Photo URL"
                  className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text text-gray-700">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    className="input input-bordered w-full rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  >
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </span>
                </div>
                {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary w-full text-white rounded-lg shadow-md">
                  Register
                </button>
              </div>
            </form>

            <p className="font-semibold text-center text-gray-700 mt-4">
              Already have an account?{' '}
              <Link className="text-red-500 font-bold hover:underline" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
