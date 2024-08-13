// dito lalagay yung mga login registration logic ganon

import { Alert, StyleSheet, Text, View } from 'react-native'
import React, {createContext, useState} from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { authentication, database } from '../FirebaseConfig';
import { useNavigation } from "@react-navigation/native";
import { setDoc, doc } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state
    
  return (
    <AuthContext.Provider 
      value={{
        user,
        setUser,
        loading,
        login: async (email, password) => {
          setLoading(true); // Set loading state to true when logging in
          try {
            await signInWithEmailAndPassword(authentication, email, password);
            setLoading(false); // Set loading state to false after successful login
          } catch (error) {
            setLoading(false); // Set loading state to false after unsuccessful login
            if (error.code === "auth/invalid-email") {
              console.log("That email address is invalid!");
              Alert.alert("Invalid email address.");
            }

            if (error.code === "auth/invalid-credential") {
              console.log("That email address is already in use!");
              Alert.alert("The password you entered is incorrect.");
            }

            
          }
        },
        signup: async (email, password, name) => {
          createUserWithEmailAndPassword(authentication, email, password) /* RN FIREBASE*/
          .then(() => {
            
            Alert.alert("User account succesfully created!");
            setDoc( doc(database, "users", authentication.currentUser.uid ), {
              fullname: name,
              email: email,
              id: authentication.currentUser.uid, 
              profile_picture: '',
            });
          })
          .catch((error) => {
            if (error.code === "auth/email-already-in-use") {
              console.log("That email address is already in use!");
              Alert.alert("That email address is already in use!");
            }

            if (error.code === "auth/invalid-email") {
              console.log("That email address is invalid!");
              Alert.alert("That email address is invalid!");
            }

            console.error(error);
          });
        },
        logout: async () =>{
          try {
            await signOut(authentication);
          }catch (e) {
            Alert.alert(e.code);
            console.log(e);
          }
        }
         
      }}
    >
    
    {children}
    </AuthContext.Provider>
  )
};


