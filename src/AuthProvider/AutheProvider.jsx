

import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init"
import axios from "axios";

export const AuthContext = createContext(null)


// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const registerUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
        // .then(result => console.log(result.user))
    }



    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
        //    .then(result => console.log(result.user))
    }
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const githubLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, githubProvider)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('current value of the current user, ', currentUser);
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = { email: userEmail }

            setUser(currentUser)
            setLoading(false)
            // if user exits then issue token
            if (currentUser) {

                axios.post('https://volunteer-server-one.vercel.app/jwt', loggedUser, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log('token reponse', res.data);
                    })
            }
            else {
                axios('https://volunteer-server-one.vercel.app/logOut', {}, {
                    withCredentials: true
                })
                .then(res=>{
                    console.log(res.data);
                })
            }
        });
        return () => {
            unSubscribe()
        }
    }, [])

    const authInfo = {
        registerUser,
        loginUser,
        googleLogin,
        githubLogin,
        user,
        logOut,
        loading

    }

    return (
        <div>

            <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;