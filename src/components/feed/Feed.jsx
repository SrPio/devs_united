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
      <div className={styles.postSection}>
        <div className={styles.internalPostSection}>
          <div>
            <img src="./images/profilePic.png" alt="" />
          </div>
          <div className={styles.postArea}>
            <textarea
              className={styles.inputPost}
              placeholder="What’s happening? "
            />
            <h1 className={styles.limitText}>200 max.</h1>
            <button disabled="disabled" className={styles.postButton}>
              <img src="./images/button_post_off.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
      <article>
        
      </article>
    </div>
  );
}

export default Feed;
