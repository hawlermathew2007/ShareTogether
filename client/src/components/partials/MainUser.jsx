import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserPost from './user\'s partial/UserPost'
import UserMessage from './user\'s partial/UserMessage'
import { socialMediaLogo } from '../data/website'
import axios from 'axios'
import toastr from 'toastr'

// display link in both User
// add link in Information and add link also in User Main

const MainUser = ({ userInfo, objectMap, checkFullLink }) => {

  const navigate = useNavigate()

  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

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

  const [user, setUser] = useState(null)
  const [numsOfPosts, setNumsOfPosts] = useState(0)
  const [atPostSec, setAtPostSec] = useState(true)
  const [openUpdateLinkBox, setOpenUpdateLinkBox] = useState(false)
  const [contactLinks, setContactLinks] = useState()

  const dateConvertor = (dateString) => {
    const date = new Date(dateString);

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
    };

    return date.toLocaleDateString('en-US', options);
  }

  const updateLink = async (type) => {
    try{
      const link = linkRefs[type]?.current.value;
      if(!link.includes(`https://www.${type}.com`)){
        toastr['error']('Please enter a valid link!')
        return
      }
      const response = await axios.put(`http://localhost:3000/user/contactLink/${user._id}`, {
        type: type,
        link: link,
        
      }, { headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
      if(response?.data){
        toastr['success']('Update Successfully!')
        setContactLinks(response.data)
      }
    } catch(e) {
      toastr['error']('Error! Please try again!')
      navigate('/userInfo/error')
    }
  }
  
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await userInfo;
        setUser(response);
        setContactLinks(response.objectOfContactLink)
      } catch (e) {
        navigate('/userInfo/error');
      }
    };
    fetchUserInfo();
  }, [user]);

  return (
    <>
      <div className={`absolute ${openUpdateLinkBox ? '' : 'hidden'} fadeBox`}>
        <div className={`flex flex-col gap-7 items-center fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[45%] h-fit shadow-lg shadow-fancyDarkGray z-40 bg-fancyShadowGray rounded-lg p-8`}>
          <button className='absolute top-[2%] left-[98%] translate-x-[-100%] mr-6' onClick={() => setOpenUpdateLinkBox(prev => !prev)}><i className="fa-solid fa-xmark text-xl text-lavender"></i></button>
          <h1 className='text-xl font-bold uppercase tracking-wide'>Update Alternative Contact Link</h1>
          <div className='flex flex-col gap-2 w-[85%] mb-4'>
            {user?.objectOfContactLink && Object.keys(contactLinks) ? Object.keys(contactLinks).map(((media, index) => {
              return <div className='flex gap-6 items-center' key={index}>
                <div className='flex gap-2 items-center'>
                  <img className='w-5 h-5 cursor-pointer bg-white rounded-2xl' src={socialMediaLogo[media]} alt={`${media}Logo`} />
                  <h1 className='w-16 font-semibold capitalize'>{media}</h1>
                </div>
                <input ref={linkRefs[media]} className='p-2 py-1 rounded-md shadow-sm flex-1 focus:outline-none' type="text" name={media} placeholder={`${media.charAt(0).toUpperCase() + media.slice(1)} Link`}/>
                <button onClick={() => updateLink(media)} className='text-white bg-fancyDarkGray p-2 py-1 rounded-md'>Update</button>
              </div>
            })) : ''}
          </div>
        </div>
      </div>
      <div className='mb-2'>
        <div className='relative w-full min-h-48 bg-fancyBlack '>
          <div className='absolute top-[55%] left-[1.5rem] w-[10em] h-[10em] bg-fancyBlack cursor-pointer rounded-full border-4 border-white'></div>
        </div>
        <div className='w-full flex gap-2 justify-end items-center p-4'>
          {user?.objectOfContactLink && objectMap(contactLinks) ? objectMap(contactLinks).map((data, index) => {
            if(data[1] != null && data[1] != ''){
              return <div key={index}>
                {<a href={data[1]}><img className='w-7 h-7 cursor-pointer bg-white rounded-2xl' src={socialMediaLogo[data[0]]} alt={`${data[0]}Logo`} /></a>}
              </div>
            }
          }) : '' } {/* add link here */}
          <button onClick={() => setOpenUpdateLinkBox(prev => !prev)} className={`${user && (checkFullLink(user?.objectOfContactLink) ? '' : 'hidden')} h-fit bg-white rounded-full p-[10px] py-[5px]`}><i className="text-fancyBlack fa-solid fa-plus"></i></button>
        </div>
      </div>
      <div className='flex flex-col gap-4 p-[1.5rem] ml-4'>
        <h1 className='text-2xl font-bold'>{user?.name}</h1>
        <p className={`text-fancyBlack text-lg ${user?.introduction ? '' : 'hidden'}`}>{user?.introduction}</p>
        <p className='text-fancyBlack text-lg'>{user && `Join At ${dateConvertor(user.dateCreateAcc)}`}</p>
        <div className='flex gap-10 mb-6'>
          <h2 className='text-fancyBlack text-lg'><span className='font-semibold'>{user?.numsOfFollowers}</span> <span className='font-light'>Followers</span></h2>
          <h2 className='text-fancyBlack text-lg'><span className='font-semibold'>0</span> <span className='font-light'>Likes</span></h2> {/* get likes by summing all likes from user post */}
          <h2 className='text-fancyBlack text-lg'><span className='font-semibold'>{numsOfPosts ? numsOfPosts : '0'}</span> <span className='font-light'>Posts</span></h2>
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='sticky top-0 z-10 bg-white flex justify-around items-center'>
          <button onClick={() => setAtPostSec(true)} className={`text-lg transition-all hover:bg-neutral-50 ${atPostSec ? 'text-fancyBlack font-semibold p-3 w-full border-b-[3px] border-fancyDarkGray' : 'text-fancyDarkGray p-3 w-full border-b-[2px]'}`}>Posts</button>
          <button onClick={() => setAtPostSec(false)} className={`text-lg transition-all hover:bg-neutral-50 ${atPostSec ? 'text-fancyDarkGray p-3 w-full border-b-[2px]' : 'text-fancyBlack font-semibold p-3 w-full border-b-[3px] border-fancyDarkGray'}`}>Messages</button>
        </div>
        {atPostSec ? <UserPost userId={user?._id} sessionId={user?._id} setNumsOfPosts={setNumsOfPosts}/> : <UserMessage/>}
      </div>
    </>
  )
  
}

export default MainUser