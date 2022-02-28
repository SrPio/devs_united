import React from "react";
import styles from "./Feed.module.css";

import { useEffect, useState } from "react";
import {
  addPost,
  db,
  delPost,
  updatePost,
  auth,
  loginConGoogle,
  logout,
  getUserUsername,
} from "../../firebaseFunctions";

import { collection, doc, onSnapshot } from "firebase/firestore";
import ProfileUserA from "../profile_user_A/ProfileUserA";
import { Link } from "react-router-dom";
import Posts from "../posts/Posts";

const INITIAL_FORM_DATA = {
  message: "",
  email: "",
  uid: "",
  autor: "",
  photo: "",
  postDate: "",
  likesList: [],
};

function Feed({
  users,
  setUsers,
  setShowMyProfile,
  posts,
  setPosts,
  userLog,
  generateUsername,
  handlerDelete,
  userName,
  setUserName,
}) {
  const [newPost, setNewPost] = useState(INITIAL_FORM_DATA);

  let userInfo = "";

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
      const postsData = snapshot.docs.map(
        (doc) => {
          return {
            message: doc.data().message,
            id: doc.data().id,
            likesList: doc.data().likesList,
            username: doc.data().username,
            email: doc.data().email,
            uid: doc.data().uid,
            photo: doc.data().photo,
            postDate: doc.data().postDate,
          };
        },
        (error) => {
          console.log(error, "Error en snapshot");
        }
      );
      setPosts(postsData);
    });

    return () => {
      unsub();
      //unsubscribeAuth();
    };
  }, []);

  //useEffect de los datos del usuario
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
      setUsers(usersData);
    });

    return () => {
      unsub();
      //unsubscribeAuth();
    };
  }, []);

  //! Implementación para el username nuevo
  /* useEffect(() => {
    setUserName((userData) => {
      getUserUsername(userData.user.uid);
    });
  }, []);
 */
  //Handlers
  const handleChange = (e) => {
    setNewPost(() => {
      return {
        message: e.target.value,
        email: userLog.email,
        uid: userLog.uid,
        username: userName,
        photo: userLog.photoURL,
        postDate: obtenerFecha(),
        likesList: [],
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addPost(newPost).then(() => {
      setNewPost(INITIAL_FORM_DATA);
    });
  };

  const obtenerFecha = () => {
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.toLocaleString("en-US", { month: "short" });
    const fechaFormateada = ` - ${dia} ${mes}.`;
    return fechaFormateada;
  };

  const userInformation = (userInfo) => {
    users.map((user) => {
      return (userInfo = {
        usernameTag: user.username,
        email: user.email,
        name: user.name,
        username: user.username,
        uid: user.uid,
        photo: user.photo,
        colorUI: user.colorUI,
      });
    });
  };

  return (
    <>
      <div className={styles.feed}>
        <header>
          <div className={styles.titleBox}>
            <Link to="/perfil">
              <img
                src={userLog.photoURL}
                alt="Profile pic"
                className={styles.profilePic}
                onClick={() => {
                  setShowMyProfile(true);
                }}
              />
            </Link>
            <img
              src="./images/logo_small.svg"
              alt="Logo"
              className={styles.logo}
            />

            <img
              src="./images/title.svg"
              alt="title"
              className={styles.title}
            />
          </div>
        </header>
        <div className={styles.postSection}>
          <div className={styles.internalPostSection}>
            <img
              className={styles.imginternalPostSection}
              src={userLog.photoURL}
              alt=""
            />
            <form onSubmit={handleSubmit} className={styles.postArea}>
              <textarea
                className={styles.inputPost}
                placeholder="What’s happening?"
                onChange={handleChange}
                value={newPost.message}
                maxlength="200"
              />
              <h1 className={styles.limitText}>200 max.</h1>
              <button className={styles.postButton}>
                <img src="./images/button_post_on.svg" alt="" />
              </button>
            </form>
          </div>
        </div>
        <article>
          <Posts
            posts={posts}
            setPosts
            generateUsername={generateUsername}
            userLog={userLog}
            handlerDelete={handlerDelete}
          />
        </article>
      </div>
    </>
  );
}

export default Feed;
