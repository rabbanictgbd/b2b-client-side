import React, { createContext, useEffect, useState } from 'react';
import { app } from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app)
const googleProvider= new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null)
    const [loading, setLoading] = useState(true);
    // console.log(authUser)
    const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password)
    const login = (email, password) => signInWithEmailAndPassword(auth, email, password)
    const googleLogin = () => signInWithPopup(auth, googleProvider)

const serverApi= 'http://localhost:3000';
// const serverApi= 'https://b11a11-server-side-rabbanictgbd.vercel.app';


    const logout = () => {
       return signOut(auth)
           
    }

    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
            setAuthUser(currentUser)
             setLoading(false);
        });
        return () => {
            unsubcribe()
        }
    }, [])

    const authData = {

        authUser,
        setAuthUser,
        createUser,
        logout,
        login,
        serverApi,
        loading,
        googleLogin,

    }
    return (
        <AuthContext value={authData}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;