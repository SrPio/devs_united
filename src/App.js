import logo from "./logo.svg";
import "./App.css";
import Login from "./components/login/Login";
import Register from "./components/register_welcome/Register";
import { useState } from "react";
import Feed from "./components/feed/Feed";
import ProfileUserA from "./components/profile_user_A/ProfileUserA";
import { updatePost, delPost } from "./firebaseFunctions";

function App() {
  //let colors = ["pink" , "orange" , "yellow" , "green" , "blue", "purple"];
  const [isLoginVisible, setIsLoginVisible] = useState(true);
  const [showMyProfile, setShowMyProfile] = useState(false);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [userLog, setUserLog] = useState(null);
  const [isLike, setIsLike] = useState(false);

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


  const likeUser = (id, likes = 0) => {
    if(isLike === true){
      isLike(false);
      updatePost(id, {
        likes: likes - 1,
      });
    } else {
      isLike(true);
      updatePost(id, {
        likes: likes + 1,
      });
    }
  };

  const handlerDelete = (e) => {
    delPost(e.target.id).then((id) => {
      const newPosts = posts.filter((post) => {
        return post.id !== id;
      });
      setPosts(newPosts);
    });
  };

  return (
    <div className="App">
      {isLoginVisible ? (
        (
          <Login
            isLoginVisible={isLoginVisible}
            setIsLoginVisible={setIsLoginVisible}
          />
        )
      ) : (
        showMyProfile ? (
          <ProfileUserA
            showMyProfile={showMyProfile}
            setShowMyProfile={setShowMyProfile}
            isLoginVisible={isLoginVisible}
            setIsLoginVisible={setIsLoginVisible}
            users={users}
            posts={posts}
            userLog={userLog}
            generateUsername={generateUsername}
            likeUser={likeUser}
            handlerDelete={handlerDelete}
            />) :
          (<Feed
            users={users}
            setUsers={setUsers}
            posts={posts}
            setPosts={setPosts}
            userLog={userLog}
            setUserLog={setUserLog}
            showMyProfile={showMyProfile}
            setShowMyProfile={setShowMyProfile}
            generateUsername={generateUsername}
            likeUser={likeUser}
            handlerDelete={handlerDelete}
            isLike={isLike}
            setIsLike={setIsLike} />)
      )}

      {/* <ProfileUserA /> */}
    </div>
  );
}

export default App;
