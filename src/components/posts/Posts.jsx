import React from "react";
import styles from "../feed/Feed.module.css";
import Post from "../post/Post";

function Posts({
  posts,
  setPosts,
  likeUser,
  generateUsername,
  userLog,
  handlerDelete,
}) {
  return (
    <>
      {/* {posts.length > 0 &&
        posts.map((post) => {
          return (
            <Post
              key={post.id}
              post={post}
              likeUser={likeUser}
              generateUsername={generateUsername}
              userLog={userLog}
              handlerDelete={handlerDelete}
            />
          );
        })} */}
      {console.log(posts)}
    </>
  );
}

export default Posts;
