'use client'
import { auth } from "@/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function passwordReset(){
    const [email, setEmail] = useState('')
    const [isReseting, setIsReseting] = useState(false)

    const notValidEmail = !email.includes('@')

    const router = useRouter()

    function handlePasswordReset(){
        if(notValidEmail){return}
        setIsReseting(true)
        try{
            sendPasswordResetEmail(auth, email)
        }catch(err){
            console.log(err.message)
        }finally{
            router.push('/')
            setIsReseting(false)
        }
    }
    

    return(
        <>
            <div className="login-container">
                <h1 className="text-gradient">Notes App</h1>
                <div className="full-line"></div>
                <h6>Reset your password</h6>
                <div>
                    <p>Enter your Email to reset your password</p>
                    <input value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} type = "text" placeholder="Enter your email address"/>
                </div>
                <button onClick={handlePasswordReset} className="submit-btn">
                    <h6>{isReseting? 'Submitting...' : 'Submit'}</h6>
                </button>
            </div>
        </>
    );
}