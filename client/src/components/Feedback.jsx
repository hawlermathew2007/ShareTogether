import React from 'react'

const Feedback = () => {
  return (
    <>
        <div className='flex flex-col gap-4 border-x-[1px] p-10 max-h-[100vh] overflow-y-auto scrollbar-hide'>
            <h1 className='text-2xl font-bold'>Introduction</h1>
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
        <div className='flex flex-col gap-4 border-x-[1px] p-10'>
            <ol className=''>
                <li>About me</li>
                <li>What the heck is this</li>
                <li>Contact</li>
                <li>Feedback Scheme</li>
            </ol>
            <div className='text-xl font-semibold italic'>
                <div className='flex'>
                    <h1>Feedback here</h1>
                    <button></button>
                </div>
                <textarea name="feedback" id="feedback"></textarea>
            </div>
        </div>
    </>
  )
}

export default Feedback