import React from "react";
import styles from "./Feed.module.css";

function Feed() {
  return (
    <div className={styles.feed}>
      <header>
        <div className={styles.titleBox}>
          <img
            src="./images/profilePic.png"
            alt="Profile pic"
            className={styles.profilePic}
          />
          <img
            src="./images/logo_small.svg"
            alt="Logo"
            className={styles.logo}
          />
          <img src="./images/title.svg" alt="title" className={styles.title} />
        </div>
      </header>
      <div className={styles.postSection}></div>
    </div>
  );
}

export default Feed;
