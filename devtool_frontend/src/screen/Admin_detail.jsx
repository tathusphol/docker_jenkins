import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import HamburgerNav from "../component/Hamburger";
import path from "../../path";

function RenderImage(img) {
  if (img) {
    return `${path}${img}`;
  }
}

function Admin_detail() {
  let params = useParams();
  const [activity, setActivity] = useState();
  const [myActivity, setMyActivity] = useState();
  const [user, setUser] = useState();
  useEffect(() => {
    axios
      .post(`${path}/selectactivity`, { a_id: params.activityid })
      .then((response) => {
        setActivity(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .post(`${path}/user`, { user_id: localStorage.getItem("user") })
      .then((response) => {
        setUser(response.data);
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

  function Finish() {
    axios
      .post(`${path}/end/activity`, {
        a_id: activity.a_id,
      })
      .then((response) => {
        return window.location.replace("/Ongoing");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="pb-10">
      <div className="absolute top-0">
        {user && <HamburgerNav user={user} />}
      </div>
      <div className="py-2 bg-[#FD7D61]">
        <div>
          <p className="text-3xl text-white font-bold text-center">Ongoing Activity</p>
        </div>
      </div>
      {activity && (
        <div className="px-4">
          <p className="text-2xl text-center py-8">{activity.topic}</p>
          <div className="pb-4">
            <img
              className="rounded-lg"
              src={RenderImage(activity.img)}
              alt=""
            />
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-2xl font-bold pb-2">Detail</p>
              <div className="px-6">
                <div className="flex items-center space-x-2">
                  <p className="font-bold">Minimum people : </p>
                  <p>{activity.min}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="font-bold">Maximum people : </p>
                  <p>{activity.max}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="font-bold">Time : </p>
                  <p>
                    {activity.start.slice(0, 10).replaceAll("-", "/")} -{" "}
                    {activity.stop.slice(0, 10).replaceAll("-", "/")}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="font-bold">Location : </p>
                  <p>{activity.position}</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold pb-2">About</p>
              <div className="px-6">
                <p className="">{activity.description}</p>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold pb-2">Goal</p>
              <div className="px-6">
                <p>{activity.goal}</p>
              </div>
            </div>
            <button
              onClick={() => {
                Finish();
              }}
              className="w-full bg-[#FD7D61] py-2 rounded-lg text-white"
            >
              Finish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Admin_detail;
