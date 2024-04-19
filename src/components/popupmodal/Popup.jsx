import React, { useRef, useState } from "react";
import Styles from "./Popup.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginUser, registerUser } from "../../auth/auth";
const Popup = ({ name, onclose }) => {
  const popref = useRef();
  const [showpassword, setShowpassword] = useState(false);
  const [err, setErr] = useState('');
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
      let res=await registerUser(formData);
    } else {
      let res =await loginUser(formData);
      if(res===500){
        setErr("user does not exist")
        console.log("user does ");
      }else if(res===400){
        setErr("wrong password")
      }else{
        setErr("")
      }
    }
  };
  return (
    <div onClick={closeModal} ref={popref} className={Styles.container}>
      <div className={Styles.popup}>
        <button onClick={onclose}>x</button>
        <p>{name} to SwipTory</p>
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
          <p style={{ color: "red" }}>{errordata.name}</p>
          <br />
          <label htmlFor="password">
            password{" "}
            <input
              name="userPassword"
              type={showpassword ? "text" : "password"}
              placeholder="type your password"
              value={formData.password}
              onChange={formHandeler}
            />
          </label>
          <p style={{ color: "red" }}>{errordata.userPassword}</p>
          <button>{name}</button>
        </form>
        {showpassword ? (
          <FaEye onClick={() => setShowpassword(false)} />
        ) : (
          <FaEyeSlash onClick={() => setShowpassword(true)} />
        )}
        <p>{err}</p>
      </div>
    </div>
  );
};

export default Popup;
