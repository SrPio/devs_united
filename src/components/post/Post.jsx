import React from "react";
import styles from "../feed/Feed.module.css";

function Post({
  likeUser,
  generateUsername,
  userLog,
  handlerDelete, post
}) {
  return (
    <>
    {console.log(post)}
      <div className={styles.post}>
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
          <button onClick={handlerDelete} className={styles.deleteButton}>
            <img id={post.id} src="./images/delete.svg" alt="" />
          </button>
        ) : null}
      </div>
    </>
  );
}

export default Post;
