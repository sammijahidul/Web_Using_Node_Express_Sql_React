import { useParams, useNavigate } from 'react-router-dom';
import React, {useContext, useEffect, useState} from 'react';

import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';

function PostDetails() {
  let { id } = useParams(); 
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const {authState} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/api/v1/post/byid/${id}`)
      .then((response) => {
        setPostObject(response.data);
      });  
    axios.get(`http://localhost:3001/api/v1/comments/${id}`)
      .then((response) => {
        setComments(response.data);
    });  
  }, []);

  const addComment = () => {
    axios.post("http://localhost:3001/api/v1/comments/create", {
        commentBody: newComment, 
        PostId: id},
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          }
        })
      .then((response) => {
        if(response.data.error) {
          console.log(response.data.error);
        } else {
          const commentToAdd = {
            commentBody: newComment, 
            username: response.data.username
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  const deleteComment = (id) => {
    axios.delete(`http://localhost:3001/api/v1/comments/${id}`, {
      headers: {
        accessToken: localStorage.getItem("accessToken")}
    }).then(() => {
      setComments(comments.filter((val) => {
        return val.id !== id;
      }))
    })
  };

  const deletePost = (id) => {
    axios.delete(`http://localhost:3001/api/v1/post/${id}`, {
      headers : {
        accessToken: localStorage.getItem("accessToken")
      },
    })
    .then((response) => {
      navigate("/");
    })
    .catch((error) => {
      console.error("Error while deleting posts")

    });
  };

  const editPost = (option) => {
    if (option === 'title') {
      let newTitle = prompt('Enter new Title');
      axios.patch("http://localhost:3001/api/v1/post/update-title", 
        {
          newTitle: newTitle,
          id: id,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        },
      );
      // for instantly update
      setPostObject({...postObject, title: newTitle});

    } else {
      let newPostText = prompt("Enter body Text");
      axios.patch("http://localhost:3001/api/v1/post/update-postBody", 
        {
          newPostText: newPostText,
          id: id,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      );
      // for instantly update
      setPostObject({...postObject, postText: newPostText});

    }
  }
  return (
    <div className='postPage'>
      <div className='leftSide'>
        <div className='post' id='individual'>
          <div className='title' 
            onClick={() => {
              if (authState.username === postObject.username) {
                editPost('title');
              }
            }}
          > 
            {postObject.title} 
          </div>
          <div className='body' 
            onClick={() => {
              if (authState.username === postObject.username) {
                editPost('body');
              }
            }}
          > 
            {postObject.postText} 
          </div>
          <div className='footer'>
            {postObject.username} 
            {authState.username === postObject.username && (
              <button 
                onClick={() => {
                  deletePost(postObject.id);
              }}
              >
                Delete Post
              </button>
            )}
          </div>
        </div>
      </div>
      <div className='rightSide'>
        <div className='addCommentContainer'>
          <input 
            type='text' 
            placeholder='Comment...' 
            autoComplete='off'
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value)
            }}
          />
          <button 
            onClick={addComment}
          >
            Add Comment
          </button>
        </div>
        <div className='listOfComments'>
          {comments.map((comment, key) => {
            return (
              <div key={key} className='comment'>
                {comment.commentBody}
                <label> Username: {comment.username}</label>
                {authState.username === comment.username && 
                  <button 
                    onClick={() => {
                      deleteComment(comment.id)
                    }}
                  >
                    Delete
                  </button>
                }
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PostDetails;