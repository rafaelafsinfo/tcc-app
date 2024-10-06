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
      'Deseja sair de sua cota?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Ok',
          onPress: () => navigation.navigate('Home'),
          style: 'cancel',
        }
      ],
    );
  }

    return(
      <Tab.Navigator
          screenOptions={{
              headerShown: false,
              
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
      <Tab.Screen 
        name="Rastreio" 
        component={Rastreio}
        options={{
            tabBarIcon: ({ size }) => <Feather name="save" size={ size }/>
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
            tabBarIcon: ({ size }) => <Feather name="log-out" size={ size }/>,
            tabBarStyle: { display: 'none' }
        }}
      />
    </Tab.Navigator>
    
    );
}