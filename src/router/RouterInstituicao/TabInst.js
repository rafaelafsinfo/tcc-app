import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons'
import {Alert} from 'react-native'

import MainInst from './MainStackInst'
import ListDoacoes from '../../screens/Instituicao/ListDoacoes';
import Rastreio from '../../screens/Rastreio';
import Home from '../../screens/Home';

const Tab = createBottomTabNavigator();

export default function TabRoutes(){

  const Verify_out = (navigation) => {
    Alert.alert(
      'Alerta',
      'Deseja sair de sua conta?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Ok',
          onPress: () => navigation.navigate('Home'),
        }
      ],
    );
  }

    return(
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#4e0189',
          tabBarInactiveTintColor: 'black',
          tabBarHideOnKeyboard: true,
        }}
      >
      <Tab.Screen 
        name="MainInst" 
        component={MainInst}
        options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ size, color }) => <Feather name="home" size={ size } color={color}/>
        }}
      />
      <Tab.Screen 
        name="ListDoacoes" 
        component={ListDoacoes}
        options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ size, color }) => <Feather name="activity" size={ size } color={color}/>
        }}
      />
      <Tab.Screen 
        name="Rastreio" 
        component={Rastreio}
        options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ size, color }) => <Feather name="save" size={ size } color={color}/>
        }}
      />
      <Tab.Screen 
        name="Logout"
        component={Home}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            Verify_out(navigation);
          },
        })}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ size, color }) => <Feather name="log-out" size={size} color={color} />
        }}
      />
    </Tab.Navigator>
    
    );
}