import React, { useState, useEffect } from "react";
import axios from "axios";
import path from "../../path";
import Positionb from "../assets/positionb.svg";
import Edit from "../assets/edit.svg";
import HamburgerNav from "../component/Hamburger";
import { Link } from "react-router-dom";
function RenderImage(img) {
  if (img) {
    return `${path}${img}`;
  }
}

function Profile() {
  const [user, setUser] = useState();
  const [myActivity, setMyActivity] = useState();
  const [interest, setInterest] = useState();
  useEffect(() => {
    axios
      .post(`${path}/user`, { user_id: localStorage.getItem("user") })
      .then((response) => {
        setUser(response.data);
        setInterest(JSON.parse(response.data.interest))
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

  function RenderInterest(props) {
    return (
        <div className="w-40 h-28 flex items-center justify-center shadow-md rounded-lg bg-[#EF46371A]">
            <p className="text-sm text-center">{props.text}</p>
        </div>
    )
  }

  return (
    <div className="h-screen bg-[#EF46371A] ">
      <div className="absolute top-0">
        {user && <HamburgerNav user={user} />}
      </div>
      <div className="py-2 bg-[#FD7D61]">
        <div>
          <p className="text-3xl text-white font-bold text-center">Activity</p>
        </div>
      </div>
      {user && (
        <div className="grid grid-cols-2">
          <div className="bg-gray-300 h-[20rem] flex items-center justify-center rounded-tr-md rounded-br-md">
            <div>
              <div className="flex justify-center">
                <img className="w-24" src={RenderImage(user.img)} alt="" />
              </div>
              <p className="text-xl text-center pt-5">{user.firstname}</p>
            </div>
          </div>
          <div className="flex items-center text-sm px-4">
            <div className="space-y-2">
              <div>
                <p>Profile Type</p>
                <p className="text-[#EF4637] text-xs">{user.role}</p>
              </div>
              <div>
                <p>Contact</p>
                <p className="text-[#EF4637] text-xs">
                  +66 {user.tel.slice(1, 10)}
                </p>
              </div>
              <div>
                <p>Location</p>
                <p className="text-[#EF4637] text-xs">{user.location}</p>
              </div>
              <div>
                <p>Position</p>
                <div className="flex items-center space-x-4">
                  <img src={Positionb} alt="" />
                  <p className="text-[#EF4637] text-xs">open</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-center">
        <Link
          to="/Interested"
          className="flex items-center justify-center space-x-4 mt-5"
        >
          <p>Interested</p>
          <img src={Edit} alt="" />
        </Link>
      </div>
      <div className="grid grid-flow-col auto-cols-max gap-2 overflow-x-scroll p-6">
        {interest &&
        (interest != null ||
          interest.length != 0) ? (
          interest.map((value, index) => {
            return <RenderInterest text={value} key={index}/>;
          })
        ) : (
            null
        )}
      </div>
      {myActivity && (
        <div className="text-center py-6 text-[#EF4637] bg-gray-300 h-[32%]">
          <p className="text-4xl">{myActivity.length}</p>
          <p>Activity Completed</p>
        </div>
      )}
    </div>
  );
}
export default Profile;
