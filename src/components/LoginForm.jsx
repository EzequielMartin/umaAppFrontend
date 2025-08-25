import React, { useState } from "react";
import loginService from "../services/login";
import umasService from "../services/umas";
import { Eye, EyeClosed } from "lucide-react";

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedUmaappUser", JSON.stringify(user));
      umasService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-4">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="username" className="font-semibold">
            Username
          </label>
          <input
            type="text"
            value={username}
            id="username"
            name="username"
            className="border w-64 p-1 mb-2 rounded"
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />

          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <div className="relative w-64">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              id="password"
              name="password"
              className="border w-64 p-1 mb-2 pr-8 rounded"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1.5 text-sm"
            >
              {showPassword ? <Eye /> : <EyeClosed />}
            </button>
          </div>
          <button
            type="submit"
            className="w-32 mt-4 font-bold text-center px-4 py-2 text-black dark:text-white rounded bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100 dark:from-gray-600 dark:via-gray-700 dark:to-gray-800 hover:from-gray-400 hover:via-gray-300 hover:to-gray-200 hover:dark:from-gray-700 hover:dark:via-gray-800 hover:dark:to-gray-900 shadow-lg"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
