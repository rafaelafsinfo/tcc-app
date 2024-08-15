import { createNativeStackNavigator} from '@react-navigation/native-stack'

import MainInst from '../../screens/Instituicao/Inst'
import Rastreio from '../../screens/Rastreio'

const Stack = createNativeStackNavigator()

export default function Routes(){
    return(
   
        <Stack.Navigator>
            
                <Stack.Screen
                    name='Inst'
                    component={MainInst}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name='Rastreio'
                    component={Rastreio}
                    options={{headerShown: false}}
                />
            
        </Stack.Navigator>
    )
}