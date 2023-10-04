import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [listOfPosts, setListofPosts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/v1/user/profile/${id}`)
      .then((response) => {
        setUserName(response.data.username);
    });

    axios.get(`http://localhost:3001/api/v1/post/byuserId/${id}`)
      .then((response) => {
        setListofPosts(response.data);
    });
  }, []);
  return (
    <div className='profilePageContainer'>
      <div className='basicInfo'>
        <h1> Username: {username} </h1>
      </div>
      <div className='listOfPosts'>
        {listOfPosts.map((value, key) => { 
          return (
            <div 
              key={key} 
              className='post' 
            >
              <div className='title'>{value.title}</div>
              <div className='body' 
                onClick={() => {
                  navigate(`/post/${value.id}`)
                }}
              >{value.postText}
              </div>
              <div className='footer'>
                <div className='username'>{value.username}</div>
                <div className='buttons'>
                  <label>{value.Likes.length}</label>
                </div>
              </div>
            </div>  
          );
        })}
      </div>      
    </div>
  )
}

export default Profile;