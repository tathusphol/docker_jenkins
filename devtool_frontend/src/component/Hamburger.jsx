import React, { useState, useContext, useEffect } from "react";
import { slide as Menu } from "react-burger-menu";
import Activity from "../assets/activity_nav.svg";
import Activity_c from "../assets/activity_c.svg";
import Profile from "../assets/profile_nav.svg";
import HamburgerButton from "../assets/hamburger.svg";
import Ongoing from "../assets/ongoing.svg";
import { Link } from "react-router-dom";
import Logout from "../assets/logout.svg";
import path from "../../path";
import axios from "axios";
const LinkTo = [
  {
    link: "/Profile",
    src: Profile,
    text: "Profile",
  },
  {
    link: "/Activity",
    src: Activity,
    text: "Activity",
  },
  {
    link: "/Activity_complete",
    src: Activity_c,
    text: "Actiivity Completed",
  },
  {
    link: "/Ongoing",
    src: Ongoing,
    text: "Ongoing Completed",
  },
];

function LinkNav(props) {
  return (
    <div className="duration-500 hover:bg-red-500 px-4 py-2 rounded-lg w-full">
      <Link
        className="w-full"
        to={props.obj.link}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img className="w-8" src={props.obj.src} alt="" />{" "}
        <p className="ml-4">{props.obj.text}</p>
      </Link>
    </div>
  );
}

function RenderImage(img) {
  if (img) {
    return `${path}${img}`;
  }
}

function LogoutF() {
  localStorage.removeItem("user");
  return window.location.replace("/Login");
}

const Hamburger = (props) => {
  const MyContext = React.createContext();
  const [user, setUser] = useState();
  const [menuOpenState, setMenuOpenState] = useState(false);

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

  const MyProvider = (props) => {
    return (
      <MyContext.Provider
        value={{
          isMenuOpen: menuOpenState,
          toggleMenu: () => setMenuOpenState(!menuOpenState),
          stateChangeHandler: (newState) => setMenuOpenState(newState.isOpen),
        }}
      >
        {props.children}
      </MyContext.Provider>
    );
  };

  // create a button that calls a context function to set a new open state when clicked
  const Button = () => {
    const ctx = useContext(MyContext);
    return (
      <button onClick={ctx.toggleMenu}>
        <img className="pl-4 py-5" src={HamburgerButton} alt="" />
      </button>
    );
  };

  // create a navigation component that wraps the burger menu
  const Navigation = () => {
    const ctx = useContext(MyContext);
    return (
      <Menu
        customBurgerIcon={false}
        isOpen={ctx.isMenuOpen}
        onStateChange={(state) => ctx.stateChangeHandler(state)}
        width={280}
        styles={styles}
      >
        <div className="w-full text-[#FD7D61]">
          <div className="flex items-center space-x-4 px-4 py-2 border-b pb-4">
            <img className="w-16" src={RenderImage(props.user.img)} alt="" />
            <p className="text-2xl">{props.user.firstname}</p>
          </div>
          <div className="space-y-4 text-lg pt-4">
            {user &&
              LinkTo.map(function (object, i) {
                if (
                  user.role == "Charity" &&
                  object.text == "Ongoing Completed"
                ) {
                  return <LinkNav obj={object} key={i} />;
                } else if (
                  user.role == "Charity" &&
                  object.text != "Ongoing Completed" &&
                  object.text != "Actiivity Completed"
                ) {
                  return <LinkNav obj={object} key={i} />;
                } else if (
                  user.role == "Volunteer" &&
                  object.text != "Ongoing Completed"
                ) {
                  return <LinkNav obj={object} key={i} />;
                }
              })}
          </div>
          <div
            onClick={() => LogoutF()}
            className="absolute bottom-10 flex items-center px-4 space-x-4"
          >
            <img src={Logout} alt="" />
            <p>Logout</p>
          </div>
        </div>
      </Menu>
    );
  };
  return (
    <MyProvider>
      <Navigation />
      <Button />
    </MyProvider>
  );
};

var styles = {
  bmBurgerButton: {
    position: "fixed",
    width: "36px",
    height: "30px",
    left: "36px",
    top: "36px",
  },
  bmBurgerBars: {
    background: "#373a47",
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: "#bdc3c7",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
  },
  bmMenu: {
    background: "#FBF7F0",
    // padding: "2.5em 1.5em 0",
    fontSize: "1.15em",
  },
  bmMorphShape: {
    fill: "#FBF7F0",
  },
  bmItemList: {
    color: "#00213F",
    padding: "0.8em",
  },
  bmItem: {
    // display: "inline-block",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
  },
};

export default Hamburger;
