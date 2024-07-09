import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserPost from './user\'s partial/UserPost'
import UserMessage from './user\'s partial/UserMessage'

const MainUser = ({ userInfo }) => {

  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [numsOfPosts, setNumsOfPosts] = useState(0)
  const [atPostSec, setAtPostSec] = useState(true)

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
  
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await userInfo;
        setUser(response);
      } catch (e) {
        navigate('/userInfo/erro');
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <>
      <div className='relative w-full min-h-48 mb-20 bg-fancyBlack '>
        <div className='absolute top-[55%] left-[1.5rem] w-[10em] h-[10em] bg-fancyBlack cursor-pointer rounded-full border-4 border-white'></div>
      </div>
      <div className='flex flex-col gap-4 p-[1.5rem] ml-4'>
        <h1 className='text-2xl font-bold'>{user && user.name}</h1>
        <p className={`text-fancyBlack text-lg ${user && user.introduction ? '' : 'hidden'}`}>{user && user.introduction}</p>
        <p className='text-fancyBlack text-lg'>{user && `Join At ${dateConvertor(user.dateCreateAcc)}`}</p>
        <div className='flex gap-10 mb-6'>
          <h2 className='text-fancyBlack text-lg'><span className='font-semibold'>{user && user.numsOfFollowers}</span> <span className='font-light'>Followers</span></h2>
          <h2 className='text-fancyBlack text-lg'><span className='font-semibold'>0</span> <span className='font-light'>Likes</span></h2> {/* get likes by summing all likes from user post */}
          <h2 className='text-fancyBlack text-lg'><span className='font-semibold'>{numsOfPosts ? numsOfPosts : '0'}</span> <span className='font-light'>Posts</span></h2>
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='sticky top-0 z-10 bg-white flex justify-around items-center'>
          <button onClick={() => setAtPostSec(true)} className={`text-lg transition-all hover:bg-neutral-50 ${atPostSec ? 'text-fancyBlack font-semibold p-3 w-full border-b-[3px] border-fancyDarkGray' : 'text-fancyDarkGray p-3 w-full border-b-[2px]'}`}>Posts</button>
          <button onClick={() => setAtPostSec(false)} className={`text-lg transition-all hover:bg-neutral-50 ${atPostSec ? 'text-fancyDarkGray p-3 w-full border-b-[2px]' : 'text-fancyBlack font-semibold p-3 w-full border-b-[3px] border-fancyDarkGray'}`}>Messages</button>
        </div>
        {atPostSec ? <UserPost userId={user && user._id} sessionId={user && user._id} setNumsOfPosts={setNumsOfPosts}/> : <UserMessage/>}
      </div>
    </>
  )
  
}

export default MainUser