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
} from "../../firebaseFunctions";

import { collection, onSnapshot } from "firebase/firestore";
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
  showMyProfile,
  setShowMyProfile,
  posts,
  setPosts,
  userLog,
  setUserLog,
  generateUsername,
  likeUser,
  handlerDelete,
}) {
  const [newPost, setNewPost] = useState(INITIAL_FORM_DATA);

  let userInfo = "";

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
      const postsData = snapshot.docs.map(
        (doc) => {
          return {
            message: doc.data().message,
            id: doc.id,
            likesList: doc.data().likesList,
            autor: doc.data().autor,
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
      //console.log(postsData);
      setPosts(postsData);
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
    setNewPost(() => {
      return {
        message: e.target.value,
        email: userLog.email,
        uid: userLog.uid,
        autor: userLog.displayName,
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
      {/* <ProfileUserA posts={posts}/> */}

      <div className={styles.feed}>
        <header>
          {/* {userLog ? (
          <div className="user-profile">
            <img className="user-profile-pic" src={userLog.photoURL} alt="" />
            <p>¡Hola {userLog.displayName}!</p>
            <button onClick={logout}>Log out</button>
          </div>
        ) : (
          <button className="login-btn" onClick={loginConGoogle}>
            Login con Google
          </button>
        )} */}
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
              />
              <h1 className={styles.limitText}>200 max.</h1>
              <button /*disabled="disabled"*/ className={styles.postButton}>
                <img src="./images/button_post_off.svg" alt="" />
              </button>
            </form>
          </div>
        </div>
        <article>
          {/* {posts.map((post) => {
            return (
              <div className={styles.post} key={post.id}>
                <img className={styles.postPic} src={post.photo} alt="" />
                <div className={styles.contentPost}>
                  <div className={styles.container_name_date}>
                    <p className={styles.autor}>{generateUsername()}</p>
                    <p className={styles.dateStyle}> {post.postDate}</p>
                  </div>
                  <p className={styles.message}>{post.message}</p>
                  <button
                    className={styles.likesButton}
                    onClick={() => likeUser(post.id, post.likes, userLog.uid)}
                  >
                    <img
                      className={styles.likeImg}
                      height="13px"
                      src="./images/likeOn.svg"
                      alt=""
                    />
                    <span className={styles.likesNumber}>
                      {post.likes ? post.likes : 0}
                    </span>
                  </button>
                </div>
                {post.uid === userLog?.uid ? (
                  <button
                    onClick={handlerDelete}
                    className={styles.deleteButton}
                  >
                    <img id={post.id} src="./images/delete.svg" alt="" />
                  </button>
                ) : null}
              </div>
            );
          })} */}
          <Posts />
        </article>
      </div>
    </>
  );
}

export default Feed;
