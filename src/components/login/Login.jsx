import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { auth, loginConGoogle, logout } from "../../firebaseFunctions";
import Register from "../register_welcome/Register";
import { useNavigate } from "react-router-dom";

import { collection, onSnapshot } from "firebase/firestore";
import { db, addUser } from "../../firebaseFunctions";

const INITIAL_FORM_DATA = {
  email: "",
  username: "",
  photo: "",
  uid: "",
  colorUI: "",
};

function Login({ setUserLog, userName, userLog }) {
  //const [userLog, setUserLog] = useState(null);
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState(INITIAL_FORM_DATA);

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

  //! cree estas 2 funciones (y sus states correspondientes) para subir user a la bd
  const handleChange = (e) => {
    setNewUser(() => {
      return {
        email: userLog.email,
        uid: userLog.uid,
        username: userName,
        photo: userLog.photoURL,
        colorUI: "",
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(newUser).then(() => {
      setNewUser(INITIAL_FORM_DATA);
    });
  };

  //! - - - Todavía no los he implementado. - - -

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
