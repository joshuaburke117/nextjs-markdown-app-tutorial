'use client'

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isRegister, setIsRegister] = useState(false)
    const [isAuthenticating, setIsAuthenticating] = useState(false)

    const { login, signup } = useAuth()
    const router = useRouter()

    const cantAuth = !email.includes('@') || password.length < 6

    async function handleAuthUser(){
        //check if email is legit and password is acceptable
        if(cantAuth){
            return
        }
        setIsAuthenticating(true)

        try{
            if(isRegister){
                //then we need to register a user
                await signup(email,password)
            }else{
                //they are wanting to login
                await login(email,password)
            }
            //if we get here with no error, we've authenticated, push to notes page
            router.push('/notes')
            console.log('pushing')
        }catch(err){
            console.log(err.message)
        }finally{
            setIsAuthenticating(false)
        }
    }

    return(
        <>
            <div className="login-container">
                <h1 className="text-gradient">Notes App</h1>
                <h2>easy note taking</h2>
                <p>build your very own notes.</p>
                <div className="full-line"></div>
                <h6>{isRegister? 'Create an account' : 'Log in'}</h6>
                <div>
                    <p>Email</p>
                    <input value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} type = "text" placeholder="Enter your email address"/>
                </div>
                <div>
                    <p>Password</p>
                    <input value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }}type = "password" placeholder="************"/>
                </div>
                <button onClick={handleAuthUser} disabled={cantAuth || isAuthenticating} className="submit-btn">
                    <h6>{isAuthenticating? 'Submitting...' : 'Submit'}</h6>
                </button>
                <div className="secondary-btns-container">
                    <button onClick={() => {
                        setIsRegister(!isRegister)
                    }} className="card-button-secondary">
                        <small>{isRegister?'Log in' : 'Sign up'}</small>
                    </button>
                    <button className="card-button-secondary">
                        <small>Forgot password?</small>
                    </button>
                </div>
                <div className="full-line"></div>
                <footer>
                    <a target="_blank" href="https://github.com/joshuaburke117">
                        <img alt="pfp" src="https://avatars.githubusercontent.com/u/76673057?v=4"/>
                        <h6>@joshuaburke117</h6>
                        <i className="fa-brands fa-github"></i>
                    </a>
                </footer>
            </div>
        </>
    );
}