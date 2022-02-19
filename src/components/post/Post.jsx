import React from "react";
import styles from "../feed/Feed.module.css";

import { updatePost, db } from "../../firebaseFunctions";
import { doc, updateDoc } from "firebase/firestore";

function Post({ generateUsername, userLog, handlerDelete, post }) {
  const likeUser = (id, userId) => {
    let indexLikes = post.likesList.findIndex((likes) => {
      return likes === userId;
    });
    const postReference = doc(db, "posts", post.id);
    if (indexLikes !== -1) {
      let newLikeList = post.likesList.filter((like) => like !== userId);
      console.log(newLikeList);
      updateDoc(postReference, {
        likesList: [...newLikeList],
      });
    } else {
      const likesExtra = [...post.likesList, userId];
      updateDoc(postReference, {
        likesList: likesExtra,
      });
    }
    //console.log(post.likesList, indexLikes, newLikeList);
  };

  return (
    <>
      {console.log(post)}
      <div className={styles.post}>
        <img className={styles.postPic} src={post.photo} alt="" />
        <div className={styles.contentPost}>
          <div className={styles.container_name_date}>
            <p className={styles.autor}>{post.username}</p>
            <p className={styles.dateStyle}> {post.postDate}</p>
          </div>
          <p className={styles.message}>{post.message}</p>
          <button
            className={styles.likesButton}
            onClick={() => likeUser(post.id, userLog.uid)}
          >
            <img
              className={styles.likeImg}
              height="13px"
              src="./images/likeOn.svg"
              alt=""
            />
            <span className={styles.likesNumber}>{post.likesList.length}</span>
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
