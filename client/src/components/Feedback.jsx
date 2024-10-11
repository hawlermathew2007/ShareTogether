import React, { useState } from 'react'
import { informationNav } from './data/website'

// add id to <li> and <div>

const Feedback = () => {

    const [clickHeadline, setClickHeadlines] = useState(informationNav.map((_, index) => index == 0 ? true : false))

    const [clickArray, setClickArray] = useState(informationNav.map(() => false))

    const clickHeadlineAction = (index, func) => {
        func(prev => {
            let new_array = []
            for(var i; i < prev.length; i++){
                new_array.push(false)
            }
            new_array[index] = !new_array[index]
            return new_array 
        })
    }

    const clickAction = (index, func) => {
        func(prev => {
            let new_array = [...prev]
            new_array[index] = !new_array[index]
            return new_array 
        })
    }

    return (
        <>
            <div className='flex flex-col gap-4 border-x-[1px] p-10 max-h-[100vh] overflow-y-auto scrollbar-hide'>
                <h1 className='text-3xl font-bold'>Introduction</h1>
                <p className='text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum libero quibusdam rem voluptas, quos ut. Mollitia velit voluptas consequatur odio, voluptatibus obcaecati incidunt debitis omnis consectetur,mLorem ipsum dolor sit amet consectetur adipisicing elit. Harum libero quibusdam rem voluptas, quos ut.nis consectetur, officia deleniti itaque quidem
                </p>
                <p className='text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum libero quibusdam rem voluptas, quos ut. Mollitia velit voluptas consequatur odio, voluptatibus obcaecati incidunt debitis omnis consectetur,mLorem ipsum dolor sit amet consectetur adipisicing elit. Harum libero quibusdam rem voluptas, quos ut.nis consectetur, officia deleniti itaque quidem
                </p>
                <ul className='list-disc ml-8'>
                    <li className='text-lg'>Theme just like Facebook and Twitter harmonized</li>
                    <li className='text-lg'>Nice place for u to roast each other</li>
                    <li className='text-lg'>An alter of Wattpad</li>
                    <li className='text-lg'>An INDE LMAO MEDIA</li>
                </ul>
                <p className='text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum libero quibusdam rem voluptas, quos ut. Mollitia velit voluptas consequatur odio, voluptatibus obcaecati incidunt debitis omnis consectetur,mLorem ipsum dolor sit amet consectetur adipisicing elit. Harum libero quibusdam rem voluptas, quos ut.nis consectetur, officia deleniti itaque quidem
                </p>
            </div>
            <div className='flex flex-col gap-10 text-fancyShadowBlack border-x-[1px] p-12 py-8'>
                <ol className='flex flex-col'>
                    {informationNav.map((info, index) => {
                        return <div key={index} className='flex flex-col cursor-pointer'>
                            <div onClick={() => {clickHeadlineAction(index, setClickHeadlines)}} className={`flex justify-between items-center transition-all ${clickHeadline[index] ? 'bg-slate-100' : 'hover:bg-slate-100'}`}>
                                <div className='flex items-center gap-3'>
                                    {info.partials ? <i className={`fa-solid fa-bars transition-all ${clickArray[index] ? 'translate-x-[-100%] opacity-0' : 'translate-x-[0] opcity-100'}`}></i> : <i className="fa-solid fa-minus transition-all"></i>}
                                    <li className={`text-lg py-2 font-semibold transition-all ${clickArray[index] ? 'translate-x-[-1.5rem]' : 'translate-x-[0]'}`}> {info.headline}</li>
                                </div>
                                {info.partials ? <button onClick={() => {clickAction(index, setClickArray)}}><i className={`fa-solid fa-angle-up mr-4 transition-all ${clickArray[index] ? 'rotate-0' : 'rotate-180'}`}></i></button> : ''}
                            </div>
                            <div className={`flex flex-col py-${clickArray[index] ? '2' : '1'} transition-all ${clickArray[index] ? 'max-h-fit' : 'max-h-0'} overflow-hidden`}>
                                {info.partials && info.partials.map((partial, partialIndex) => (
                                    <button id={partial.toLowerCase()} className=' w-fit text-base text-fancyDarkGray' key={`${index}-${partialIndex}`}>
                                        <div className='flex items-center gap-3'>
                                            <i className="fa-solid fa-minus"></i>
                                            <li className='w-fit text-lg font-normal'>{partial}</li>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                    })}
                </ol>
                <div className='flex flex-col gap-6 text-xl font-semibold italic bg-fancyShadowGray rounded p-6 border-2 border-fancyInpGray'>
                    <div className='flex justify-between items-center'>
                        <h1>Feedback here</h1>
                        <button className='cursor-pointer mr-4 rotate-45' title='Send Me Here!'><i className="fa-solid fa-paper-plane text-xl"></i></button>
                    </div>
                    <textarea className='w-full h-40 rounded border-2 border-fancyInpGray focus:outline-none p-4' name="feedback" id="feedback"></textarea>
                </div>
            </div>
        </>
    )
}

export default Feedback