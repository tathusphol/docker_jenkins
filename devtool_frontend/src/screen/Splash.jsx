import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.svg";
function Splash() {
  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem("user") == null) {
        return window.location.replace("/Login");
      } else {
        return window.location.replace("/Activity");
      }
    }, 2000);
  }, []);

  return (
    <div className="bg-[#F6F6F6] min-h-screen flex items-center justify-center">
      <img className="w-60" src={Logo} alt="" />
    </div>
  );
}
export default Splash;
