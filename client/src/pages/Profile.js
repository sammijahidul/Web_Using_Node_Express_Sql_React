import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  let { id } = useParams();
  const [username, setUserName] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3001/api/v1/user/profile/${id}`).then((response) => {
        setUserName(response.data.username);
    })
  }, []);
  return (
    <div className='profilePageContainer'>
      <div className='basicInfo'>
        <h1>Username: {username}</h1>
      </div>
      <div className='listofPosts'></div>
      
    </div>
  )
}

export default Profile;