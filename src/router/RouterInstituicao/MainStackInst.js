import { createNativeStackNavigator} from '@react-navigation/native-stack'

import MainInst from '../../screens/Instituicao/Inst'

const Stack = createNativeStackNavigator()

export default function Routes(){
    return(
   
        <Stack.Navigator>
            
                <Stack.Screen
                    name='Inst'
                    component={MainInst}
                    options={{headerShown: false}}
                />
            
        </Stack.Navigator>
    )
}