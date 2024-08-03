import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons'

import PrincipalStack from './MainStack'
import Profile from '../screens/Profile'

const Tab = createBottomTabNavigator();

export default function TabRoutes(){
    return(
    <Tab.Navigator
        screenOptions={{
            headerShown: false
        }}
    >
      <Tab.Screen 
        name="PrincipalStack" 
        component={PrincipalStack}
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
    </Tab.Navigator>
    );
}