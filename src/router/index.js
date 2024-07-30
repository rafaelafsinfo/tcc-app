import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importando os componentes de tela
import Home from '../screens/Home/index';
import Login from '../screens/Login/index';
import LoginInst from '../screens/LoginInst/index';
import MainPage from '../screens/MainPage/index';
import InstPage from '../screens/InstPage/index';
import Inst from '../screens/Inst/index';
import Cadastro from '../screens/Cadastro/index';
import CadastroInst from '../screens/CadastroInst/index';
import Rastreio from '../screens/Rastreio/index';

// Criando os navegadores de pilha e abas
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Routes() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="LoginInst" component={LoginInst} />
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="InstPage" component={InstPage} />
        <Stack.Screen name="Inst" component={Inst} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="CadastroInst" component={CadastroInst} />
        <Stack.Screen name="Rastreio" component={Rastreio} />
      </Stack.Navigator>
    );
  }