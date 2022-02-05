import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { auth, loginConGoogle, logout } from "../../firebaseFunctions";
import Register from "../register_welcome/Register";

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


function Login({isLoginVisible, setIsLoginVisible}) {
  const [userLog, setUserLog] = useState(null);

  const [isSelectedColor, setIsSelectedColor] = useState("pink");
  const [newUser, setNewUser] = useState(INITIAL_FORM_DATA);
  const [users, setUsers] = useState([]);
  


// useEffect de users
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
      const usersData = snapshot.docs.map(
        (doc) => {
          return {
            email: doc.data().email,
            name: doc.data().name,
            username: doc.data().username,
            uid: doc.data().uid,
            photo: doc.data().photo,
            colorUI: doc.data().colorUI,
          };
        },
        (error) => {
          console.log(error, "Error en snapshot");
        }
      );
      //console.log(usersData);
      setUsers(usersData);
      
    });
    /* const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setUserLog(user);
      console.log(user);
    }); */
     return () => {
      unsub();
      //unsubscribeAuth();
    }; 
  }, []);




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





  //Handlers  de users
  const handleChange = (e) => {
    setNewUser(() => {
      return {
        name: userLog.displayName,
        username : e.target.value,
        email: userLog.email,
        uid: userLog.uid,
        photo: userLog.photoURL,
        colorUI: isSelectedColor,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(newUser).then(() => {
      setNewUser(INITIAL_FORM_DATA);
    });
  };



  return (
    <>
      {userLog ? (
        /*<div className="user-profile">
        <img className="user-profile-pic" src={userLog.photoURL} alt="" />
        <p>¡Hola {userLog.displayName}!</p>
        <button onClick={logout}>Log out</button>
      </div>*/
       /* <Register userlog={userLog} />*/
       <div className={styles.register}>
      <div className={styles.container_left}>
        <img src="./images/logo.svg" alt="" />
      </div>
      <div className={styles.container_right}>
        <h1 className={styles.principal_title}>
          WELCOME <span>NAME!</span>
        </h1>
        {/* <form onSubmit={preventDefault}> */}
        <input type="" placeholder="Type your username" onChange={handleChange}/>
        <h1 className={styles.subtitle}>Select your favorite color</h1>
        <div className={styles.colors}>
          <button
            className={`${
              isSelectedColor === "pink" ? styles.colorSelectedBorder : ""
            } ${styles.color_1}`}
            onClick={() => {
              setIsSelectedColor("pink");
            }}
          ></button>
          <button
            className={`${
              isSelectedColor === "orange" ? styles.colorSelectedBorder : ""
            } ${styles.color_2}`}
            onClick={() => {
              setIsSelectedColor("orange");
            }}
          ></button>
          <button
            className={`${
              isSelectedColor === "yellow" ? styles.colorSelectedBorder : ""
            } ${styles.color_3}`}
            onClick={() => {
              setIsSelectedColor("yellow");
            }}
          ></button>
          <button
            className={`${
              isSelectedColor === "green" ? styles.colorSelectedBorder : ""
            } ${styles.color_4}`}
            onClick={() => {
              setIsSelectedColor("green");
            }}
          ></button>
          <button
            className={`${
              isSelectedColor === "blue" ? styles.colorSelectedBorder : ""
            } ${styles.color_5}`}
            onClick={() => {
              setIsSelectedColor("blue");
            }}
          ></button>
          <button
            className={`${
              isSelectedColor === "purple" ? styles.colorSelectedBorder : ""
            } ${styles.color_6}`}
            onClick={() => {
              setIsSelectedColor("purple");
            }}
          ></button>
        </div>
        {/* </form> */}
        <form onSubmit={handleSubmit}>
        <button className={styles.btn_next} onClick={setIsLoginVisible(false)}>CONTINUE</button>
        </form>
        <h1 className={styles.copyright}>
          © 2020 Devs_United - <span>BETA</span>
          {/* <img className="user-profile-pic" src={userLog.photoURL} alt="" /> */}
        </h1>
      </div>
    </div>

      ) : (
        <div className={styles.login}>
          <div className={styles.container_left}>
            <img src="./images/logo.svg" alt="" />
          </div>
          <div className={styles.container_right}>
            <h1 className={styles.principal_title}>LOREM IPSUM DOLOR</h1>
            <h1 className={styles.subtitle}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </h1>
            <button className={styles.btn_signIn} onClick={loginConGoogle}>
              <img src="./images/gg_signIn.svg" alt="" />
            </button>
            <h1 className={styles.copyright}>
              © 2020 Devs_United - <span>BETA</span>
            </h1>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
