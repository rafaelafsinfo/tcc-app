import { createNativeStackNavigator} from '@react-navigation/native-stack'

import MainPage from '../../screens/Usuario/MainPage'
import InstPage from '../../screens/Usuario/InstPage'
import Rastreio from '../../screens/Rastreio'
import Profile from '../../screens/Usuario/Perfil'
import OpcoesUsuario from '../../screens/Usuario/OpcoesUsuario'

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
                    name='Rastreio'
                    component={Rastreio}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name='Profile'
                    component={Profile}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name='OpcoesUsuario'
                    component={OpcoesUsuario}
                    options={{headerShown: false}}
                />
            
        </Stack.Navigator>
    )
}