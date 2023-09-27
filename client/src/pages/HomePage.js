import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';

function HomePage() {
    const [listOfPosts, setListOfPosts] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:3001/api/v1/post/fetch").then((response) => {
        setListOfPosts(response.data)
      });  
    }, []);
  return (
    <div>
      {listOfPosts.map((value, key) => { 
        return (
          <div className='post'>
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