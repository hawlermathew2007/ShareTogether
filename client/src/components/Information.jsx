import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Information = ({ userInfo }) => {

  const navigate = useNavigate()

  const [message, setMessage] = useState('Unknow')

  const facebookLinkRef = useRef()
  const instagramLinkRef = useRef()
  const redditLinkRef = useRef()
  const discordLinkRef = useRef()
  const githubLinkRef = useRef()
  
  const linkRefs = {
    facebook: facebookLinkRef,
    instagram: instagramLinkRef,
    reddit: redditLinkRef,
    discord: discordLinkRef,
    github: githubLinkRef,
  };

  const updateLink = async (type) => {
    try{
      const link = linkRefs[type]?.current.value;
      if(link.includes(`https://www.${type}.com/` != false)){
        setMessage('Please enter a Valid')
        return
      }
      const response = await axios.put(`http://localhost:3000/user/contactLink/${userInfo._id}`, {
        type: type,
        link: link,

      }, { headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
      if(response && response.data){
        setMessage('success')
      }
    } catch(e) {
      console.log(e)
      navigate('/userInfo/error')
    }
  }

  return (
    <>
      <div className='border-x-[1px]'>
        <h1>Facebook link: {userInfo && userInfo.objectOfContactLink && userInfo.objectOfContactLink.facebook}</h1>
        <input ref={facebookLinkRef} className='border-2' type="text" name="facebook" />
        <button onClick={() => updateLink('facebook')}>Update</button>
        <h1>Instagram link: {userInfo && userInfo.objectOfContactLink && userInfo.objectOfContactLink.instagram}</h1>
        <input ref={instagramLinkRef} className='border-2' type="text" name="instagram" />
        <button onClick={() => updateLink('instagram')}>Update</button>
        <h1>Reddit link: {userInfo && userInfo.objectOfContactLink && userInfo.objectOfContactLink.reddit}</h1>
        <input ref={redditLinkRef} className='border-2' type="text" name="reddit" />
        <button onClick={() => updateLink('reddit')}>Update</button>
        <h1>Discord Username: {userInfo && userInfo.objectOfContactLink && userInfo.objectOfContactLink.discord}</h1>
        <input ref={discordLinkRef} className='border-2' type="text" name="discord" />
        <button onClick={() => updateLink('discord')}>Update</button>
        <h1>Github link: {userInfo && userInfo.objectOfContactLink && userInfo.objectOfContactLink.github}</h1>
        <input ref={githubLinkRef} className='border-2' type="text" name="github" />
        <button onClick={() => updateLink('github')}>Update</button>
      </div>
      <div className='border-x-[1px]'>
        {`Result: ${message}`}
      </div>
    </>
  )
}

export default Information