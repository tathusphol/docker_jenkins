import React, { useState, useEffect, useRef } from "react";
import HamburgerNav from "../component/Hamburger";
import axios from "axios";
import path from "../../path";

function Create_Activity() {
  const [user, setUser] = useState();
  const inputFile = useRef(null);
  const [image, setImage] = useState();
  const [activity, setActivity] = useState("");
  const [minn, setMinn] = useState("");
  const [maxx, setMaxx] = useState("");
  const [start, setStart] = useState("");
  const [stop, setStop] = useState("");
  const [location, setLocation] = useState("");
  const [about, setAbout] = useState("");
  const [goal, setGoal] = useState("");
  useEffect(() => {
    axios
      .post(`${path}/user`, { user_id: localStorage.getItem("user") })
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleChange(e) {
    setImage(e.target.files[0]);
  }

  function InsertActivity() {
    console.log(image);
    const formData = new FormData();
    formData.append("img_activity", image);
    formData.append("topic", activity);
    formData.append("description", about);
    formData.append("start", start);
    formData.append("stop", stop);
    formData.append("min", minn);
    formData.append("max", maxx);
    formData.append("goal", goal);
    formData.append("position", location);
    axios
      .post(`${path}/activity`, formData)
      .then((response) => {
        if (response.data == "success") {
          window.location.replace("/Activity");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <div className="py-2 bg-[#FD7D61]">
        <div>
          <p className="text-3xl text-white font-bold text-center">Created Activity</p>
        </div>
      </div>
      <div className="space-y-4 px-10 pt-10">
        <div className="space-y-2">
          <p>Activity Name :</p>
          <input
            className="shadow appearance-none text-sm border rounded-lg w-full py-2 px-3 text-[#6D6A6A] border-[#6C6A6A] leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            onChange={(e) => {
              setActivity(e.target.value);
            }}
          />
        </div>
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p>Minimum People :</p>
              <input
                onChange={(e) => {
                  setMinn(e.target.value);
                }}
                className="shadow appearance-none text-sm border rounded-lg w-full py-2 px-3 text-[#6D6A6A] border-[#6C6A6A] leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="0"
              />
            </div>
            <div>
              <p>Maximum People :</p>
              <input
                onChange={(e) => {
                  setMaxx(e.target.value);
                }}
                className="shadow appearance-none text-sm border rounded-lg w-full py-2 px-3 text-[#6D6A6A] border-[#6C6A6A] leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="0"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p>Start Day :</p>
              <input
                onChange={(e) => {
                  setStart(e.target.value);
                }}
                className="shadow appearance-none text-sm border rounded-lg w-full py-2 px-3 text-[#6D6A6A] border-[#6C6A6A] leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="2023-01-30"
              />
            </div>
            <div>
              <p>Stop Day :</p>
              <input
                onChange={(e) => {
                  setStop(e.target.value);
                }}
                className="shadow appearance-none text-sm border rounded-lg w-full py-2 px-3 text-[#6D6A6A] border-[#6C6A6A] leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="2023-01-30"
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <p>Location :</p>
          <input
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            className="shadow appearance-none text-sm border rounded-lg w-full py-2 px-3 text-[#6D6A6A] border-[#6C6A6A] leading-tight focus:outline-none focus:shadow-outline"
            type="text"
          />
        </div>
        <div className="space-y-2">
          <p>About :</p>
          <input
            onChange={(e) => {
              setAbout(e.target.value);
            }}
            className="shadow appearance-none text-sm border rounded-lg w-full py-2 px-3 text-[#6D6A6A] border-[#6C6A6A] leading-tight focus:outline-none focus:shadow-outline"
            type="text"
          />
        </div>
        <div className="space-y-2">
          <p>Goal :</p>
          <input
            onChange={(e) => {
              setGoal(e.target.value);
            }}
            className="shadow appearance-none text-sm border rounded-lg w-full py-2 px-3 text-[#6D6A6A] border-[#6C6A6A] leading-tight focus:outline-none focus:shadow-outline"
            type="text"
          />
        </div>
      </div>
      <div className="pt-10 px-10">
        <p>Upload Picture: </p>
        <div className="flex justify-center mt-5">
          <input
            className="hidden"
            type="file"
            onChange={(e) => handleChange(e)}
            ref={inputFile}
          />
          <button
            onClick={() => inputFile.current.click()}
            className="w-40 py-2 text-center bg-[#FD7D61] rounded-lg text-white"
          >
            Upload
          </button>
        </div>
        <button
          onClick={() => {
            window.location.replace('/Activity')
          }}
          className="w-full bg-red-500 rounded-lg py-2 text-white mt-10"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            InsertActivity();
          }}
          className="w-full bg-[#FD7D61] rounded-lg py-2 text-white mt-3"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
export default Create_Activity;
