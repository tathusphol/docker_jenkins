import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import HamburgerNav from "../component/Hamburger";
import path from "../../path";
import Calendar from "../assets/calendar.svg";
import Position from "../assets/position.svg";
import { Link } from "react-router-dom";

function RenderImage(img) {
  if (img) {
    return `${path}${img}`;
  }
}

function Complete() {
  const [user, setUser] = useState();
  const [allActivity, setAllActivity] = useState();
  const [myActivity, setMyActivity] = useState();

  function RenderActivity(props) {
    const url = "/Activity_detail/" + (props.index + 1);
    return (
      <Link to={url}>
        <div className="rounded-md col-span-1 roundec-md shadow-md py-4">
          <div className="flex justify-center">
            <img
              className="shadow-md rounded-md h-[200px] w-full object-cover"
              src={RenderImage(props.data.img)}
              alt=""
            />
          </div>
          <div className="px-2 space-y-2">
            <p className="font-bold text-xl mt-3">{props.data.topic}</p>
            <div className="flex items-center space-x-2 text-xs">
              <img src={Calendar} alt="" />
              <p>
                {props.data.start.slice(0, 10).replaceAll("-", "/")} -{" "}
                {props.data.stop.slice(0, 10).replaceAll("-", "/")}
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <img src={Position} alt="" />
              <p>{props.data.position}</p>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  useEffect(() => {
    axios
      .post(`${path}/user`, { user_id: localStorage.getItem("user") })
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${path}/activityall`)
      .then((response) => {
        setAllActivity(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .post(`${path}/my_activity`, { u_id: localStorage.getItem("user") })
      .then((response) => {
        let array = [];
        response.data.forEach((value) => {
          array.push(value.a_id);
        });
        setMyActivity(array);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="pb-10">
      <div className="absolute top-0">
        {user && <HamburgerNav user={user} />}
      </div>
      <div className="py-2 bg-[#FD7D61]">
        <div>
          <p className="text-3xl text-white font-bold text-center">Activity</p>
        </div>
      </div>
      <div>
        {myActivity && (
          <div className="text-center space-y-4 py-8">
            <p className="text-4xl">{myActivity.length}</p>
            <p>Activity Completed</p>
          </div>
        )}
        {allActivity &&
          myActivity &&
          allActivity.map((value, index) => {
            if (myActivity.indexOf(value.a_id) != -1) {
              return (
                <div className="px-4" key={index}>
                  <RenderActivity data={value} index={index} />
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}
export default Complete;
