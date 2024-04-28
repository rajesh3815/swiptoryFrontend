import React, { useContext, useEffect, useState } from "react";
import Styles from "./Navbar.module.css";
import Popup from "../popupmodal/Popup";
import { FaBookmark } from "react-icons/fa";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import logo from "../../assets/profilelogo.jpg";
import Storyform from "../story/Storyform";
import { myContext } from "../../Context";
import Bookmark from "../bookmark/Bookmark";
const Navbar = () => {
  let { isEdit, loginStatus, setLoginstatus } = useContext(myContext);
  const [loginPopup, setLoginPopup] = useState(false);
  const [registerPopup, setRegisterPopup] = useState(false);
  const [logoutModal, setLogoutModal] = useState();
  const [mediaModal, setMediaModal] = useState();
  const [storyModal, setStroyModal] = useState();
  const [bookmarkModal, setBookmarkModal] = useState();
  //check for login
  const [isLoggedin, setisLoggedin] = useState(localStorage.getItem("token"));
  //----------------------//
  const [username, setUserName] = useState("");
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
  const logoutHandeler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setisLoggedin(localStorage.getItem("token"));
    setLoginstatus(false)
    setLogoutModal(!logoutModal);
    setMediaModal(false);
  };
  //story modal
  const addStoryhandeler = () => {
    setStroyModal(true);
  };

  const bookmarkHandeler = () => {
    setBookmarkModal(true);
  };

  return (
    <>
      <div className={Styles.navbarContainer}>
        <p>SwipTory</p>

        <div className={Styles.navbarRightContainer}>
          {!isLoggedin ? (
            <>
              <div className={Styles.mediareg}>
                <span className={Styles.logoutModals}>
                  {mediaModal ? (
                    <RxCross1 onClick={() => setMediaModal(!mediaModal)} />
                  ) : (
                    <RxHamburgerMenu
                      onClick={() => setMediaModal(!mediaModal)}
                      style={{ fontSize: "2rem" }}
                    />
                  )}
                  {mediaModal ? (
                    <div className={Styles.mediatogle}>
                      <button
                        onClick={register}
                        style={{ background: "#FF7373" }}
                      >
                        Register Now
                      </button>
                      <button
                        onClick={login}
                        style={{
                          background: "#73ABFF",
                          padding: "0.5rem 2rem",
                        }}
                      >
                        Sign In
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </span>
              </div>
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
            </>
          ) : (
            <>
              {/* this is the div i am inserting whe my medi query fires */}
              <div className={Styles.media}>
                <span className={Styles.logoutModals}>
                  {mediaModal ? (
                    <RxCross1 onClick={() => setMediaModal(!mediaModal)} />
                  ) : (
                    <RxHamburgerMenu
                      onClick={() => setMediaModal(!mediaModal)}
                      style={{ fontSize: "2rem" }}
                    />
                  )}
                </span>
                {mediaModal ? (
                  <div className={Styles.mediaModals}>
                    <button
                      onClick={logoutHandeler}
                      style={{ background: "#FF7373" }}
                    >
                      Logout
                    </button>
                    <button
                      onClick={bookmarkHandeler}
                      style={{ background: "#FF7373" }}
                    >
                      <FaBookmark /> Bookmarks
                    </button>
                    <button
                      onClick={addStoryhandeler}
                      style={{ background: "#FF7373" }}
                    >
                      Add story
                    </button>
                    <span className={Styles.profileLogo}>
                      <img src={logo} alt="" /> <p>Hello {username}</p>
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </div>
              {/* /// */}
              <div className={Styles.loginDiv}>
                <button
                  onClick={bookmarkHandeler}
                  style={{ background: "#FF7373" }}
                >
                  <FaBookmark /> Bookmarks
                </button>
                <button
                  onClick={addStoryhandeler}
                  style={{ background: "#FF7373" }}
                >
                  Add story
                </button>
                <span className={Styles.profileLogo}>
                  <img src={logo} alt="" />
                </span>
                <span className={Styles.logoutModals}>
                  {logoutModal ? (
                    <RxCross1 onClick={() => setLogoutModal(!logoutModal)} />
                  ) : (
                    <RxHamburgerMenu
                      onClick={() => setLogoutModal(!logoutModal)}
                      style={{ fontSize: "2rem" }}
                    />
                  )}
                </span>
                {logoutModal ? (
                  <div className={Styles.logoutDiv}>
                    <p>Hello {username}</p>
                    <button
                      onClick={logoutHandeler}
                      style={{ background: "#FF7373" }}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* login modal */}
      {loginPopup && (
        <Popup
          setisLoggedin={setisLoggedin}
          setUserName={setUserName}
          onclose={() => setLoginPopup(false)}
          name={"Login"}
        />
      )}

      {/* register modal */}
      {registerPopup && (
        <Popup onclose={() => setRegisterPopup(false)} name={"Register"} />
      )}

      {/* add stroy modal */}
      {(storyModal || isEdit) && (
        <Storyform onclose={() => setStroyModal(false)} />
      )}

      {/* add bookmarkmodal modal */}
      {bookmarkModal && <Bookmark onclose={() => setBookmarkModal(false)} />}
    </>
  );
};

export default Navbar;
