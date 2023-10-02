import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp'

function HomePage() {
    const [listOfPosts, setListOfPosts] = useState([]);
    const [likedPost, setLikedPost] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      axios.get("http://localhost:3001/api/v1/post/fetch", { 
        headers: {accessToken: localStorage.getItem("accessToken") }
      }).then((response) => {
        setListOfPosts(response.data.allPosts);
        setLikedPost(
          response.data.likedPosts.map((like) => {
            return like.PostId;
        }));
      });  
    }, []);

    const postLike = (postId) => {
      axios.post("http://localhost:3001/api/v1/likes/given", 
      { PostId: postId }, 
      { headers: {accessToken: localStorage.getItem("accessToken") }}
      ).then((response) => {       
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0]}
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray};
              }
            } else {
              return post;
            }
          })
        )
        //unliked icon instantly changed 
        if (likedPost.includes(postId)) {
          setLikedPost(likedPost.filter((id) => {
            return id != postId;
          })
        );
        //liked icon instantly changed
        } else {
          setLikedPost([...likedPost, postId])
        }
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
              <div className='username'>{value.username}</div>
              <div className='buttons'>
                <ThumbUpIcon onClick={() => {
                  postLike(value.id)
                  }}
                  className={likedPost.includes(value.id) ? "unlikeBttn" : "likeBttn"}
                />

                <label>{value.Likes.length}</label>
              </div>
            </div>
          </div>  
        );
      })}
    </div>
  )
}

export default HomePage