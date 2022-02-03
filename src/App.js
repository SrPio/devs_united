import logo from "./logo.svg";
import "./App.css";
import Login from "./components/login/Login";
import Register from "./components/register_welcome/Register";
import { useState } from "react";
import Feed from "./components/feed/Feed";
import ProfileUserA from "./components/profile_user_A/ProfileUserA";

function App() {
  //let colors = ["pink" , "orange" , "yellow" , "green" , "blue", "purple"];
  const [isLoginVisible, setIsLoginVisible] = useState(true);

  return (
    <div className="App">
      {/* {isLoginVisible ? (
        (
          <Login
            isLoginVisible={isLoginVisible}
            setIsLoginVisible={setIsLoginVisible}
          />
        )
      ) : (
        <Feed />
      )}*/}

      <ProfileUserA />
    </div>
  );
}

export default App;
