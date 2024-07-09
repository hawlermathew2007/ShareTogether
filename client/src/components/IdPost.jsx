import React, { useEffect, useState } from 'react'
import Post from './partials/Post'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const IdPost = ({ userId }) => {

  const { id } = useParams()
  const navigate = useNavigate()

  const [postInfo, setPostInfo] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getPostInfo = async (id) => {
      try{
        const response = await axios.get(`http://localhost:3000/post/info/${id}`)
        if(response && response.data && response.data.error == null){
          setPostInfo(response.data)
        } else{
          setError(response.data.error)
        }
      } catch(e) {
        setError(e)
      }
    }
    getPostInfo(id)
  }, [])

  return (
    <>
      <div className='flex flex-col'>
        {error ? navigate('/postId/error') : (
          postInfo ? 
            <Post inIdPost={true} id={postInfo._id} sessionId={userId} author={postInfo.author} authorName={postInfo.authorName} title={postInfo.title} topic={postInfo.topic} essay={postInfo.essay} timePost={postInfo.datePost} likes={postInfo.liked} copies={postInfo.copyed}/>
            :
            ''
        )}
      </div>
      <div className='flex flex-col border-x-[1px]'>
        <h1 className='p-6 px-8 text-xl font-bold mb-8'>Followed</h1>
        <h1 className='p-6 px-8 text-xl font-bold'>Favorite Tags</h1>
      </div>
    </>
  )
}

export default IdPost