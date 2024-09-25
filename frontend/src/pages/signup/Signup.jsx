import React, { useState } from 'react'
import GenderCheckBox from './GenderCheckBox'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup'


const Signup = () => {

  const [inputs, setinputs] = useState({
    fullName:'',
    username:'',
    password:'',
    confirmPassword:"",
    gender:"",
  })

  const{loading,signup}=useSignup()

  const handleGenderCheck=(gender)=>{
      setinputs({...inputs,gender})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    await signup(inputs)
  }


  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl text-gray-300 text-center font-semibold'>SignUp
            <span className='text-blue-500'> Page</span>
        </h1>
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="" className='label mt-5'>Fullname</label>
            <input type="text"  placeholder='Fullname' className='w-full input input-bordered h-10' value={inputs.fullName} onChange={(e)=>setinputs({...inputs,fullName:e.target.value})}/>
            </div>
            <div>
            <label htmlFor="" className='label mt-2'>Username</label>
            <input type="text"  placeholder='Username' className='w-full input input-bordered h-10' value={inputs.username} onChange={(e)=>setinputs({...inputs,username:e.target.value})}/>
            </div>
            <div>
            <label htmlFor="" className='label mt-2'>Password</label>
            <input type="password"  placeholder='Password' className='w-full input input-bordered h-10' value={inputs.password} onChange={(e)=>setinputs({...inputs,password:e.target.value})}/>
            </div>
            <div>
            <label htmlFor="" className='label mt-2'>Confirm Password</label>
            <input type="text"  placeholder='Confirm Password' className='w-full input input-bordered h-10' value={inputs.confirmPassword} onChange={(e)=>setinputs({...inputs,confirmPassword:e.target.value})}/>
            </div>

            <GenderCheckBox onhandleCheck= {handleGenderCheck} selectedGender={inputs.gender} />

            <Link to="/login" className='text-sm hover:underline hover:text-blue-500 mt-2 inline-block'>
                Already have an account
            </Link>
            <div>
                <button className='btn btn-block  mt-2' disabled={loading}> 
                  {loading?<span className='loading loading-spinner'></span> :"Sign up"}
                </button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Signup


