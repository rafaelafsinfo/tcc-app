import { createNativeStackNavigator} from '@react-navigation/native-stack'

import Home from '../screens/Home'
import Login from '../screens/Usuario/Login'
import LoginInst from '../screens/Instituicao/LoginInst'
import Cadastro from '../screens/Usuario/Cadastro'
import CadastroInst from '../screens/Instituicao/CadastroInst'
import Inst from '../screens/Instituicao/Inst'
import Main from './Tab'
import Rastreio from '../screens/Rastreio'
import ListDoacoes from '../screens/Instituicao/ListDoacoes'

const Stack = createNativeStackNavigator()

export default function(){
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
            name='Cadastro'
            component={Cadastro}
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
                    name='ListDoacoes'
                    component={ListDoacoes}
                    options={{headerShown: false}}
        />
        <Stack.Screen
            name='CadastroInst'
            component={CadastroInst}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name='Main'
            component={Main}
            options={{headerShown: false}}
        />
    </Stack.Navigator>
    
    )
}