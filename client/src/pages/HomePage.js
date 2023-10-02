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

    const postLike = (postId) => {
      axios.post("http://localhost:3001/api/v1/likes/given", 
      { PostId: postId }, 
      { headers: {accessToken: localStorage.getItem("accessToken") }}
      ).then((response) => {
        alert(response.data);
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              return { ...post, Likes: [...post.Likes, 0]}
            } else {
              return post;
            }
          })
        )
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
              <label>{value.Likes.length}</label>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default HomePage