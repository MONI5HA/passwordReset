import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const userdetails = {
        email: mail,
        password: pass,
        confirmPassword: confirmPass,
      };

      if (!mail || !pass || !confirmPass) {
        setError(true);
        setMsg("Fields cannot be blank");
      } else if (pass !== confirmPass) {
        setError(true);
        setMsg("password and confirm password must be same");
      } else {
        const res = await fetch(
          "https://user-password-reset-flow.herokuapp.com/api/v1/users/signup",
          {
            method: "POST",
            body: JSON.stringify(userdetails),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          }
        );

        if (!res.ok) throw new Error(`${res.status}`);

        const data = await res.json();

        if (data) navigate("/home");
        setError(false);
      }
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="flex shadow-lg border">
        <div className="flex flex-col justify-center items-center  p-9 rounded-md  ">
          <h1 className="text-left w-full text-3xl mb-2">
            Create your Account{" "}
          </h1>

          <form onSubmit={handleRegistration}>
            <div className="border border-slate-300 rounded-md p-1 flex justify-between mr-2 focus-visible:outline-none focus-within:border-blue-500">
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Username"
                className=" border-0 focus-visible:outline-none "
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
            </div>
            <span className="text-xs inline mb-7">
              You can use letters, numbers & periods
            </span>
            <div className="mt-4">
              <input
                type="password"
                name="pass"
                id="pass"
                placeholder="Password"
                className="border mr-2 rounded-md p-1 focus:border-blue-500   focus-visible:outline-none border-slate-300"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
              <input
                type="password"
                name="confirm"
                id="confirm"
                placeholder="Confirm"
                className="border mr-2 rounded-md p-1 focus:border-blue-500   focus-visible:outline-none border-slate-300"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
            </div>
            <span className="text-xs">
              Use 8 or more characters with a mix of letters, numbers & symbols
            </span>

            <div className="h-3 w-full mt-1">
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
                  <span className="text-red-600 font-semibold text-sm">
                    {msg}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-10 flex justify-between">
              <Link to="/login">
                <button className="text-blue-500 font-semibold">
                  Sign in instead
                </button>
              </Link>
              <button
                className="text-white bg-blue-500 self-start px-5 py-2 mr-2 rounded-md font-medium"
                type="submit"
              >
                Create
              </button>
            </div>
          </form>
        </div>
        <div className="flex flex-col items-center justify-center">
          <img
            className="inline w-56"
            src="https://ssl.gstatic.com/accounts/signup/glif/account.svg"
            alt="mail suite"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
