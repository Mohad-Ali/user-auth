import React from 'react'
import { BiLogOut } from "react-icons/bi";
import useLogout from '../hooks/useLogout';


const Logoutbutton = () => {
  const{loading,logout}=useLogout()
  return (
    <div className='mt-auto font-medium'>Logout
     {!loading?( <BiLogOut className='w-10 h-10 text-white cursor-pointer' onClick={logout} />):(
      <span className='loading loading-spinner'></span>
     )}
    </div>
  )
}

export default Logoutbutton

