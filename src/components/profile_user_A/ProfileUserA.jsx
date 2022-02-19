import React from "react";
import styles from "./ProfileUserA.module.css";
import { logout } from "../../firebaseFunctions";
import { Link } from "react-router-dom";
import Posts from "../posts/Posts";

function ProfileUserA({
  users,
  showMyProfile,
  setShowMyProfile,
  isLoginVisible,
  setIsLoginVisible,
  userLog,
  posts,
  generateUsername,
  //likeUser,
  handlerDelete,
  username,
}) {
  const logoutUser = () => {
    return logout, setIsLoginVisible(true);
  };

  const misPosts = posts.filter((post) => {
    return post.uid === userLog.uid;
  });
  console.log("Profile esto es users" + users);
  return (
    <div className={styles.profileA}>
      <header>
        <div className={styles.titleBox}>
          <Link to="/feed">
            <div className={styles.stylesButtonBack}>
              <img
                src="./images/back.svg"
                alt="back"
                className={styles.backStyle}
              />
              <h1 className={styles.usernameHeader}>username</h1>
            </div>
          </Link>
          <Link to="/">
            <button className={styles.btn_logout}>
              <img src="./images/logout.svg" alt="" onClick={logout} />
            </button>
          </Link>
        </div>
      </header>
      <div className={styles.postSection}>
        <div className={styles.internalPostSection}>
          <img
            src={userLog.photoURL}
            alt="Profile pic"
            alt="profile_pic"
            className={styles.profilePicStyle}
          />
          <h1 className={styles.usernameStyle}>{username}</h1>;
          <div className={styles.tabButtons}>
            <button className={styles.postButtonSelected}>POSTS</button>
            <button className={styles.favButtonUnselected}>FAVORITES</button>
          </div>
        </div>
      </div>
      <article>
        {}
        <Posts
          posts={misPosts}
          setPosts
          generateUsername={generateUsername}
          userLog={userLog}
          handlerDelete={handlerDelete}
        />
      </article>
    </div>
  );
}

export default ProfileUserA;
