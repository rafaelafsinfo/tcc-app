import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons'

import MainUser from './MainStackUser'
import Profile from '../../screens/Usuario/Perfil'
import Consulta from '../../screens/Usuario/Consulta'
import Home from '../../screens/Home';

const Tab = createBottomTabNavigator();

export default function TabRoutes(){
    return(
      <Tab.Navigator
          screenOptions={{
              headerShown: false
          }}
      >
      <Tab.Screen 
        name="MainUser" 
        component={MainUser}
        options={{
            tabBarIcon: ({ size }) => <Feather name="home" size={ size }/>
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{
            tabBarIcon: ({ size }) => <Feather name="user" size={ size }/>
        }}
      />
      <Tab.Screen 
        name="Consulta" 
        component={Consulta} 
        options={{
            tabBarIcon: ({ size }) => <Feather name="align-justify" size={ size }/>
        }}
      />
      <Tab.Screen 
        name="Logout"
        component={Home}
        options={{
            tabBarIcon: ({ size }) => <Feather name="log-out" size={ size }/>,
            tabBarStyle: { display: 'none' }
        }}
      />
    </Tab.Navigator>
    
    );
}