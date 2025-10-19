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
            <div className="flex flex-col gap-1.25 max-w-[600px] w-full mx-auto">
                <h1 className="font-2p text-transparent bg-clip-text box-decoration-clone w-fit text-6xl bg-gradient-to-r from-emerald-500 from-10% via-green-500 via-30% to-green-300 to-90%">Notes App</h1>
                <h2 className="font-2p text-white text-5xl">easy note taking</h2>
                <p className="text-white">build your very own notes.</p>
                <div className="full-line"></div>
                <h6 className="font-2p text-white">{isRegister? 'Create an account' : 'Log in'}</h6>
                <div>
                    <p className="text-white">Email</p>
                    <input className="text-black bg-white w-full p-0.75" value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} type = "text" placeholder="Enter your email address"/>
                </div>
                <div>
                    <p className="text-white">Password</p>
                    <input className="text-black bg-white w-full p-0.75" value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }}type = "password" placeholder="************"/>
                </div>
                <button onClick={handleAuthUser} disabled={cantAuth || isAuthenticating} className="font-2p w-full grid place-items-center p-0.5 cursor-pointer border-2 border-double border-white  hover:bg-lime-200 bg-lime-300">
                    <h6>{isAuthenticating? 'Submitting...' : 'Submit'}</h6>
                </button>
                <div className="grid grid-cols-2 gap-1">
                    <button onClick={() => {
                        setIsRegister(!isRegister)
                    }} className="font-2p whitespace-nowrap w-full py-2 px-4 cursor-pointer hover:bg-lime-400 bg-lime-500">
                        <small>{isRegister?'Log in' : 'Sign up'}</small>
                    </button>
                    <button onClick={() => router.push('/passwordReset')} className="font-2p w-full py-2 px-4 cursor-pointer hover:bg-lime-400 bg-lime-500">
                        <small>Forgot password?</small>
                    </button>
                </div>
                <div className="h-px w-full bg-green-800"></div>
                <footer className="flex flex-col gap-0.5 items-center py-1 px-0">
                    <a className="flex items-center gap-2 p-2 pr-3 border border-transparent duration-200 bg-emerald-200/35 hover:bg-emerald-200/50" target="_blank" href="https://github.com/joshuaburke117">
                        <img className="max-w-[30px] aspect-1/1 rounded-full" alt="pfp" src="https://avatars.githubusercontent.com/u/76673057?v=4"/>
                        <h6 className="font-2p text-white">@joshuaburke117</h6>
                        <i className="fa-brands fa-github"></i>
                    </a>
                </footer>
            </div>
        </>
    );
}