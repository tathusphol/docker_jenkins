import React, { useState, useEffect } from "react";
import Check_true from "../assets/check_true.svg";
import Check_plus from "../assets/check_plus.svg";
import axios from "axios";
import path from "../../path";
function Interested() {
  const [user, setUser] = useState();
  const [myInterest, setMyInterest] = useState();
  const [interest, setInterest] = useState([])
  useEffect(() => {
    axios
      .post(`${path}/user`, { user_id: localStorage.getItem("user") })
      .then((response) => {
        setUser(response.data);
        setMyInterest(JSON.parse(response.data.interest));
        setInterest(JSON.parse(response.data.interest))
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function AddInterest(text) {
    let index = interest.indexOf(text);
    if (index == -1) {
      interest.push(text);
    } else {
      interest.splice(index, 1);
    }
  }

  function RenderInterested(props) {
    const [check, setCheck] = useState(interest.indexOf(props.text) != -1);
    return (
      <div
        onClick={() => {
          setCheck(!check);
          AddInterest(props.text);
        }}
      >
        {check ? (
          <div className="flex items-center px-4 py-2 space-x-1 bg-[#B5FFFB] rounded-full">
            <img src={Check_true} alt="" />
            <p>{props.text}</p>
          </div>
        ) : (
          <div className="flex items-center px-4 py-2 space-x-1 bg-[#D0D0D0] rounded-full">
            <img src={Check_plus} alt="" />
            <p>{props.text}</p>
          </div>
        )}
      </div>
    );
  }

  const INTERESTED = [
    "Football",
    "Basketball",
    "Tennis",
    "Volleyball",
    "Golf",
    "Swimming",
    "Running",
    "Cycling",
    "Boxing",
    "Martial arts",
    "Creative hobbies",
    "Drawing",
    "Painting",
    "Sculpting",
    "Photography",
    "Writing",
    "Poetry",
    "Acting",
    "Singing",
    "Dancing",
    "Playing musical instruments",
    "Video games",
    "Board games",
    "Card games",
    "Role-playing games",
    "Puzzle games",
    "Strategy games",
    "Outdoor activities",
    "Hiking",
    "Camping",
    "Fishing",
    "Hunting",
    "Rock climbing",
    "Surfing",
    "Skiing",
    "Snowboarding",
    "Kayaking",
    "Canoeing",
    "Cooking",
    "Baking",
    "Wine tasting",
    "Beer brewing",
    "Mixology",
    "Coffee tasting",
    "Tea ceremonies",
    "Chocolate making",
    "Cheese making",
    "BBQ",
    "Backp,acking",
    "Road trips",
    "Cruises",
    "Adventure travel",
    "Cultural travel",
    "Wildlife safaris",
    "Eco-tourism",
    "Beach vacations",
    "City breaks",
  ];

  function InsertInterested() {
    axios
      .post(`${path}/addInterest`, { user_id: user.id, interest: interest })
      .then((response) => {
        if (response.data == "success") {
          window.location.replace("/Profile");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="bg-[#EF46371A] min-h-screen px-3">
      <div className="p-8">
        <p className="font-bold text-2xl">Edit Interested</p>
      </div>
      <div className="flex flex-wrap text-sm space-y-3 space-x-2 items-center">
        {user && INTERESTED.map((value, index) => {
          return <RenderInterested text={value} key={index}/>;
        })}
      </div>
      <div className="space-y-2 py-10">
        <button
          onClick={() => {
            window.location.replace("/Profile");
          }}
          className="bg-red-600 text-white rounded-lg w-full py-2"
        >
          Cancel
        </button>
        <button
          onClick={() => InsertInterested()}
          className="bg-[#FD7D61] rounded-lg w-full text-white py-2"
        >
          submit
        </button>
      </div>
    </div>
  );
}
export default Interested;
