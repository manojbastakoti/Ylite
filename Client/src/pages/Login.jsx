import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
const BASE_URL = "http://localhost:8000/";

const Login = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [passwordPreview, setPasswordPreview] = useState(false);

  const { profile, setProfile } = useContext(UserContext);

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    for (const key in input) {
      if (input[key] === "") {
        setError("All fields are required!");
        return false;
      }
    }
    try {
      const response = await axios({
        method: "post",
        url: BASE_URL + "login",
        data: input,
        withCredentials: true,
      });

      const data = response.data;
      console.log("normal", data);

      setProfile({
        user_id: data.data.user_id,
        name: data.data.name,
        email: data.data.email,
        role: data.data.role,
        token: data.data.token,
      });

      if (data.success) {
        toast.success(response.data.message, {
          theme: "colored",
        });
      }

      navigate("/");
    } catch (error) {
      // toast.error(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <form
      className="pt-10 max-w-md mt-10 mx-auto rounded-md dark:bg-[#252525] "
      onSubmit={loginUser}
    >
      <h1 className="text-3xl font-bold mb-4 text-center text-orange-600">
        Login
      </h1>
      <input
        className="block w-[90%] mx-auto px-3 py-3 rounded-md outline-none mb-3 dark:bg-gray-700 dark:text-white"
        name="email"
        type="text"
        placeholder="Email"
        value={input.email}
        onChange={(e) =>
          setInput((prev) => ({
            email: e.target.value,
            password: prev.password,
          }))
        }
      />
      <div className="input-control relative">
        <input
          className="block w-[90%] mx-auto px-3 py-3 rounded-md outline-none mb-3 dark:bg-gray-700 dark:text-white"
          name="password"
          type={passwordPreview ? "text" : "password"}
          placeholder="Password"
          value={input.password}
          onChange={(e) =>
            setInput((prev) => ({
              email: prev.email,
              password: e.target.value,
            }))
          }
        />
        <div
          className="icon absolute top-3 right-10 cursor-pointer"
          onClick={() => setPasswordPreview(!passwordPreview)}
        >
          {passwordPreview ? (
            <i className="fa-solid fa-eye text-sm"></i>
          ) : (
            <i className="fa-solid fa-eye-slash text-sm"></i>
          )}
        </div>
      </div>
      <div className="error-box pl-5">
        <p className="text-red-500 font-semibold text-sm">
          {error ? error : ""}
        </p>
      </div>
      <div className="grid place-items-center">
        <button
          type="submit"
          className="block w-[90%] mb-2 mt-1 mx-auto px-3 py-3 rounded-md bg-orange-600 hover:bg-orange-700 hover:font-semibold dark:text-white"
        >
          Login
        </button>
        <p className=" dark:text-white mt-3 mb-3">
          New Here?{" "}
          <Link to="/register">
            <span className="text-orange-600">Register</span>
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
