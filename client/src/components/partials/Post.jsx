import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import IdPost from '../IdPost';

const Post = (props) => {

    const navigate = useNavigate()

    const [liked, setLiked] = useState(props.likes)
    const [copyed, setCopyed] = useState(props.copies)
    const [followed, setFollowed] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [showCopiedMessage, setShowCopiedMessage] = useState(false);

    function containsArray(arr, subArr) {
        return arr.some(inner => inner.every((a, i) => a === subArr[i]));
    }

    useEffect(() => {
        const followClarify = async (id) => {
          try{
            const response = await axios.get(`http://localhost:3000/user/info/${id}`)
            const userInfo = response?.data
            // console.log(response?.data?.error, userInfo?.data?.error)
            if(response?.data?.error != null && userInfo?.data?.error != null){
                setIsLiked(userInfo?.listOfliked.includes(props.id))
                setFollowed(containsArray(userInfo.listOfFollowed, [props.author, props.authorName]))
            }
          } catch(e){
            console.log(e)
            navigate('/userInfo/error')
          }
        }
        followClarify(props.sessionId)
        
      }, [])

    const dateConvertor = (dateString) => {
        const date = new Date(dateString);

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZone: 'UTC'
        };

        return date.toLocaleDateString('en-US', options);
    }

    const userFollowed = async (outcome) => {
        setFollowed(prev => !prev)
        try{
            console.log('asdasd')
            const response = await axios.put(`http://localhost:3000/user/${props.sessionId}`, { type: outcome, author: props.author }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            if(response.data && response.data.error){
                navigate('/postInfo/error')
                return
            }
            if(props){
                props.setFolloweds(response.data)
            }
        } catch(e){
            console.log('yeah')
            navigate('/error')
        }
    }

    const copyLink = async (link) => {
        
        if (!navigator.clipboard) return

        try{
            await navigator.clipboard.writeText(link)
            console.log('Copied')
            setShowCopiedMessage(true)

            const timer = setTimeout(() => {
                setShowCopiedMessage(false);
              }, 2500);
          
              return () => clearTimeout(timer);

        } catch(e){
            console.error('Failed to copy', error)
        }
    }

    const copyedOrLiked = async (outcome) => {
        console.log('safdsafh')
        try{
            const response = await axios.put(`http://localhost:3000/post/${props.id}`, { type: outcome, userId: props.author }, {
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            console.log(response.data)
            if(response.data && !response.data.error){
                if(outcome == 'like'){
                    setLiked(response.data.liked)
                    setIsLiked(response.data.isLiked)
                } else if(outcome == 'copy'){
                    setCopyed(response.data.copyed)
                }else{
                    return
                }
            }
            return
        } catch(e){
            navigate('/error')
        }
    }

    return (
        <div className={`flex flex-col gap-4 bg-fancyShadowGray ${props.inIdPost ? 'max-h-[100vh]' : 'h-[16rem'} border-b-[1px] p-6`}>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='text-lg font-semibold'>{props.authorName}</h1>
                    <p className='text-sm'>{dateConvertor(props.timePost)}</p>
                </div>
                <button onClick={() => userFollowed('follow')}
                className={`${followed ? 'shadow-lg shadow-fancyInpGray' : ''} bg-fancyBlack text-white font-semibold px-4 py-1 h-fit 
                    rounded-2xl transition ease-in hover:shadow-lg hover:shadow-fancyInpGray 
                    ${props.sessionId && props.author == props.sessionId ? 'hidden' : ''}`}>
                    {followed ? 'Followed' : 'Follow'}
                </button>
            </div>
            <div>
                <strong>Title: {props.title}</strong>
                <p>{props.topic}</p>
            </div>
            <p onClick={() => navigate(`/post/${props.id}`)} className={`w-full ${props.inIdPost ? 'h-fit' :'max-h-[18em]'} overflow-auto bg-white text-lg rounded-lg p-4 border-[2px] cursor-pointer`}>{props.essay}</p>
            <div className='flex justify-between mx-2'>
                <div className='flex gap-4 justify-center'>
                    <button><i className="fa-regular fa-comment text-xl"></i></button>
                    <h2>0</h2>
                </div>
                <div className='flex gap-4 justify-center'>
                    <button onClick={() => copyedOrLiked('like')}> { isLiked ?
                        <i className="fa-solid fa-heart text-xl text-red-600 zoom-in"></i>
                        :
                        <i className="fa-regular fa-heart text-xl zoom-out"></i>
                    }</button>
                    <h2>{liked}</h2>
                </div>
                <div className='flex gap-4 justify-center'>
                    <button className={`relative ${showCopiedMessage ? '' : 'before:hidden'} before:content-['Copied!'] before:absolute before:top-[-180%] before:left-[-80%]
                    before:bg-fancyBlack before:text-fancyShadowGray before:p-2 before:px-3 before:rounded-md before:text-shadow before:shadow-lg before:shadow-fancyInpGray`} onClick={() => { copyedOrLiked('copy'); copyLink(`http://localhost:5173/post/${props.id}`)}}><i className="fa-solid fa-link text-xl"></i></button>
                    <h2>{copyed}</h2>
                </div>
            </div>
        </div>
    )
}

export default Post