import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { Alert } from 'react-native';

import MainUser from './MainStackUser';
import Profile from '../../screens/Usuario/Perfil';
import Consulta from '../../screens/Usuario/Consulta';
import Home from '../../screens/Home';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {

  const Verify_out = (navigation) => {
    Alert.alert(
      'Alerta',
      'Deseja sair de sua conta?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Ok',
          onPress: () => navigation.navigate('Home'),
        }
      ],
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#4e0189',
        tabBarInactiveTintColor: 'black',
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen 
        name="MainUser" 
        component={MainUser}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ size, color }) => <Feather name="home" size={size} color={color} />
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ size, color }) => <Feather name="user" size={size} color={color} />
        }}
      />
      <Tab.Screen 
        name="Consulta" 
        component={Consulta}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ size, color }) => <Feather name="align-justify" size={size} color={color} />
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
