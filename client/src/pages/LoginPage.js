import React, {useState} from 'react';
import axios from 'axios';

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const data = {username: username, password: password};
    axios.post("http://localhost:3001/api/v1/user/login", data).then((response) => {
        if(response.data.error) {
          alert(response.data.error);
        } else {
          sessionStorage.setItem("accessToken", response.data);
        }       
    }) 
  };  
  return (
    <div className="loginContainer">
      <label>Username:</label>
      <input
        type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(event) => {
            setPassword(event.target.value);
        }}
      />
        <button onClick={login}> Login </button>
    </div>
  );
}

export default LoginPage