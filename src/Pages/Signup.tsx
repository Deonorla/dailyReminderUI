import React, { useState } from "react";
import { useCookies } from "react-cookie";
const Signup = () => {
  const [cookie, setCookie, removeCookie] = useCookies();
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  console.log(email, password, phoneNumber);
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
        body: JSON.stringify({ email, password, phoneNumber }),
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
    <div className="flex flex-row w-100 min-h-screen bg-[#C5D2E4]">
      <div className="w-[100%] sm:flex sm:justify-center sm:items-center  hidden">
        <img
          src={`logo.png`}
          alt=""
          className="w-[7rem] absolute top-6 left-4 flex md:hidden"
        />
        <div className="relative mt-[9rem]">
          <img
            className="absolute left-[-10rem]  top-[-15rem]"
            src={`icon1.png`}
            alt=""
          />
          <img
            className="absolute right-[-10rem]  top-[-18rem]"
            src={`icon1.png`}
            alt=""
          />
          <img
            src={`icon2.png`}
            alt=""
            className="md:w-[15rem] md:ml-[4rem] xl:w-full "
          />
        </div>
      </div>
      <div className="bg-[#7E9AB7] md:m-[5rem] md:rounded-lg md:w-full xl:w-[60%]  w-full flex p-8 justify-center items-center ">
        <img
          src={`logo.png`}
          alt=""
          className="w-[7rem] absolute top-6 left-4 "
        />
        <div className="">
          <div className="  md:col-span-1">
            <h2 className="md:text-3xl text-xl  font-semibold text-white text-center mb-[1rem] md:mb-[3rem]">
              {isLogin ? "Welcome Back" : "Create Your account"}
            </h2>
            {/* <h2 className="text-xl font-semibold  text-center text-gray-800 mb-4">
              {isLogin ? "Login" : "Signup"}
            </h2> */}

            <form className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium  mb-1">
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
                <label className="block text-sm font-medium text-white mb-1">
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
                  <label className="block text-sm font-medium text-white mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
                    required
                  />
                  <label className="block text-sm font-medium text-white mt-6 mb-2 ">
                    Enter phoneNumber
                  </label>
                  <input
                    name="phoneNumber"
                    placeholder="Enter your phone number"
                    className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
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
                    className="w-full bg-[#0682C8] text-white py-2 px-4 rounded-md hover:bg-[#5487a4]] focus:outline-none"
                  >
                    Get Started
                  </button>
                )}
              </div>
            </form>
            <p className="mt-4 text-center text-white flex">
              {isLogin ? "Don't have an account? " : "Already have an account?"}

              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-800 ml-2 cursor-pointer hover:text-blue-500"
              >
                {!isLogin ? "Log in" : "Sign up"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
