import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import userImg from '../images/pencil.png'

const Navbar = (props) => {
  
  const navigate = useNavigate();

  const todoRef = useRef()

  const [listOfTodos, setListOfTodos] = useState([])
  const [allowShowTodo, setAllowShowTodo] = useState(true)

  useEffect(() => {
    setListOfTodos(props.userInfo && props.userInfo.listOfTodos)
  }, [props.userInfo])

  const advanceAddTodo = (event) => {
    if(event && event.key == 'Enter'){
      addTodo()
    }
  }

  const showTodo = () => {
    setAllowShowTodo(prev => !prev)
  }

  const addTodo = async () => {
    if(!todoRef.current.value){ 
      return
    }
    setListOfTodos(prev => [...prev, todoRef.current.value])
    try{
      await axios.put(`http://localhost:3000/user/${props.userId}`, { type: 'addTodo', todo: todoRef.current.value }, {
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    } catch(e){
      navigate('/userInfo/error')
    }
  }
  
  const deleteTodo = async (todo) => {
    try{
      const response = await axios.put(`http://localhost:3000/user/${props.userId}`, { type: 'deleteTodo', choosen: todo }, {
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }})
      if(response && response.data){
        setListOfTodos(response.data)
      }
    } catch(e){
      navigate('/userInfo/error')
    }
  }

  const clearTodo = async () => {
    setListOfTodos([])
    try{
      await axios.put(`http://localhost:3000/user/${props.userId}`, { type: 'clearTodos' }, {
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    } catch(e){
      navigate('userInfo/error')
    }
  }

  const logout = () => {
    props.logOut()
  }

  return (
    <>
      <div className='flex flex-col gap-8 border-x-[1px] pb-8 max-h-[100vh] overflow-y-auto scrollbar-hide'>
        <div className='flex justify-between items-center pt-6 px-8'>
          <div className='flex items-center gap-2'>
            <i className="fa-solid fa-paper-plane text-xl"></i>
            <h1 className='text-xl font-semibold italic'>ShareTogether</h1>
          </div>
          <button title='LogOut' onClick={logout}><i className="fa-solid fa-right-from-bracket text-xl"></i></button>
        </div>
        <ol className='flex flex-col gap-1 m-auto w-[88%] px-8'>
          <li onClick={() => navigate('/')} className='flex items-center gap-1 text-lg p-2 hover:bg-fancyShadowGray transition-al cursor-pointer'><i className="fancyBlack w-8 fa-solid fa-house"></i><h1 className='text-fancyDarkGray'>Home</h1></li>
          <li onClick={() => navigate('/user/search')} className='flex items-center gap-1 text-lg p-2 hover:bg-fancyShadowGray transition-all cursor-pointer'><i className="fancyBlack w-8 fa-solid fa-user-group"></i><h1 className='text-fancyDarkGray'>Find Someone?</h1></li>
          <li onClick={() => navigate(`/user/${props.userId}`)} className='flex items-center gap-1 text-lg p-2 hover:bg-fancyShadowGray transition-al cursor-pointer'><i className="fancyBlack w-8 fa-solid fa-note-sticky"></i><h1 className='text-fancyDarkGray'>Your Post</h1></li>
          <li onClick={() => navigate('/information')} className='flex items-center gap-1 text-lg p-2 hover:bg-fancyShadowGray transition-all cursor-pointer'><i className="fancyBlack w-8 fa-solid fa-circle-info"></i><h1 className='text-fancyDarkGray'>Your Information</h1></li>
          <li onClick={() => navigate('/feedback')} className='flex items-center gap-1 text-lg p-2 hover:bg-fancyShadowGray transition-all cursor-pointer'><i className="fancyBlack w-8 fa-solid fa-circle-question"></i><h1 className='text-fancyDarkGray'>Feedback and the Media</h1></li>
        </ol>
        <div className='flex flex-col gap-6 bg-fancyInpGray p-6 rounded-2xl w-[78%] m-auto sticky'>
          <div className='flex items-center justify-between'>
            <h1 className='text-xl font-bold tracking-wide'>Have any idea?</h1>
            <a href={`/user/edit/${props.userId}`}><img className='w-8 h-8 cursor-pointer bg-white rounded-2xl' src={userImg} alt="edit" /></a>
          </div>
          <textarea className='w-full h-44 focus:outline-none p-4' name="ideaPlayground" id="playground"></textarea> {/*this place should be onchange with localStorage to store temporary idea*/}
          <p>If you have any idea whilst surfing others’ post, just note here!</p>
        </div>
        <div className='flex flex-col w-[78%] border-2 border-fancyInpGray m-auto rounded'>
          <div className='flex justify-between p-4 px-6'>
            <h1 className='text-xl font-semibold italic'>Todo List</h1>
            <button onClick={() => showTodo()}><i className={`fa-solid fa-caret-down transition-all ${allowShowTodo ? 'rotate-180' : 'rotate-0'}`}></i></button>
          </div>
          <div className={`transition-all ${ allowShowTodo ? 'max-h-[185px]' : 'max-h-0'} bg-fancyInpGray overflow-y-auto pt-[.2px] pb-[.4px]`}>
            {listOfTodos && listOfTodos.length > 0 ? listOfTodos.map((todo, index) => {
              return <div key={index} className='flex items-center gap-6 bg-fancyShadowGray p-4 px-6 my-[1px]'>
              <button onClick={() => deleteTodo(todo)} className='bg-white w-4 h-4 rounded-full shadow-rounded'></button>
              <h2 className='text-lg font-semibold'>{todo}</h2>
            </div>
            })
             : ''}
          </div>
          <div className='flex items-center gap-4 p-4'>
            <input ref={todoRef} onKeyPress={advanceAddTodo} className='w-full p-6 py-3 rounded bg-fancyInpGray focus:outline-none' type="text" placeholder='Add Todo here'/>
            <button onClick={() => addTodo()} className='h-fit bg-fancyInpGray rounded-full p-[17px] py-[12px]'><i className="text-fancyBlack fa-solid fa-plus"></i></button>
            <button onClick={() => clearTodo()}className='h-fit bg-fancyInpGray rounded-full p-[17px] py-[12px]'><i className="text-fancyBlack fa-solid fa-trash-can"></i></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar