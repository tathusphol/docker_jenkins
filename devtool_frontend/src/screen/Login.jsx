import React, { useState } from "react";
import Logo from "../assets/logo.svg";
import P_small from "../assets/profilesmall.svg";
import { Link } from "react-router-dom";
import path from "../../path";
import axios from "axios";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function LoginState() {
    axios
      .post(`${path}/login`, { email: email, password: password })
      .then((response) => {
        if(response.data != "error"){
            localStorage.setItem("user", response.data);
            return window.location.replace("/Activity");
        }
        else{
            alert("Username or Password is wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="min-h-screen bg-[#F6F6F6] px-4 py-2">
      <div>
        <div className="flex items-center space-x-2">
          <p className="font-bold">Login</p>
          <img src={P_small} alt="" />
        </div>
        <p className="text-[#5B5B5B]">Welcome back </p>
      </div>
      <div className="flex justify-center items-center">
        <div className="mt-24">
          <div className="flex justify-center">
            <img src={Logo} alt="" />
          </div>
          <div className="mt-24">
            <div className="mb-4">
              <input
                className="shadow appearance-none text-sm border rounded-lg w-72 py-2 px-3 text-[#6D6A6A] border-[#6C6A6A] leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="mb-2">
              <input
                className="shadow appearance-none text-sm border rounded-lg w-72 py-2 px-3 text-[#6D6A6A] border-[#6C6A6A] leading-tight focus:outline-none focus:shadow-outline"
                id="Password"
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <p className="text-right text-[#FF1E1E] text-xs">
              Forget Password ?
            </p>
            <div className="mt-10">
              <button
                onClick={() => LoginState()}
                className="bg-[#FD7D61] w-full py-2 text-center rounded-lg text-white"
              >
                Login
              </button>
            </div>
            <p className="text-xs text-center mt-5">
              Not register yet ? 
              <Link to="/Signup" style={{ color: "#FF1E1E" }}>
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
