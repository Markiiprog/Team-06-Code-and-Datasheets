// will decide whether it will go to AppStack or AuthStack
import { StyleSheet, Text, View } from 'react-native'
import React, {useContext, useState, useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { authentication } from '../FirebaseConfig';

import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { AuthContext } from './AuthProvider';
import { NetworkProvider } from './NetworkProvider';

const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChange = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  // useEffect(() => {
  //   const subscriber = onAuthStateChanged(authentication, onAuthStateChange);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authentication, (user) => {
      setUser(user);
      if (initializing) {
        setInitializing(false);
      }
    });

    return unsubscribe; // Cleanup function to unsubscribe from the listener when component unmounts
  }, [setUser, initializing]);

  if (initializing) return null;
  
  return (
    <NetworkProvider>
      <NavigationContainer>
        {user ? <AppStack /> : <AuthStack />} 
        {/* Logic na kung may user sa APP na siya rekta */}
        {/* <AuthStack /> */}
        {/* <AppStack /> */}
      </NavigationContainer>
    </NetworkProvider>
  )
}

export default Routes

