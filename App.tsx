import React, {Component} from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/router/InitialStack';
import AuthProvider from './src/contexts/UserContext';

export default function App() {
  return (
    
      <NavigationContainer>
        <AuthProvider>
          <StatusBar backgroundColor='#4e0189' barStyle='dark-content'/>
          <Routes/>
        </AuthProvider>
      </NavigationContainer>
    
  );
}

