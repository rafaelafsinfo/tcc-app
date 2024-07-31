import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator} from '@react-navigation/native-stack'

import Home from '../screens/Home'
import Login from '../screens/Login'
import LoginInst from '../screens/LoginInst'
import MainPage from '../screens/MainPage'
import InstPage from '../screens/InstPage'
import Inst from '../screens/Inst'
import Cadastro from '../screens/Cadastro'
import CadastroInst from '../screens/CadastroInst'
import Rastreio from '../screens/Rastreio'
import Profile from '../screens/Profile'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator();

export default function Routes(){
    return(
        <Stack.Navigator>
                <Stack.Screen
                    name='Home'
                    component={Home}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name='Login'
                    component={Login}
                    options={{headerShown: false}}
                    
                />
                <Stack.Screen
                    name='LoginInst'
                    component={LoginInst}
                    options={{headerShown: false}}
                    
                />
                <Stack.Screen
                    name='MainPage'
                    component={MainPage}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name='InstPage'
                    component={InstPage}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name='Inst'
                    component={Inst}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name='Cadastro'
                    component={Cadastro}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name='CadastroInst'
                    component={CadastroInst}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name='Rastreio'
                    component={Rastreio}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name='Profile'
                    component={Profile}
                    options={{headerShown: false}}
                />
        </Stack.Navigator>
    )
}