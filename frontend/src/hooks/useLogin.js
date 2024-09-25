import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'

const useLogin = () => {
    const [loading, setloading] = useState(false)

    const{setauthUser}=useAuthContext()

    const login =async(username,password)=>{
        const success= handleInputError(username,password)
        if(!success) return;

    setloading(true)
   try {
        const res = await fetch("/api/auth/login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({username,password})
        })

        const data = await res.json()
        if(data.error){
            throw new Error(data.error)
        }
        localStorage.setItem("user-system",JSON.stringify(data))
        setauthUser(data)
    
   } catch (error) {
        toast.error(error.message)
   }finally{
    setloading(false)
   }
}
return{loading,login}
}

export default useLogin

const handleInputError=(username,password)=>{
    if(!username || !password){
        toast.error("pls fill in all the fields")
        return false
    }
    return true
}
