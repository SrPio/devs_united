import logo from "./logo.svg";
import "./App.css";
import Login from "./components/login/Login";
import Register from "./components/register_welcome/Register";
import { useState } from "react";
import Feed from "./components/feed/Feed";

function App() {
  //let colors = ["pink" , "orange" , "yellow" , "green" , "blue", "purple"];
  const [isLoginVisible, setIsLoginVisible] = useState(true);

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
        <Feed />
      )}
      {/*<Register isSelectedColor={isSelectedColor} setIsSelectedColor={setIsSelectedColor}/>*/}
    </div>
  );
}

export default App;
