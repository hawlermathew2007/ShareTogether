import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = (props) => {

  const navigate = useNavigate()

  const [result, setResult] = useState()

  const usernameRef = useRef()
  const passwordRef = useRef()
  const birthdayRef = useRef()

  useEffect(() => {
    if(props && props.userId != null){
      navigate('/')
    }
  }, [props.userId])

  const register = async (e) => {
    e.preventDefault()
    try{

      const response = await axios.post('http://localhost:3000/register', { 
          username: usernameRef.current.value,
          password: passwordRef.current.value,
          birthday: birthdayRef.current.value
       }, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}, withCredentials: true})
      
      if(response.data && response.data.error == null){
        navigate('/login')
        return
      }

      setResult(response.data)

    } catch(e) {
      console.log(e)
    }
  }

  return (
    <div>
      <h1>ShareTogether</h1>
      <p>{result && result.error}</p>
      <form action='#' onSubmit={(e) => register(e)}>
        <input ref={usernameRef} className='border-2' type="text" name="username" placeholder='Username' required /> <br />
        <input ref={passwordRef} className='border-2' type="password" name='password' placeholder='Password' required/><br />
        <input ref={birthdayRef} className='border-2' type="date" name="birthday" /> <br />
        <button type="submit">Register</button>
        <p>Already have an account? Please <a onClick={() => navigate('/login')}>Login</a></p>
      </form>
    </div>
  )
}

export default Register