import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import UserPost from './user\'s partial/UserPost'
import UserMessage from './user\'s partial/UserMessage'
import { socialMediaLogo } from '../data/website'


const OtherUser = (props) => {

  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [numsOfPosts, setNumsOfPosts] = useState(0)
  const [atPostSec, setAtPostSec] = useState(true)
  const [followed, setFollowed] = useState(false)

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
  
  const userFollowed = async (outcome) => {
    setFollowed(prev => !prev)
    try{
        const response = await axios.put(`http://localhost:3000/user/${props.sessionId}`, { type: outcome, author: user?._id }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        if(response?.data?.error){
            navigate('/postInfo/error')
            return
        }
    } catch(e){
        console.log(e)
        navigate('/error')
    }
  }

  function containsArray(arr, subArr) {
    return arr.some(inner => inner.every((a, i) => a === subArr[i]));
}

  useEffect(() => {
      const followClarify = async (id) => {
        try{
          const response = await axios.get(`http://localhost:3000/user/info/${id}`)
          const userInfo = response.data
          if(response && userInfo && user){
              setFollowed(containsArray(userInfo.listOfFollowed, [user._id, user.name]))
          }
        } catch(e){
          console.log(e)
          navigate('/userInfo/error')
        }
      }
      followClarify(props.sessionId)
    }, [user])
    
    useEffect(() => {
      const fetchUserInfo = async () => {
        try {
          const response = await props.userInfo;
          setUser(response);
        } catch (e) {
          navigate('/userInfo/error');
        }
      };
      fetchUserInfo();
  }, []);
  
  return (
    <>
      <div className='flex flex-col'>
        <div className='relative w-full min-h-48 bg-fancyBlack '>
          <div className='absolute top-[55%] left-[1.5rem] w-[10em] h-[10em] bg-fancyBlack cursor-pointer rounded-full border-4 border-white'></div>
        </div>
        <div className='flex gap-2 self-end items-center m-4'>
          <div className='flex gap-2'>
            {user?.objectOfContactLink && props.objectMap(user.objectOfContactLink) ? props.objectMap(user.objectOfContactLink).map((data, index) => {
                if(data[1] != null && data[1] != ''){
                  return <div key={index}>
                    {<a href={data[1]}><img className='w-7 h-7 cursor-pointer bg-white rounded-2xl' src={socialMediaLogo[data[0]]} alt={`${data[0]}Logo`} /></a>}
                  </div>
                }
              }) : '' } {/* add link here */}
          </div>
          <button onClick={() => userFollowed('follow')}
                  className={`${followed ? 'shadow-lg shadow-fancyInpGray' : ''} w-fit bg-fancyBlack text-white font-semibold px-4 py-1 h-fit 
                      rounded-2xl transition ease-in hover:shadow-lg hover:shadow-fancyInpGray`}>
                      {followed ? 'Followed' : 'Follow'}
                  </button>
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
        {atPostSec ? <UserPost userId={user?._id} sessionId={props.sessionId} setNumsOfPosts={setNumsOfPosts}/> : <UserMessage/>}
      </div>
    </>
  )

}

export default OtherUser