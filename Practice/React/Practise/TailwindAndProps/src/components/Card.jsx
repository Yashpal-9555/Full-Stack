import React from 'react'

const Card = ({price=2, name="abc", image}) => {
  return (
   <>
  
     <div className="w-60 flex flex-col rounded-xl bg-black min-h-[19rem]  mx-auto m-2 border border-blue-500 border-2 ">
      <div>
        <img
          src={image}
          alt="test"
          className="object-cover object-center rounded-t-xl"
        />
      </div>
      <div className="flex flex-col py-3 px-3 pb-10">
        <div className="flex justify-between ">
          <h1 className="font-bold text-white">{name}</h1>
          <h1 className='text-white font-bold'>Price</h1>
        </div>
        <div className="flex  justify-between">
          <p className='text-white font-bold'>#345</p>
          <p className='text-white font-bold'>{price}</p>
        </div>
      </div>
    </div>

   </>
  )
}

export default Card
