import React, { useState } from "react";
import Logo from "../assets/logo.svg";
import P_small from "../assets/profilesmall.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import path from "../../path";

function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  function SignUpStae() {
    axios
      .post(`${path}/signup/account`, {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password1: password1,
        password2: password2,
      })
      .then((response) => {
        if (response.data == "success") {
            return window.location.replace("/Login");
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
          <p className="font-bold">Register</p>
          <img src={P_small} alt="" />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="mt-24 w-4/5">
          <div className="flex justify-center">
            <img src={Logo} alt="" />
          </div>
          <div className="mt-16">
            <div className="mb-4">
              <input
                className="shadow appearance-none text-sm border rounded-lg w-full py-2 px-3 text-[#6D6A6A] border-[#6C6A6A] leading-tight focus:outline-none focus:shadow-outline"
                id="firstname"
                type="text"
                placeholder="Firstname"
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none text-sm border rounded-lg w-full py-2 px-3 text-[#6D6A6A] border-[#6C6A6A] leading-tight focus:outline-none focus:shadow-outline"
                id="lastname"
                type="text"
                placeholder="Lastname"
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none text-sm border rounded-lg w-full py-2 px-3 text-[#6D6A6A] border-[#6C6A6A] leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none text-sm border rounded-lg w-full py-2 px-3 text-[#6D6A6A] border-[#6C6A6A] leading-tight focus:outline-none focus:shadow-outline"
                id="Password1"
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword1(e.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none text-sm border rounded-lg w-full py-2 px-3 text-[#6D6A6A] border-[#6C6A6A] leading-tight focus:outline-none focus:shadow-outline"
                id="Password2"
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => {
                  setPassword2(e.target.value);
                }}
              />
            </div>
            <div className="mt-10">
              <button
                onClick={() => {
                  SignUpStae();
                }}
                className="bg-[#FD7D61] w-full py-2 text-center rounded-lg text-white"
              >
                Sign Up
              </button>
            </div>
            <p className="text-xs text-center mt-5">
              Already have an account ?{" "}
              <Link to="/Login" style={{ color: "#FF1E1E" }}>
                Login here
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Signup;
