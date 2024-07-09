import React, { useRef, useState } from 'react'
import axios from 'axios'

const CreatePost = (props) => {
  
  const titleRef = useRef()
  const topicRef = useRef()
  const essayRef = useRef()

  const [result, setResult] = useState()

  const createPost = async (e) => {
    e.preventDefault()
    try{
      const response = await axios.post('http://localhost:3000/post', {
        title: titleRef.current.value,
        topic: topicRef.current.value,
        essay: essayRef.current.value,
        author: props.userId,
        authorName: props.name,
      }, { headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
      if(response && response.data){
        setResult(response.data)
      }
    } catch(e){
      setResult('Unable to post due to some errors :(')
      console.log(e)
    }
  }

  return (
    <div>
      <h1>Create your post here!</h1>
      <form action="#" onSubmit={(e) => { createPost(e) }}>
        <h2>Title</h2>
        <input ref={titleRef} className='border-2' name='title' id='title' type="text" required />
        <h2>Topic</h2>
        <input ref={topicRef} className='border-2' name='topic' id='topic' type="text" required /><br />
        <textarea ref={essayRef} name="essay" placeholder='Your story await you!' required></textarea>
        <br />
        <button type="submit">Post</button>
      </form>
      <p>{result != null && result}</p>
    </div>
  )
}

export default CreatePost