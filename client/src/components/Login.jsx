import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = (props) => {

  const navigate = useNavigate()

  const [result, setResult] = useState()

  const usernameRef = useRef()
  const passwordRef = useRef()

  useEffect(() => {
    if(props && props.userId != null){
      navigate('/')
    }
  }, [])

  const login = async (e) => {
    e.preventDefault()
    try{
      const response = await axios.post('http://localhost:3000/login', {
        username: usernameRef.current.value,
        password: passwordRef.current.value
      }, { headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
      if(response.data && response.data.error != null){
        setResult(response.data)
        return
      }
      localStorage.setItem('userId', response.data)
      setResult({})
      props.setUserId(response.data)
      navigate('/')

    } catch(error){
      console.log(error)
      setResult({error: 'Oh no an error occurs :('})
    }
  }

  return (
    <div>
        <h1>ShareTogether</h1>
        <p>{result && result.error}</p>
        <form action='#' onSubmit={(e) => login(e)}>
          <input ref={usernameRef} className='border-2' type="text" name="username" placeholder='Username' required /> <br />
          <input ref={passwordRef} className='border-2' type="password" name='password' placeholder='Password' required/><br />
          <button type="submit">Login</button>
          <p>Haven't gotten an account? Please <a onClick={() => navigate('/register')}>Register</a></p>
        </form>
    </div>
  )
}

export default Login