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

const INITIAL_FORM_DATA = {
  message: "",
  email: "",
  uid: "",
  autor: "",
  photo: "",
  postDate: "",
};

function Feed() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState(INITIAL_FORM_DATA);
  const [userLog, setUserLog] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
      const postsData = snapshot.docs.map(
        (doc) => {
          return {
            message: doc.data().message,
            id: doc.id,
            likes: doc.data().likes,
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
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setUserLog(user);
      console.log(user);
    });
    return () => {
      unsub();
      unsubscribeAuth();
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
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addPost(newPost).then(() => {
      setNewPost(INITIAL_FORM_DATA);
    });
  };

  const handlerDelete = (e) => {
    delPost(e.target.id).then((id) => {
      const newPosts = posts.filter((post) => {
        return post.id !== id;
      });
      setPosts(newPosts);
    });
  };

  const likeUser = (id, likes = 0) => {
    updatePost(id, {
      likes: likes + 1,
    });
  };

  const obtenerFecha = () => {
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.toLocaleString("en-US", { month: "short" });
    const fechaFormateada = ` - ${dia} ${mes}.`;
    return fechaFormateada;
  };

  const userInformation = () => {
    users.map((user) => {
      return {
        usernameTag: user.username,
        email: user.email,
        name: user.name,
        username: user.username,
        uid: user.uid,
        photo: user.photo,
        colorUI: user.colorUI,
      };
    });
  };

  const generateUsername = () => {
    let username = "";
    let userdata = "";
    let postdata = "";
    users.map((user) => {
      return (userdata = {
        usernameTag: user.username,
        email: user.email,
      });
    });
    posts.map((post) => {
      return (postdata = { emailPost: post.email });
    });

    if (userdata.email === postdata.emailPost) {
      username = userdata.usernameTag;
    }

    return username;
  };

  return (
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
          {users.map((user) => {
            return (
              <img
                src={user.photo}
                alt="Profile pic"
                className={styles.profilePic}
              />
            );
          })}
          <img
            src="./images/logo_small.svg"
            alt="Logo"
            className={styles.logo}
          />

          <img src="./images/title.svg" alt="title" className={styles.title} />
        </div>
      </header>
      <div className={styles.postSection}>
        <div className={styles.internalPostSection}>
          {users.map((user) => {
            return (
              <img
                className={styles.imginternalPostSection}
                src={user.photo}
                alt=""
              />
            );
          })}
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
        {console.log(users)}
        {posts.map((post) => {
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
                  onClick={() => likeUser(post.id, post.likes)}
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
                <button onClick={handlerDelete} className={styles.deleteButton}>
                  <img id={post.id} src="./images/delete.svg" alt="" />
                </button>
              ) : null}
            </div>
          );
        })}
      </article>
    </div>
  );
}

export default Feed;
