import React, { useState, useEffect } from "react";
import styles from "./Register.module.css";
import { collection, onSnapshot } from "firebase/firestore";
import { db, addUser } from "../../firebaseFunctions";

const INITIAL_FORM_DATA = {
  email: "",
  name: "",
  username: "",
  photo: "",
  uid: "",
};

function Register({ userLog }) {
  const [isSelectedColor, setIsSelectedColor] = useState("pink");
  const [newUser, setNewUser] = useState(INITIAL_FORM_DATA);
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  
  

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


  //Handlers
  const handleChange = (e) => {
    setNewUser(() => {
      return {
        name: userLog.displayName,
        username : userName,
        email: userLog.email,
        uid: userLog.uid,
        photo: userLog.photoURL,
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
    <div className={styles.register}>
      <div className={styles.container_left}>
        <img src="./images/logo.svg" alt="" />
      </div>
      <div className={styles.container_right}>
        <h1 className={styles.principal_title}>
          WELCOME <span>NAME!</span>
        </h1>
        <form onSubmit={handleSubmit}>
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
        <button className={styles.btn_next}>CONTINUE</button>
        </form>
        <h1 className={styles.copyright}>
          © 2020 Devs_United - <span>BETA</span>
          {/* <img className="user-profile-pic" src={userLog.photoURL} alt="" /> */}
        </h1>
      </div>
    </div>
  );
}

export default Register;
