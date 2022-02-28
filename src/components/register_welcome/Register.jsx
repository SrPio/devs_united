import React, { useState, useEffect } from "react";
import styles from "./Register.module.css";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db, addUser } from "../../firebaseFunctions";
import { Link, useNavigate } from "react-router-dom";

function Register({
  userLog,
  isSelectedColor,
  setIsSelectedColor,
  userName,
  setUserName,
  setUsers,
}) {
  const INITIAL_FORM_DATA = {
    email: "",
    name: "",
    username: "",
    photo: "",
    uid: "",
  };
  const [newUser, setNewUser] = useState(INITIAL_FORM_DATA);
  const navigate = useNavigate();
  //Handlers
  const handleChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userdata = {
      name: userLog.displayName,
      username: userName,
      email: userLog.email,
      uid: userLog.uid,
      photo: userLog.photoURL,
      colorUI: isSelectedColor,
    };
    addUser(userdata).then(() => {
      setNewUser(INITIAL_FORM_DATA);
    });
    navigate("/feed");
  };

  return (
    <div className={styles.register}>
      <div className={styles.container_left}>
        <img src="./images/logo.svg" alt="" />
      </div>
      <div className={styles.container_right}>
        <h1 className={styles.principal_title}>
          WELCOME <span>NAME!</span>
        </h1>
        <form>
          <input
            type=""
            placeholder="Type your username"
            onChange={handleChange}
          />
          <h1 className={styles.subtitle}>Select your favorite color</h1>
          <div className={styles.colors}>
            <button
              type="button"
              className={`${
                isSelectedColor === "pink" ? styles.colorSelectedBorder : ""
              } ${styles.color_1}`}
              onClick={() => {
                setIsSelectedColor("pink");
              }}
            ></button>
            <button
              type="button"
              className={`${
                isSelectedColor === "orange" ? styles.colorSelectedBorder : ""
              } ${styles.color_2}`}
              onClick={() => {
                setIsSelectedColor("orange");
              }}
            ></button>
            <button
              type="button"
              className={`${
                isSelectedColor === "yellow" ? styles.colorSelectedBorder : ""
              } ${styles.color_3}`}
              onClick={() => {
                setIsSelectedColor("yellow");
              }}
            ></button>
            <button
              type="button"
              className={`${
                isSelectedColor === "green" ? styles.colorSelectedBorder : ""
              } ${styles.color_4}`}
              onClick={() => {
                setIsSelectedColor("green");
              }}
            ></button>
            <button
              type="button"
              className={`${
                isSelectedColor === "blue" ? styles.colorSelectedBorder : ""
              } ${styles.color_5}`}
              onClick={() => {
                setIsSelectedColor("blue");
              }}
            ></button>
            <button
              type="button"
              className={`${
                isSelectedColor === "purple" ? styles.colorSelectedBorder : ""
              } ${styles.color_6}`}
              onClick={() => {
                setIsSelectedColor("purple");
              }}
            ></button>
          </div>

          <button
            type="button"
            className={styles.btn_next}
            onClick={handleSubmit}
          >
            CONTINUE
          </button>
        </form>
        <h1 className={styles.copyright}>
          © 2020 Devs_United - <span>BETA</span>
        </h1>
      </div>
    </div>
  );
}

export default Register;
