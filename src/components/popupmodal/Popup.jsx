import React, { useRef, useState,useContext } from "react";
import Styles from "./Popup.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginUser, registerUser } from "../../auth/auth";
import { ToastContainer, toast, Slide } from "react-toastify";
import { myContext } from "../../Context";
import "react-toastify/dist/ReactToastify.css";
const Popup = ({ name, onclose, setisLoggedin, setUserName }) => {
  const popref = useRef();
  let {  setLoginstatus } = useContext(myContext);
  const [showpassword, setShowpassword] = useState(false);
  const [err, setErr] = useState("");
  const [formData, setFormdata] = useState({
    name: "",
    userPassword: "",
  });
  const [errordata, setErrordata] = useState({
    name: "",
    userPassword: "",
  });
  const closeModal = (e) => {
    if (popref.current === e.target) {
      onclose();
    }
  };
  const formHandeler = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const clickHandeler = async (e) => {
    let flg = true;
    e.preventDefault();
    // checking for errors
    let len = e.target.length;
    for (let i = 0; i < len; i++) {
      const { name } = e.target[i];
      if (e.target[i].value.trim() === "") {
        setErrordata((prev) => ({
          ...prev,
          [name]: `${name} field is required`,
        }));
        flg = false;
      } else {
        setErrordata((prev) => ({ ...prev, [name]: "" }));
      }
    }
    if (name === "Register") {
      let res = await registerUser(formData);
      if (res !== 1) return;
      toast.success("Registered Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
    } else {
      let res = await loginUser(formData);
      if (res === 500) {
        setErr("user does not exist");
        console.log("user does ");
      } else if (res === 400) {
        setErr("wrong password");
      } else {
        setErr("");
        //for togle login logout functionalities
        setUserName(res);
        setisLoggedin(localStorage.getItem("token"));
        setLoginstatus(true);
        toast.success("Logedin Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
      }
    }
  };
  return (
    <div onClick={closeModal} ref={popref} className={Styles.container}>
      <div className={Styles.popup}>
        <button className={Styles.crossbtn} onClick={onclose}>
          x
        </button>
        <p className={Styles.popupHeader}>{name} to SwipTory</p>
        <form onSubmit={clickHandeler}>
          <label htmlFor="username">
            UserName{" "}
            <input
              name="name"
              type="text"
              placeholder="type your name"
              value={formData.name}
              onChange={formHandeler}
            />
          </label>
          <p className={Styles.errs} style={{ color: "red" }}>
            {errordata.name}
          </p>
          <br />
          <label htmlFor="password" style={{ position: "relative" }}>
            password{" "}
            <input
              name="userPassword"
              type={showpassword ? "text" : "password"}
              placeholder="type your password"
              value={formData.password}
              onChange={formHandeler}
            />
            <span className={Styles.eye}>
              {showpassword ? (
                <FaEye onClick={() => setShowpassword(false)} />
              ) : (
                <FaEyeSlash onClick={() => setShowpassword(true)} />
              )}
            </span>
          </label>
          <p className={Styles.errs} style={{ color: "red" }}>
            {errordata.userPassword}
          </p>
          <button className={Styles.btn}>{name}</button>
        </form>

        <p style={{ color: "red" }} className={Styles.errsData}>
          {err}
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Popup;
