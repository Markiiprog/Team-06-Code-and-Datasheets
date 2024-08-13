import React from 'react';
import { AuthProvider } from './AuthProvider';
import Routes from './Routes';

const Providers = () => {
    return (
    //   This wraps all of it with authentication
      <AuthProvider> 
        <Routes />
      </AuthProvider>
    );
  }
  
  export default Providers;