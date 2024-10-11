import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import googleLogo from './../../images/google.png'
import facebookLogo from './../../images/facebook.png'

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
       }, {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
      if(response?.data?.error){
        setResult(response.data)
        return
      }
      navigate('/authentication/login')
    } catch(e) {
      console.log(e)
    }
  }

  const registerByGoogle = async () => {
    window.open(
      'http://localhost:3000/auth/google/callback',
      '_self'
    )
  }

  return (
    <div className="w-[60%] flex justify-center show-up">
        <div className='w-full flex flex-col gap-4 items-center'>
          <form  action='#' onSubmit={(e) => register(e)} className='w-full max-w-sm'>
            <div className='flex flex-col gap-4 items-center w-full'>
              <h1 className='text-4xl font-bold italic mb-4'>Get Started!</h1>
              <p className={`${result && result.error ? '' : 'hidden'} mb-3 text-fancyDarkGray tracking-wide text-center`}>{result && result.error}</p>
              <input ref={usernameRef} className='w-full bg-fancyShadowGray p-2 shadow-bottomLine focus:outline-none' type="text" name="username" placeholder='Username' required />
              <input ref={passwordRef} className='w-full bg-fancyShadowGray p-2 shadow-bottomLine focus:outline-none' type="password" name='password' placeholder='Password' required/>
              <input ref={birthdayRef} className='w-full bg-fancyShadowGray p-2 shadow-bottomLine focus:outline-none' type="date" name='birthday' placeholder='Your Birthday!'/>
              <button className='w-full text-white bg-fancyBlack p-2 mt-2 tracking-widest uppercase' type="submit">REGISTER</button>
            </div>
          </form>
          <div className="flex gap-3 items-center w-full my-2">
            <div className='grow h-[1px] bg-fancyBlack'></div>
            <span className='grow-0 h-fit text-md font-semibold'>OR, register with</span>
            <div className='grow h-[1px] bg-fancyBlack'></div>
          </div>
          <div className='flex justify-evenly gap-2 items-center w-full mb-2'>
            <div className='flex justify-evenly items-center gap-2 rounded-3xl bg-white p-2 px-4'>
              <img className='w-6 h-6' src={googleLogo} alt="" />
              <button onClick={() => registerByGoogle()} className='font-semibold'>Google</button>
            </div>
            <div className='flex justify-evenly items-center gap-2 rounded-3xl bg-white p-2 px-4'>
              <img className='w-6 h-6' src={facebookLogo} alt="" />
              <button className='font-semibold'>Facebook</button>
            </div>
          </div>
          <p className='text-sm'>Whut? Already have an account? Go <a className='font-semibold italic cursor-pointer' onClick={() => navigate('/authentication/login')}>Login!</a></p>
        </div>
    </div>
  )
}

export default Register