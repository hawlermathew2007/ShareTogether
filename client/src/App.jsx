import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios'
import Homepage from './components/Homepage'
import NavBar from './components/NavBar'
import Login from './components/Login'
import Register from './components/Register'
import Authentication from './components/Authentication'
import Users from './components/Users'
import Information from './components/Information';
import Feedback from './components/Feedback';
import IdPost from './components/IdPost'
import SearchUser from './components/SearchUser'
import CreatePost from './components/CreatePost'
import Error from './components/partials/Error';

// fix the stupid bug of not rerendering (symptoms: it shows 2 column not 3 column)

function App() {

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [userId, setUserId] = useState(localStorage.getItem('userId'))
  const [userInfo, setUserInfo] = useState()
  const [error, setError] = useState(null)

  useEffect(() =>{
    if(userId == null){
      navigate('/login')
    }
  }, [userId]) 

  useEffect(() => {
    const getUserInfo = async (id) => {
      try{
        const response = await axios.get(`http://localhost:3000/user/info/${id}`)
        if(response && response.data){
          setUserInfo(response.data)
        }
      } catch(e){
        navigate('/userInfo/error')
      }
    }
    getUserInfo(userId)
  }, [])

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
      await axios.get('http://localhost:3000/logout')
      navigate('/login');
    } catch(e){
      navigate('/logout/error')
    }
  }

  return (
    <>
      <div className='grid grid-cols-[1fr_1fr_1fr]'>
        { userId != null && !pathname.includes('/user/edit') && error == null && <NavBar userId={userId} userInfo={userInfo} logOut={logOut}/>}
        <Routes>
    var counter = 0;
          <Route path='/' element={<Homepage userId={userId} listOfFollowed={userInfo && userInfo.listOfFollowed} createInfiniteScoll={createInfiniteScoll}/>}/>
          <Route path='/login' element={<Login userId={userId} setUserId={setUserId}/>}/>
          <Route path='/register' element={<Register userId={userId}/>}/>
          <Route path='/user/search' element={<SearchUser userId={userId}/>}/>
          <Route path='/user/edit/*' element={<CreatePost userId={userId} name={userInfo && userInfo.name}/>}/>
          <Route path='/user/:id' element={<Users userId={userId}/>}/>
          <Route path='/post/:id' element={<IdPost userId={userId}/>}/>
          <Route path='/information' element={<Information userInfo={userInfo}/>} />
          <Route path='/feedback' element={<Feedback/>} />
          <Route path='*' element={<Error setError={setError}/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
