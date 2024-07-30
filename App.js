import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/router/index';  // Atualize a importação para o novo local

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor='#4e0189' barStyle='dark-content' />
      <Routes />
    </NavigationContainer>
  );
}