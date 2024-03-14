'use client'
import axios from 'axios'
import React from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

function ProfilePage() {
  const router = useRouter()
  async function logout() {
    try {
      await axios.get('/api/users/logout')
      toast.success('Logged out successfully')
      router.push('/')
    }
    catch (error) {
      console.log(error)
      toast.error("error logging out")
    }
  }

  return (
    <div>ProfilePage <hr />
      <button onClick={logout} className='bg-blue-500 p-2 rounded-sm m-3'>Logout</button>
    </div>
  )
}

export default ProfilePage