import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/authContext";
import { doCreateUserWithEmailAndPassword } from "../../../firebase/auth";
import { CardTitle } from "../../../shadCn/components/card";
import { Button } from "../../../shadCn/components/button";
import { Input } from "../../../shadCn/components/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { userLoggedIn } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);
      await doCreateUserWithEmailAndPassword(email, password);
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}

      <main className="w-full  flex self-center place-content-center place-items-center">
        <div className="w-96 text-secondary-600 space-y-5 p-4 shadow-xl border rounded-xl">
          <div className="text-center mb-6">
            <div className="mt-2">
              <CardTitle>
                <h3 className="text-foreground text-xl font-semibold sm:text-2xl">
                  Create a New Account
                </h3>
              </CardTitle>
            </div>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-secondary-500">Email</label>
              <Input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-full mt-2 px-3 py-2 text-secondary-500 bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
              />
            </div>

            <div>
              <label className="text-sm text-secondary-500">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  className={"hide-password-toggle pr-10"}
                  required
                  disabled={isRegistering}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeIcon className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>

                {/* hides browsers password toggles */}
                <style>{`
          .hide-password-toggle::-ms-reveal,
          .hide-password-toggle::-ms-clear {
            visibility: hidden;
            pointer-events: none;
            display: none;
          }
        `}</style>
              </div>
              {/* <Input
                disabled={isRegistering}
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className=""
              /> */}
            </div>

            <div>
              <label className="text-sm text-secondary-500">
                Confirm Password
              </label>
              <Input
                disabled={isRegistering}
                type="password"
                autoComplete="off"
                required
                value={confirmPassword}
                onChange={(e) => {
                  setconfirmPassword(e.target.value);
                }}
                className=""
              />
            </div>

            {errorMessage && (
              <span className="text-red-500">{errorMessage}</span>
            )}

            <Button
              type="submit"
              disabled={isRegistering}
              className={`w-full px-4 py-2 text-white font-medium rounded-lg ${
                isRegistering
                  ? "bg-secondary-300 cursor-not-allowed"
                  : " hover:shadow-xl transition duration-300"
              }`}
            >
              {isRegistering ? "Signing Up..." : "Sign Up"}
            </Button>
            <div className="text-sm text-center">
              Already have an account? {"   "}
              <Link
                to={"/login"}
                className="text-center text-sm hover:underline font-bold"
              >
                Continue
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Register;
