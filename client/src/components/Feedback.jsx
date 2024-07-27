import React from 'react'
import { informationNav } from './data/website'

const Feedback = () => {
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
                    return <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-3'>
                            {info.partials ? <i class="fa-solid fa-bars"></i> : <i class="fa-solid fa-minus"></i>}
                            <li className='text-lg py-2 font-semibold' key={index}> {info.headline}</li>
                        </div>
                        {info.partials ? <button><i class="fa-solid fa-angle-up rotate-180"></i></button> : ''}
                        {/* {info.partials && info.partials.map((partial, partialIndex) => (
                            <li className='text-lg py-2 font-semibold' key={`${index}-${partialIndex}`}>
                                {partial}
                            </li>
                        ))} */}
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