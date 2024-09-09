import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Post from './partials/Post'
import userImg from '../images/pencil.png'

// You need to create the Observer here

const Homepage = (props) => {
  
  const navigate = useNavigate();
  const [data, setData] = useState([])
  const [datas, setDatas] = useState([])
  const [followeds, setFolloweds] = useState([])
  const [sectionNo, setSectionNo] = useState(0)
  const [loadingPost, setLoadingPost] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  
  const title = useRef()
  const observer = useRef()
  const lastPostElement = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !loadingPost && hasMore) {
        setLoadingPost(true);
        if (sectionNo + 1 < datas.length) {
          setData(prev => [...prev, ...datas[sectionNo + 1]]);
          setSectionNo(prev => prev + 1);
        } else {
          setHasMore(false); // No more data to load
        }
        setLoadingPost(false);
      }
    });

    if (node) observer.current.observe(node);
  }, [loadingPost, hasMore, sectionNo, datas]);

  useEffect(() => {
    searchPost('')
  }, [])

  useEffect(() => {
    setFolloweds(props.listOfFollowed)
  }, [props.listOfFollowed])

  const searchPost = async (title) => {
    try{
        const response = await axios.get('http://localhost:3000/post/info', {params: {title: title}})
        if(response && response.data){
          setDatas(props.createInfiniteScoll(response.data, props.userId))
          setData(props.createInfiniteScoll(response.data, props.userId)[sectionNo])
        }
      } catch(e){
        setData({error: e})
    }
  }

  const fetchData = (event) => {
    if(event && event.key == 'Enter'){
      searchPost(title.current.value)
    }
  }

  return (
    <>
      <div className='flex flex-col border-x-[1px] max-h-[100vh] overflow-y-auto scrollbar-hide'>
        <input ref={title} onKeyPress={fetchData} className='p-6 py-3 rounded-3xl m-4 bg-fancyInpGray focus:outline-none' type="text" placeholder='Search Post'/>
        <div className='flex justify-between items-center border-y-[1px] p-4 px-6'>
          <div className='flex items-center text-lg gap-4'>
            <i onClick={() => navigate(`/user/${props.userId}`)} className="fa-solid fa-circle-user text-5xl cursor-pointer"></i>
            <h1>What's up, Bud?</h1>
          </div>
        <a href={`/user/edit/${props.userId}`}><img className='w-8 h-8 cursor-pointer' src={userImg} alt="edit" /></a>
        </div>
        {data && data.error ? data.error : data && data.length == 0 ? 'Cannot find any Posts with this tittle :(' :
          data.map((post, index) => {
            if(props.userId && post.author && post.author != props.userId){
              if(index + 1 === data.length) {
                return <div ref={lastPostElement} key={index}><Post inIdPost={false} setFolloweds={setFolloweds} id={post._id} author={post.author} 
                  authorName={post.authorName} sessionId={props.userId} title={post.title} topic={post.topic} essay={post.essay} 
                  timePost={post.datePost} likes={post.liked} copies={post.copyed}/></div>
              } else{
                return <div key={index}><Post inIdPost={false} setFolloweds={setFolloweds} id={post._id} author={post.author} 
                  authorName={post.authorName} sessionId={props.userId} title={post.title} topic={post.topic} essay={post.essay} 
                  timePost={post.datePost} likes={post.liked} copies={post.copyed}/></div>
              }
            }
          })
        }
        <h1>{loadingPost && 'Loading Posts...'}</h1>
      </div>
      <div className='flex flex-col gap-4 border-x-[1px]'>
        <div>
          <h1 onClick={() => data && setSectionNo(prev => prev + 1)} className='px-8 pt-7 pb-5 text-xl font-bold'>Followed - {followeds && followeds.length} -</h1>
          <div className='flex flex-col gap-2 px-8 max-h-[12rem] overflow-y-auto scrollbar-hide'>
            {followeds ? followeds.length == 0 ? 'You follow nobody :)' : followeds.map((followed, index) => {
              return <div key={index} onClick={() => navigate(`/user/${followed[0]}`)}
                          className='flex items-center gap-6'>
                <i className="fa-solid fa-circle-user text-4xl cursor-pointer"></i>
                <h2 className='text-lg font-semibold'>{followed[1]}</h2>
              </div>
            })
            : 'Loading'}
          </div>
        </div>
        <h1 className='p-6 px-8 text-xl font-bold'>Favorite Tags</h1>
      </div>
    </>
  )
}

export default Homepage