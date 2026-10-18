import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import { AuthContext } from '../../context/AuthContext.jsx'

const Profilepage = () => {

  const{authUser, updateProfile} = useContext(AuthContext)

const [selectedImg, setSelectedImg] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const navigate = useNavigate();
  const [Name, setName] = useState(authUser.fullName)
  const [bio, setBio] = useState(authUser.bio)

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setSelectedImg(file)
    const reader = new FileReader()
    reader.onload = () => setImagePreview(reader.result)
    reader.onerror = () => toast.error('Could not read the selected image')
    reader.readAsDataURL(file)
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      let profilePic
      if (selectedImg) {
        profilePic = await new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result)
          reader.onerror = () => reject(reader.error)
          reader.readAsDataURL(selectedImg)
        })
      }

      const updated = await updateProfile({fullName: Name, bio, ...(profilePic && {profilePic})})
      if (updated) {
        navigate('/')
      }
    } catch (error) {
      toast.error(error.message || 'Could not read the selected image')
    }
  }

  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
      
      <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg">

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-10 flex-1">
            <h3 className="text-lg">Profile details</h3>

            <label htmlFor="avatar" className="flex items-center gap-3 cursor-pointer">
            
             <input onChange={handleImageChange} type="file" id="avatar" accept='.png, .jpg, .jpeg' hidden/>

             <img src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon} alt="" className={`w-12 h-12 ${selectedImg && 'rounded-full'}`}/>  Upload Profile Image

            </label>

            <input onChange={(e) => setName(e.target.value)} value={Name} type="text" required placeholder="Your name" className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"/>

            <textarea onChange={(e) => setBio(e.target.value)} value={bio}placeholder="Write profile bio" required className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500" rows={4}></textarea>

            <button type="submit" className="bg-gradient-to-r from-purple-400    to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer"> Save </button>
 
             </form>

            <img className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 ${selectedImg && 'rounded-full'}`}  src={imagePreview || authUser?.profilePic || assets.logo_icon} alt="" />

      </div>

    </div>
  )
}

export default Profilepage
