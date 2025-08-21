import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../../api/api";
import { type GenericResponseType } from "../../types/genricResponse.types";
import type { LoginResponse } from "../../types/loginResponse.types";
import { type LoginRequest } from "../../types/loginRequest.types";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/slice/UserDateSlice";
import { setJwt } from "../../redux/slice/UserJwtSlice";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const naviagate = useNavigate()
  const dispatch = useDispatch();

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    post<LoginRequest, GenericResponseType<LoginResponse>>("/api/user/login", { email, password })
      .then((response) => {
        console.log("from outer", response)
        if (response.data) {
          console.log("response data is",response.data)
          dispatch(setUserData(response.data.user))
          dispatch(setJwt(response.data.authToken))
         naviagate('/')
        } else {
          setErrorMessage(response.message);
          console.log(`response is ${response.data} and ${response.statusCode}`)
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-center text-gray-700">Login</h2>
        <form className="my-4 space-y-6" onSubmit={handleSubmit}>
          <label htmlFor="email" className="block text-sm mb-1 font-medium text-gray-600">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="my-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />

          <label htmlFor="password" className="block mt-4 mb-1 text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="my-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />

          {errorMessage && (
            <p className="text-sm my-2 text-red-500 mt-2">{errorMessage}</p>
          )}

          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-yellow-400 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
            >
              Log In
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-yellow-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
