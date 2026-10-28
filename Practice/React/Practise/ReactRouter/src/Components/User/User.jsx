import React from 'react'
import { useParams } from 'react-router-dom'

const User = () => {
    const {userid} = useParams()
  return (
    <div className='bg-gray-400 p-4 m-4 flex justify-center'>
      User:{userid}
    </div>
  )
}

export default User
