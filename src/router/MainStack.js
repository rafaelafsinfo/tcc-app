import { createNativeStackNavigator} from '@react-navigation/native-stack'

import MainPage from '../screens/MainPage'
import InstPage from '../screens/InstPage'
import Inst from '../screens/Inst'
import Rastreio from '../screens/Rastreio'
import Profile from '../screens/Profile'

const Stack = createNativeStackNavigator()

export default function Routes(){
    return(
   
        <Stack.Navigator>
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