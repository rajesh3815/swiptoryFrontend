import React, { useState } from "react";
import Styles from "./Navbar.module.css";
import Popup from "../popupmodal/Popup";
import { FaBookmark } from "react-icons/fa";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import logo from "../../assets/profilelogo.jpg";
const Navbar = () => {
  const [loginPopup, setLoginPopup] = useState(false);
  const [registerPopup, setRegisterPopup] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  //check for login
  const [isLoggedin] = useState(localStorage.getItem("token"));
  const register = () => {
    if (loginPopup) {
      setLoginPopup(false);
    }
    setRegisterPopup(true);
  };

  const login = () => {
    if (registerPopup) {
      setRegisterPopup(false);
    }

    setLoginPopup(true);
  };
  //handdel when user click logout btn
  const logoutHandeler=()=>{
    localStorage.removeItem("token");
  }

  return (
    <>
      <div className={Styles.navbarContainer}>
        <p>SwipTory</p>
        <div className={Styles.navbarRightContainer}>
          {!isLoggedin ? (
            <div className={Styles.registerDiv}>
              <button onClick={register} style={{ background: "#FF7373" }}>
                Register Now
              </button>
              <button
                onClick={login}
                style={{ background: "#73ABFF", padding: "0.5rem 2rem" }}
              >
                Sign In
              </button>
            </div>
          ) : (
            <div className={Styles.loginDiv}>
              <button style={{ background: "#FF7373" }}>
                <FaBookmark /> Bookmarks
              </button>
              <button style={{ background: "#FF7373" }}>Add story</button>
              <span className={Styles.profileLogo}>
                <img src={logo} alt="" />
              </span>
              <span className={Styles.logoutModals}>
                {logoutModal ? (
                  <RxCross1 onClick={() => setLogoutModal(false)} />
                ) : (
                  <RxHamburgerMenu
                    onClick={() => setLogoutModal(true)}
                    style={{ fontSize: "2rem" }}
                  />
                )}
              </span>
              {logoutModal ? (
                <div className={Styles.logoutDiv}>
                  <p>Your name</p>
                  <button onClick={logoutHandeler} style={{ background: "#FF7373" }}>Logout</button>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      </div>
      {loginPopup && (
        <Popup onclose={() => setLoginPopup(false)} name={"Login"} />
      )}
      {registerPopup && (
        <Popup onclose={() => setRegisterPopup(false)} name={"Register"} />
      )}
    </>
  );
};

export default Navbar;
