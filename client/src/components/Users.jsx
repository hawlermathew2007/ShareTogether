import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import MainUser from './partials/MainUser'
import OtherUser from './partials/OtherUser'

const Users = ({ userId }) => {

  const navigate = useNavigate()

  const { id } = useParams()
  const [error, setError] = useState(null)

  const getUserInfo = async (id) => {
    try{
      const response = await axios.get(`http://localhost:3000/user/info/${id}`)
      if(response && response.data && response.data.error == null){
        return response.data
      } else{
        setError(response.data.error)
        return null
      }
    } catch(e) {
      setError(e)
      return null
    }
  }

  const objectMap = (obj) => {
    return Object.entries(obj)
  }

  const checkFullLink = (obj) => {
    return Object.values(obj).some((value) => {
      return value == null || value == ''
    })
  }

  return (
    <>
      <div className="flex flex-col gap-2 border-x-[1px] max-h-[100vh] overflow-y-auto scrollbar-hide">
        {error ? navigate('/userId/error') : (
          <>
            {userId && id == userId ? (
              <MainUser userInfo={getUserInfo(id)} objectMap={objectMap} checkFullLink={checkFullLink}/>
            ) : (
              <OtherUser userInfo={getUserInfo(id)} sessionId={userId} objectMap={objectMap}/>
            )}
          </>
        )}
      </div>
      <div className="flex flex-col border-x-[1px]">
        <h1 className="p-6 px-8 text-xl font-bold mb-8">Topic</h1>
        <h1 className="p-6 px-8 text-xl font-bold">Tags</h1>
      </div>
    </>
  );
}

export default Users