import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { auth, loginConGoogle, logout } from "../../firebaseFunctions";
import Register from "../register_welcome/Register";
import { useNavigate } from "react-router-dom";

import { collection, onSnapshot } from "firebase/firestore";
import { db, addUser } from "../../firebaseFunctions";

const INITIAL_FORM_DATA = {
  email: "",
  name: "",
  username: "",
  photo: "",
  uid: "",
  colorUI: "",
};

function Login({ setUserLog }) {
  //const [userLog, setUserLog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setUserLog(user);
      /* console.log(user); */
    });
    return () => {
      // unsub();
      unsubscribeAuth();
    };
  }, []);

  return (
    <>
      <button onClick={logout}>Log out</button>

      {/* <div className="user-profile">
        <img className="user-profile-pic" src={userLog.photoURL} alt="" />
        <p>¡Hola {userLog.displayName}!</p>
      </div> */}

      <div className={styles.login}>
        <div className={styles.container_left}>
          <img src="./images/logo.svg" alt="" />
        </div>
        <div className={styles.container_right}>
          <h1 className={styles.principal_title}>LOREM IPSUM DOLOR</h1>
          <h1 className={styles.subtitle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </h1>
          <button
            className={styles.btn_signIn}
            onClick={() => {
              loginConGoogle(navigate);
            }}
          >
            <img src="./images/gg_signIn.svg" alt="" />
          </button>
          <h1 className={styles.copyright}>
            © 2020 Devs_United - <span>BETA</span>
          </h1>
        </div>
      </div>
    </>
  );
}

export default Login;
