import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Loginpage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!email || !pass) {
        setError(true);
      } else {
        const userdetails = {
          email,
          password: pass,
        };
        const res = await fetch(
          "https://user-password-reset-flow.herokuapp.com/api/v1/users/login",
          {
            method: "POST",
            body: JSON.stringify(userdetails),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          }
        );

        if (!res.ok) throw new Error(`${res.status}`);

        const data = await res.json();
        console.log(data.user.email);
        // dispatch(setUserEmail(data.user.email));
        navigate("/home");
        setError(false);
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="flex flex-col justify-center items-center  p-9 rounded-md shadow-lg border ">
        <h1 className="text-left text-3xl mb-2">Sign In</h1>
        <h2 className="text-left  mb-7">to continue to Account</h2>
        <form onSubmit={handleLogin}>
          <div className="border border-slate-300 rounded-md p-3 flex justify-between  focus-visible:outline-none focus-within:border-blue-500">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              className=" border-0 focus:border-blue-500   focus-visible:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="border  border-slate-300 rounded-md p-3 flex justify-between  focus-visible:outline-none focus-within:border-blue-500 mt-4">
            <input
              type="password"
              name="email"
              id="email"
              placeholder="Password"
              className=" border-0 focus:border-blue-500   focus-visible:outline-none"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>

          <div className="h-1 w-full mt-1">
            {error && (
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-red-600 font-semibold">
                  Please provide valid email and password length greater than 5
                </span>
              </div>
            )}
          </div>
          <Link to="/forget">
            <button className="text-sm text-blue-500 font-semibold mt-2">
              Forgot email ?
            </button>
          </Link>
          <h1 className="mt-8 font-md">
            Provide your Email which was used in registration
          </h1>

          <div className="mt-10 flex justify-between">
            <Link to="/register">
              <button className="text-blue-500 font-semibold">
                Create account
              </button>
            </Link>
            <button
              type="submit"
              className="text-white bg-blue-500 self-start px-5 py-2 mr-2 rounded-md font-medium"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Loginpage;
