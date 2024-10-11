import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios'
import Homepage from './components/Homepage'
import NavBar from './components/NavBar'
import Authentication from './components/Authentication'
import Users from './components/Users'
import Information from './components/Information';
import Feedback from './components/Feedback';
import IdPost from './components/IdPost'
import SearchUser from './components/SearchUser'
import CreatePost from './components/CreatePost'
import Error from './components/partials/Error';

// fix the stupid bug of not rerendering (symptoms: it shows 2 column not 3 column)
// put http://localhost:3000 to env

function App() {

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [userId, setUserId] = useState(localStorage.getItem('userId'))
  const [userInfo, setUserInfo] = useState()
  const [error, setError] = useState(null)

  useEffect(() =>{
    console.log((userId == null && localStorage.getItem('userId') == null) || (userId == 'undefined' && localStorage.getItem('userId') == 'undefined'))
    console.log(userId, localStorage.getItem('userId'))
    if((userId == null && localStorage.getItem('userId') == null) || (userId == 'undefined' && localStorage.getItem('userId') == 'undefined')){
      console.log('go to login')
      navigate(`/authentication/login`)
    }
  }, [userId]) 

  useEffect(() => {
    const getUserInfo = async (id) => {
      try{
        console.log('check: ', userId)
        if(id != null && id != ''){
          const response = await axios.get(`http://localhost:3000/user/info/${id}`)
          if(response?.data){
            setUserInfo(response.data)
            return
          }
        } else{
          const responseGg = await axios.get(`http://localhost:3000/loginGg/success`)
            if(responseGg?.data){
            localStorage.setItem('userId', responseGg.data._id)
            setUserId(responseGg.data._id)
            setUserInfo(responseGg.data)
            return
          }
        }
      } catch(e){
        console.log(e)
        navigate('/userInfo/error')
      }
    }
    getUserInfo(userId)
  }, [pathname])

  // please use useContext hook for this
  const createInfiniteScoll = (datas, userId) => {
    const limitedVisiblePost = 4;
    const tempList = [];
    let tempElement = [];
    for(let i = 0; i < datas.length; i ++){
      if(datas[i].author != userId){
        tempElement.push(datas[i])
      }
      if((i + 1) % limitedVisiblePost === 0){
        tempList.push(tempElement)
        tempElement = []
      }
    }
    if(tempElement.length != 0){
      tempList.push(tempElement)
    }
    return tempList
    // distrribute page with limited data of each page

  }

  const logOut = async () => {
    try{
      localStorage.removeItem('userId')
      // setUserId(null)
      await axios.get('http://localhost:3000/logout')
      navigate('/authentication/login');
    } catch(e){
      navigate('/logout/error')
    }
  }
  
  const check = async () => {
    console.log(localStorage.getItem('userId'),userId, userInfo)
    try{
      await axios.get('http://localhost:3000/checkUser')
    } catch(e){
      console.log(e)
    }
  }

  return (
    <>
      <div className={`${!pathname.includes('/authentication') ? 'grid grid-cols-[1fr_1fr_1fr]' : ''}`}>
        { userId != null && !pathname.includes('/user/edit') && error == null && <NavBar userId={userId} userInfo={userInfo} logOut={logOut}/>}
        <Routes>
          <Route path='/' element={<Homepage userId={userId} listOfFollowed={userInfo?.listOfFollowed} createInfiniteScoll={createInfiniteScoll}/>}/>
          <Route path='/authentication/:method' element={<Authentication userId={userId} setUserId={setUserId}/>}/>
          <Route path='/user/search' element={<SearchUser userId={userId}/>}/>
          <Route path='/user/edit/*' element={<CreatePost userId={userId} name={userInfo?.name}/>}/>
          <Route path='/user/:id' element={<Users userId={userId}/>}/>
          <Route path='/post/:id' element={<IdPost userId={userId}/>}/>
          <Route path='/information' element={<Information userInfo={userInfo}/>} />
          <Route path='/feedback' element={<Feedback/>} />
          <Route path='*' element={<Error setError={setError}/>}/>
        </Routes>
        <button onClick={() => check()}>Check</button>
        <button onClick={() => logOut()}>Emergency</button>
      </div>
    </>
  )
}

export default App
