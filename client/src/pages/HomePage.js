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

    const postLike = (PostId) => {
      axios.post("http://localhost:3001/api/v1/likes/given", 
      { PostId: PostId }, 
      { headers: {accessToken: localStorage.getItem("accessToken") }}
      ).then((response) => {
        alert(response.data);
      })
    };
  return (
    <div>
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
              {value.username} {" "}
              <button onClick={() => {
                postLike(value.id)
                }}
              >
                {" "}
                Like
              </button>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default HomePage