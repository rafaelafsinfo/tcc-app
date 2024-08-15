import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons'

import MainInst from './MainStackInst'
import ListDoacoes from '../../screens/Instituicao/ListDoacoes';

const Tab = createBottomTabNavigator();

export default function TabRoutes(){
    return(
      <Tab.Navigator
          screenOptions={{
              headerShown: false
          }}
      >
      <Tab.Screen 
        name="MainInst" 
        component={MainInst}
        options={{
            tabBarIcon: ({ size }) => <Feather name="home" size={ size }/>
        }}
      />
      <Tab.Screen 
        name="ListDoacoes" 
        component={ListDoacoes}
        options={{
            tabBarIcon: ({ size }) => <Feather name="activity" size={ size }/>
        }}
      />
    </Tab.Navigator>
    );
}