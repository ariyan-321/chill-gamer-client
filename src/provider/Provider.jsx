import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    sendPasswordResetEmail, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    updateProfile 
  } from 'firebase/auth';
  import React, { createContext, useEffect, useState } from 'react';
  import { auth } from '../firebase/firebase';
  import { GoogleAuthProvider } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
  
  export const authContext = createContext();
  
  export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const[tempEmail,setTempEmail]=useState("")
    const[reviews,setReviews]=useState([])
  
    const provider = new GoogleAuthProvider();
  
    const createUserProfile = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    const googleLogin = () => {
      setLoading(true);
      return signInWithPopup(auth, provider);
    };
  
    const logOut = () => {
      setLoading(true);      
      return signOut(auth) ;
      
    };
  
    const userLogin = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    const updateUserProfile = (updatedData) => {
      return updateProfile(auth.currentUser, updatedData);
    };
  
   useEffect(()=>{
    fetch('https://assignment-10-server-lime-iota.vercel.app/reviews')
    .then(res=> res.json())
    .then(data=>{
      setReviews(data)
    })
   },[])
  
    const authInfo = {
      user,
      createUserProfile,
      setUser,
      userLogin,
      logOut,
      loading,
      updateUserProfile,
      googleLogin,
      setLoading,
      reviews,
      setReviews,
      setTempEmail,
      tempEmail
    };
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        setLoading(false); // Set loading to false when user state is updated
      });
  
      // Cleanup on component unmount
      return () => {
        unsubscribe();
      };
    }, []); // Only run on mount/unmount
  
    return (
      <authContext.Provider value={authInfo}>
        {children}
      </authContext.Provider>
    );
  }
  