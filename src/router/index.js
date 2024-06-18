import { createNativeStackNavigator} from '@react-navigation/native-stack'

import Home from '../screens/Home'
import Login from '../screens/Login'
import LoginInst from '../screens/LoginInst'
import MainPage from '../screens/MainPage'
import InstPage from '../screens/InstPage'
import Inst from '../screens/Inst'
import Cadastro from '../screens/Cadastro'
import CadastroInst from '../screens/CadastroInst'

import UserProvider from '../services/contexts/UserContext'

const Stack = createNativeStackNavigator()

export default function Routes(){
    return(
        <Stack.Navigator>
            <UserProvider>

            
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
            </UserProvider> 
            
        </Stack.Navigator>
    )
}