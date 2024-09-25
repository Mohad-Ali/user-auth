import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"


const useSignup = () => {
    const [loading, setloading] = useState(false)

    const{setauthUser}=useAuthContext()

    const signup = async({fullName,username,password,confirmPassword,gender})=>{
        const success = handleInputError({fullName,username,password,confirmPassword,gender})
        if(!success)return;

        setloading(true)
        try {
            const res= await fetch("/api/auth/signup",{
                method:"POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({fullName,username,password,confirmPassword,gender})
            });

            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            
            localStorage.setItem("user-system", JSON.stringify(data));
            setauthUser(data);

        } catch (error) {
            toast.error(error.message)
        } finally{
            setloading(false)
        }
    }
    return {loading,signup}
}

export default useSignup


function handleInputError({fullName,username,password,confirmPassword,gender}){
    if(!fullName || !username || !password || !confirmPassword || !gender){
        toast.error("pls fill in all the fields")
        return false
    }
    if(password !== confirmPassword){
        toast.error("password do not match")
        return false
    }
    if(password.length < 6){
        toast.error("password must be atleast 6 characters")
        return false
    }
    return true 
}
