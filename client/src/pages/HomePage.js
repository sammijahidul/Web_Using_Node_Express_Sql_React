import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const [listOfPosts, setListOfPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      axios.get("http://localhost:3001/api/v1/post/fetch").then((response) => {
        setListOfPosts(response.data)
      });  
    }, []);
  return (
    <div>
      {listOfPosts.map((value, key) => { 
        return (
          <div 
            key={key} 
            className='post' 
            onClick={() => {
              navigate(`/post/${value.id}`)
            }}
          >
            <div className='title'>{value.title}</div>
            <div className='body'>{value.postText}</div>
            <div className='footer'>{value.username}</div>
          </div>
        );
      })}
    </div>
  )
}

export default HomePage