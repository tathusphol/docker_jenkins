import React, { useState, useEffect } from "react";
import Calendar from "../assets/calendar.svg";
import Position from "../assets/position.svg";
import AdminPlus from "../assets/adminplus.svg";
import HamburgerNav from "../component/Hamburger";
import axios from "axios";
import path from "../../path";
import { Link } from "react-router-dom";
function Activity() {
  const [user, setUser] = useState();
  const [activity, setActivity] = useState();

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
      .get(`${path}/activity`)
      .then((response) => {
        setActivity(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function RenderImage(img) {
    if (img) {
      return `${path}${img}`;
    }
  }

  function RenderActivity(props) {
    const url = "/Activity_detail/" + props.data.a_id;
    return (
      <Link to={url}>
        <div className="rounded-md col-span-1 roundec-md shadow-md py-2">
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
  return (
    <div className="min-h-screen pb-10">
      <div className="absolute top-0">
        {user && <HamburgerNav user={user} />}
      </div>
      <div className="py-2 bg-[#FD7D61]">
        <div>
          <p className="text-3xl text-white font-bold text-center">Activity</p>
        </div>
        {user && user.role == "Charity" && (
          <Link to="/create" className="absolute top-3 right-4 w-7">
            <img src={AdminPlus} alt="" />
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 px-4 gap-4 mt-5">
        {activity &&
          activity.map((value, index) => {
            return <RenderActivity data={value} index={index} key={index} />;
          })}
      </div>
    </div>
  );
}
export default Activity;
