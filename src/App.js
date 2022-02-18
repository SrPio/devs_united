import { BrowserRouter, Route, Routes } from 'react-router-dom'
import logo from "./logo.svg";
import "./App.css";
import Login from "./components/login/Login";
import Register from "./components/register_welcome/Register";
import { useState } from "react";
import Feed from "./components/feed/Feed";
import ProfileUserA from "./components/profile_user_A/ProfileUserA";
import { updatePost, delPost, updateUser } from "./firebaseFunctions";
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

const INITIAL_FORM_DATA = {
  email: "",
  name: "",
  username: "",
  photo: "",
  uid: "",
};

function App() {
  //let colors = ["pink" , "orange" , "yellow" , "green" , "blue", "purple"];
  const [isLoginVisible, setIsLoginVisible] = useState(true);
  const [showMyProfile, setShowMyProfile] = useState(false);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [userLog, setUserLog] = useState(null);
  const [isLike, setIsLike] = useState(false);

  const [isSelectedColor, setIsSelectedColor] = useState("pink");

  const [userName, setUserName] = useState("");

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

  //! IMPORTANTE: Este metodo de likeUser está fallando, revisar la proxima clase.
  const likeUser = (id, likes = 0, userId) => {
    let indexLikes = posts.likesList.indexOf(userId); //! no está funcionando porque en posts.likeList devuelve undefined
    console.log(`Esto es indexLikes: ${posts.likesList}`);
    if (indexLikes !== -1) {
      setPosts(posts.likesList.splice(indexLikes, 1))
    } else {
      updatePost(id, {
        likesList: [userId]
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={

            <Login
              setUserLog={setUserLog}
            />
          } />
          <Route path="/perfil" element={

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
            />
          } />
          <Route path="/feed" element={
            <Feed
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
              setIsLike={setIsLike}
            />
          } />
          <Route path="/register" element={
            <Register
              isSelectedColor={isSelectedColor}
              setIsSelectedColor={setIsSelectedColor}
              userName={userName}
              setUserName={setUserName}
              userLog={userLog}
              setUsers={setUsers}
            />
          }>
          </Route>
          <Route path="/posts" element={
            <Posts
              posts={posts}
              setPosts={setPosts}
              generateUsername={generateUsername}
              likeUser={likeUser}
              userLog={userLog}
              handlerDelete={handlerDelete}
            />
          }>
          </Route>
        </Routes>
      </BrowserRouter >
    </div >

  )
}

export default App;