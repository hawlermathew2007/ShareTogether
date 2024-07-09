import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const SearchUser = ({ userId }) => {

  const navigate = useNavigate()

  const usernameRef = useRef()
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    searchUser('');
  }, []);

  const searchUser = async (username) => {
    try {
      const response = await axios.get('http://localhost:3000/user/info', { params: { name: username } });
      setData(response.data);
      setError(null);
    } catch (e) {
      setData([]);
      setError('Unable to view users :(');
    }
  };

  const fetchData = (event) => {
    if (event && event.key === 'Enter') {
      searchUser(usernameRef.current.value);
    }
  };

  return (
    <>
      <div className='flex flex-col border-x-[1px] max-h-[100vh] overflow-y-auto scrollbar-hide'>
        <input
          ref={usernameRef}
          onKeyPress={fetchData}
          className='p-6 py-3 rounded-3xl m-4 bg-fancyInpGray focus:outline-none'
          type="text"
          placeholder='Search User'
        />
        {error ? (
          <p>{error}</p>
        ) : (data && data.length == 0 ? 'Cannot find any user with this name :<' :
          data.map((user, index) => {
            return user._id == userId ? '' : <div onClick={() => navigate(`/user/${user._id}`)} key={index} className='flex items-center gap-3 border-y-[1px] p-4 cursor-pointer'>
                <i className="fa-solid fa-circle-user text-5xl cursor-pointer"></i>
                <div className='flex flex-col'>
                  <h1 className='text-lg font-semibold'>{user.name}</h1>
                  <p className='m-0 text-sm'>{user.introduction || 'I am a user in ShareTogether'}</p>
                </div>
              </div>;
          })
        )}
      </div>
      <div className='flex flex-col border-x-[1px]'>
        <h1 className='p-6 px-8 text-xl font-bold mb-8'>Top Followed</h1>
        <h1 className='p-6 px-8 text-xl font-bold'>Following</h1>
      </div>
    </>
  );
};

export default SearchUser;