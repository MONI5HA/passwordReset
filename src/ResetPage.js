import React, { useState } from "react";

import { useLocation } from "react-router-dom";

const ResetPage = () => {
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const location = useLocation();
  console.log(location.pathname);

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const userdetails = {
        password: pass,
        confirmPassword: confirmPass,
      };

      if (!pass || !confirmPass) {
        setError(true);
        setMsg("Fields cannot be blank");
      } else if (pass !== confirmPass) {
        setError(true);
        setMsg("password and confirm password must be same");
      } else {
        console.log(
          `https://user-password-reset-flow.herokuapp.com/${location.pathname}`
        );
        const res = await fetch(
          `https://user-password-reset-flow.herokuapp.com${location.pathname}`,
          {
            method: "PATCH",
            body: JSON.stringify(userdetails),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          }
        );

        if (!res.ok) throw new Error(`${res.status}`);

        const data = await res.json();
        // console.log(data.newUser);
        if (data) setSuccess(true);
        setPass("");
        setConfirmPass("");
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
            Change your Password{" "}
          </h1>

          <form onSubmit={handleRegistration}>
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
              <button
                className="text-white bg-blue-500 self-start px-5 py-2 mr-2 rounded-md font-medium"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
          {success && (
            <h1 className="w-full mt-5"> Changed Successfully! Login now </h1>
          )}
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

export default ResetPage;
