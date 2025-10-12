'use client'

import { auth } from "@/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext)
}

export default function AuthProvider(props){
    const {children} = props
    const [currentUser, setCurrentUser] = useState(null)
    const [isLoadingUser, setIsLoadingUser] = useState(true)
    
    function signup(email, password){
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email,password){
        return signInWithEmailAndPassword(auth,email,password)
    }

    function logout(){
        setCurrentUser(null)
        return signOut(auth)
    }

    //resetpasswordemail
    //sendpasswordresetemail

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user)=>{
            console.log('authenticating user....')
            setIsLoadingUser(true)
            try {
                setCurrentUser(user)

                if(!user){
                    //guard clause, which means if there is no user we stop there
                    throw Error('no user found')
                }
                console.log('Found user')
                
                //if we find a user, then fetch their data
            }catch(err){
                console.log(err.message)
            }finally{
                setIsLoadingUser(false)
            }
        })

        return unsubscribe
    },[])
    
    const value = {
        currentUser,
        isLoadingUser,
        signup,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}