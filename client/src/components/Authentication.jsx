import React from 'react'
import Login from './partials/Login'
import Register from './partials/Register'
import createImg from '../images/create.png'
import shareImg from '../images/share.png'
import belovedImg from '../images/beloved.png'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'

const Authentication = ({ userId, setUserId }) => {

    const navigate = useNavigate()

    const { pathname } = useLocation()
    const { method } = useParams()

    return (
        <>
        <div className='flex'>
            <div className='grid place-items-center w-[42%] h-svh bg-fancyInpGray'>
                {
                    method == 'login' ? <Login userId={userId} setUserId={setUserId}/> 
                    :
                    method == 'register' ? <Register userId={userId}/>
                    :
                    navigate('/unknownPage')
                }
            </div>
            <div className='flex flex-col items-center justify-between w-full h-svh overflow-hidden'>
                <div>Welcome to ShareTogether</div>
                <div className='flex gap-4 translate-y-24'>
                    <div className='flex flex-col gap-2 translate-y-[24%]'>
                        <h1 className='text-xl italic font-semibold'><i className="fa-solid fa-pen"></i> Create</h1>
                        <img className='w-[16rem]' src={createImg} alt="create" />
                    </div>
                    <div className='flex flex-col gap-2 translate-y-[12%]'>
                        <h1 className='text-xl italic font-semibold'><i className="fa-solid fa-paper-plane"></i> Share</h1>
                        <img className='w-[16rem]' src={shareImg} alt="share" />
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1 className='text-xl italic font-semibold'><i className="fa-solid fa-heart"></i> Beloved</h1>
                        <img className='w-[16rem]' src={belovedImg} alt="beloved" />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Authentication