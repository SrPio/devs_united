import React from "react";
import styles from "./ProfileUserA.module.css";
import {
  logout,
} from "../../firebaseFunctions";

function ProfileUserA({users, showMyProfile, 
  setShowMyProfile, isLoginVisible,
  setIsLoginVisible,
  userLog, posts,
  generateUsername, likeUser,
  handlerDelete}) {

  const logoutUser = () => {
    return (
      logout,
      setIsLoginVisible(true)
      
    )
  }


  console.log("Profile esto es users" + users);
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
            <h1 className={styles.usernameHeader} onClick={() => {setShowMyProfile(false)}}>username</h1>
          </div>
          <button className={styles.btn_logout}>
            <img src="./images/logout.svg" alt="" onClick={logout}/>
          </button>
        </div>
      </header>
      <div className={styles.postSection}>
        <div className={styles.internalPostSection}>
        {users.map((user) => {
            return (
              <img
                src={user.photo}
                alt="Profile pic"
                alt="profile_pic"
            className={styles.profilePicStyle}
              />
            );
          })}
          
          {
            users.map((user) => {
              return (

                <h1 className={styles.usernameStyle}>{user.username}</h1>
              )
            })
          }
          <div className={styles.tabButtons}>
            <button className={styles.postButtonSelected}>POSTS</button>
            <button className={styles.favButtonUnselected}>FAVORITES</button>
          </div>
        </div>
      </div>
      <article>
      {posts.map((post) => {
          return (
            <div className={styles.post} key={post.id}>
              
              {post.uid === userLog?.uid ? (<>
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
                <button onClick={handlerDelete} className={styles.deleteButton}>
                  <img id={post.id} src="./images/delete.svg" alt="" />
                </button>
                </>) : null}
            </div>
          );
        })}

      </article>
    </div>
  );
}

export default ProfileUserA;
