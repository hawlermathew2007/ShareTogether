import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import googleLogo from './../../images/google.png'
import facebookLogo from './../../images/facebook.png'


const Login = (props) => {

  const navigate = useNavigate()

  const [result, setResult] = useState()

  const usernameRef = useRef()
  const passwordRef = useRef()

  useEffect(() => {
    console.log(props?.userId, localStorage.getItem('userId'))
    if(props?.userId != null && localStorage.getItem('userId') != null){
      navigate('/')
    } else{
      props.setUserId(null)
    }
  }, [props.userId])

  const login = async (e) => {
    e.preventDefault()
    try{
      const response = await axios.post('http://localhost:3000/login', {
        username: usernameRef.current.value,
        password: passwordRef.current.value
      }, { headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
      if(response?.data?.error != null){
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

  const loginByGoogle = async () => {
    window.open(
      'http://localhost:3000/auth/google/callback',
      '_self'
    )
  }

  return (
    <div className="w-[60%] flex justify-center show-up">
        <div className='w-full flex flex-col gap-4 items-center'>
          <form action='#' onSubmit={(e) => login(e)} className='w-full max-w-sm'>
            <div className='flex flex-col gap-4 items-center'>
              <h1 className='text-4xl font-bold italic mb-4'>Let's Go</h1>
              <p className={`${result?.error ? '' : 'hidden'} mb-3 text-fancyDarkGray tracking-wide text-center`}>{result?.error}</p>
              <input ref={usernameRef} className='w-full bg-fancyShadowGray p-2 shadow-bottomLine focus:outline-none' type="text" name="username" placeholder='Username' required />
              <input ref={passwordRef} className='w-full bg-fancyShadowGray p-2 shadow-bottomLine focus:outline-none' type="password" name='password' placeholder='Password' required/>
              <p className='text-fancyDarkGray italic cursor-pointer self-start'>Hmm, forgot password?</p>
              <button className='w-full text-white bg-fancyBlack p-2 tracking-widest uppercase' type="submit">Login</button>
            </div>
          </form>
          <div className="flex gap-3 items-center w-full my-2">
            <div className='grow h-[1px] bg-fancyBlack'></div>
            <span className='grow-0 h-fit text-md font-semibold'>OR, continue with</span>
            <div className='grow h-[1px] bg-fancyBlack'></div>
          </div>
          <div className='flex justify-evenly items-center gap-2 w-full mb-2'>
            <div className='flex justify-evenly items-center gap-2 rounded-3xl bg-white p-2 px-4'>
              <img className='w-6 h-6' src={googleLogo} alt="Google" />
              <button onClick={() => loginByGoogle()} className='font-semibold'>Google</button>
            </div>
            <div className='flex justify-evenly items-center gap-2 rounded-3xl bg-white p-2 px-4'>
              <img className='w-6 h-6' src={facebookLogo} alt="Facebook" />
              <button className='font-semibold'>Facebook</button>
            </div>
          </div>
          <p className='text-sm'>Don't have an account? Let's <a className='font-semibold italic cursor-pointer' onClick={() => navigate('/authentication/register')}>Register!</a></p>
        </div>
    </div>
  )
}

export default Login