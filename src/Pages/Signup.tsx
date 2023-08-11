import React, { useState } from "react";
import { useCookies } from "react-cookie";
const Signup = () => {
  const [cookie, setCookie, removeCookie] = useCookies();
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  console.log(email, password, confirmPassword);
  console.log(cookie);

  const handleSubmit = async (e: any, endpoint: any) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      setError("Make sure password match!");
      return;
    }
    const response = await fetch(
      `${process.env.REACT_APP_SERVERURL}/${endpoint}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await response.json();

    if (data.detail) {
      console.log("Data", data);
      setError(data.detail);
    } else {
      setCookie("Email", data.email);
      setCookie("AuthToken", data.token);
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-row w-100 min-h-screen bg-white">
      <div className="w-[100%] sm:flex hidden">
        <img
          src={`open.jpg`}
          alt="Signup"
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="bg-white w-full flex p-8 justify-center items-center ">
        <div className="md:col-span-1">
          <h2 className="text-3xl font-semibold  text-center text-gray-800 mb-[5rem]">
            Reminder app
          </h2>
          <h2 className="text-xl font-semibold  text-center text-gray-800 mb-4">
            {isLogin ? "Login" : "Signup"}
          </h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            )}
            {error && <p>{error}</p>}
            <div>
              {isLogin ? (
                <button
                  onClick={(e) => handleSubmit(e, "login")}
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  Login
                </button>
              ) : (
                <button
                  onClick={(e) => handleSubmit(e, "signup")}
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  Get Started
                </button>
              )}
            </div>
          </form>
          <p className="mt-4 text-center text-gray-600 flex">
            {isLogin ? "Don't have an account? " : "Already have an account?"}

            <span
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-500 ml-2 cursor-pointer"
            >
              {!isLogin ? "Log in" : "Sign up"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
