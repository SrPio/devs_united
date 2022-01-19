import logo from './logo.svg';
import './App.css';
import Login from './components/login/Login';
import Register from './components/register_welcome/Register';
import { useState } from 'react';

function App() {

  let colors = ["pink" , "orange" , "yellow" , "green" , "blue", "purple"];
  const [isSelectedColor,setIsSelectedColor] = useState("pink")
  return (
    <div className="App">
      
      <Register isSelectedColor={isSelectedColor} setIsSelectedColor={setIsSelectedColor}/>
    </div>
  );
}

export default App;
