import React, { createContext, useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { Alert } from 'react-native';

export const NetworkContext = createContext();

export const NetworkProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const handleConnectivityChange = (state) => {
      if (!state.isConnected) {
        Alert.alert(
          'No Internet Connection',
          'Please check your internet connection.',
          [{ text: 'OK' }]
        );
      }
      setIsConnected(state.isConnected);
    };

    const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NetworkContext.Provider value={isConnected}>
      {children}
    </NetworkContext.Provider>
  );
};
