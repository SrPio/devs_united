import React from "react";
import styles from "./ProfileUserA.module.css";

function ProfileUserA() {
  return (
    <div className={styles.profileA}>
      <header>
        <div className={styles.titleBox}>
          <div className={styles.stylesButtonBack}>
            <img
              src="./images/back.svg"
              alt="back"
              className={styles.backStyle}
            />
            <h1 className={styles.usernameHeader}>username</h1>
          </div>
          <button className={styles.btn_logout}>
            <img src="./images/logout.svg" alt="" />
          </button>
        </div>
      </header>
      <div className={styles.postSection}>
        <div className={styles.internalPostSection}>
          <img
            src="./images/profilePic.png"
            alt="profile_pic"
            className={styles.profilePicStyle}
          />
          <h1 className={styles.usernameStyle}>username</h1>
          <div className={styles.tabButtons}>
            <button className={styles.postButtonSelected}>POSTS</button>
            <button className={styles.favButtonUnselected}>FAVORITES</button>
          </div>
        </div>
      </div>
      <article></article>
    </div>
  );
}

export default ProfileUserA;
