import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Post from '../Post';
import { useNavigate } from 'react-router-dom';

const UserPost = ({ userId, sessionId, setNumsOfPosts }) => {

    const navigate = useNavigate()

    const [posts, setPosts] = useState(null)
    
    const fetchPostInfo = async (author) => {
        try {
        const response = await axios.get('http://localhost:3000/post/info', {
            params: { author: author },
        });
        if (response && response.data) {
            setPosts(response.data);
            setNumsOfPosts(response.data.length)
        }
        } catch (e) {
        navigate('/postInfo/error');
        }
    };
    
    useEffect(() => {
        if (userId) {
            fetchPostInfo(userId);
        }
    }, [userId]);

    return (
        <div className='flex flex-col'>
            {posts && posts.error ? posts.error : 
            posts && posts.map((post, index) => {
                return (
                <Post
                    key={index}
                    inIdPost={false}
                    sessionId={sessionId}
                    id={post._id}
                    author={post.author}
                    authorName={post.authorName}
                    title={post.title}
                    topic={post.topic}
                    essay={post.essay}
                    timePost={post.datePost}
                    likes={post.liked}
                    copies={post.copyed}
                />
                );
            }) || 'Loading your post...'
            }
        </div>
  )
}

export default UserPost