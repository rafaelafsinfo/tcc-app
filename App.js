import React, {Component} from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/router';


export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor='#4e0189' barStyle='dark-content'/>
      <Routes/>
    </NavigationContainer>
  );
}

